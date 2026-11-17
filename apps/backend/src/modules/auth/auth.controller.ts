import { BadRequestException, Body, ConflictException, Controller, Delete, ForbiddenException, Get, Param, Post, Req, Res, ServiceUnavailableException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { FastifyReply, FastifyRequest } from "fastify";
import { Model } from "mongoose";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import * as argon2 from "argon2";
import * as oidc from "openid-client";
import nodemailer from "nodemailer";
import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";
import { AuthAccount, EmailAction, Session, User } from "../../models";
import { AuthRequest, SessionGuard } from "./session.guard";

class Credentials { @IsEmail() email!: string; @IsString() @MinLength(10) @MaxLength(128) password!: string; }
class Registration extends Credentials { @IsString() @MinLength(1) @MaxLength(80) name!: string; }
class PasswordChange { @IsString() currentPassword!: string; @IsString() @MinLength(10) @MaxLength(128) newPassword!: string; }
class TokenDto { @IsString() token!: string; }
class EmailDto { @IsEmail() email!: string; }
class ResetPasswordDto extends TokenDto { @IsString() @MinLength(10) @MaxLength(128) password!: string; }
class ReauthPasswordDto { @IsString() @MinLength(10) @MaxLength(128) password!: string; }
type OidcRequest = FastifyRequest & { cookies: Record<string, string>; userId?: string };

function hash(value: string) { return createHash("sha256").update(value).digest("hex"); }
function secureEqual(a: string, b: string) {
  const left = Buffer.from(a); const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

@Controller("auth")
export class AuthController {
  constructor(
    @InjectModel(User.name) private readonly users: Model<User>,
    @InjectModel(Session.name) private readonly sessions: Model<Session>,
    @InjectModel(AuthAccount.name) private readonly accounts: Model<AuthAccount>,
    @InjectModel(EmailAction.name) private readonly actions: Model<EmailAction>,
    private readonly config: ConfigService,
  ) {}

  @Get("csrf")
  csrf(@Res({ passthrough: true }) res: FastifyReply) {
    const token = randomBytes(32).toString("base64url");
    res.setCookie("wallet_csrf", token, { path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production", httpOnly: false, maxAge: 7200 });
    return { token };
  }

  @Post("register")
  async register(@Body() dto: Registration, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const email = dto.email.trim().toLowerCase();
    if (await this.users.exists({ email })) throw new ConflictException("An account with this email already exists.");
    const user = await this.users.create({ email, name: dto.name.trim(), passwordHash: await argon2.hash(dto.password, { type: argon2.argon2id }), emailVerified: false });
    await this.sendActionEmail(user, "verify");
    return { ok: true, message: "Check your email to verify your account before signing in." };
  }

  @Post("login")
  async login(@Body() dto: Credentials, @Req() req: AuthRequest, @Res({ passthrough: true }) res: FastifyReply) {
    this.assertCsrf(req);
    const user = await this.users.findOne({ email: dto.email.trim().toLowerCase() }).select("+passwordHash");
    if (!user?.passwordHash || !(await argon2.verify(user.passwordHash, dto.password))) throw new UnauthorizedException("Email or password is incorrect.");
    if (!user.emailVerified) throw new ForbiddenException("Verify your email before signing in.");
    await this.issueSession(String(user._id), req, res);
    return this.safeUser(user);
  }

  @Post("logout")
  async logout(@Req() req: AuthRequest, @Res({ passthrough: true }) res: FastifyReply) {
    this.assertCsrf(req);
    const token = req.cookies?.wallet_session;
    if (token) await this.sessions.deleteOne({ tokenHash: hash(token) });
    this.clearSessionCookies(res);
    return { ok: true };
  }

  @Get("me")
  @UseGuards(SessionGuard)
  async me(@Req() req: AuthRequest) {
    const user = await this.users.findById(req.userId).select("+passwordHash");
    if (!user) throw new UnauthorizedException();
    const google = await this.accounts.exists({ userId: user._id, provider: "google" });
    return { ...this.safeUser(user), authMethods: { password: Boolean(user.passwordHash), google: Boolean(google) } };
  }

  @Post("verify-email")
  async verifyEmail(@Body() dto: TokenDto, @Req() req: AuthRequest, @Res({ passthrough: true }) res: FastifyReply) {
    this.assertCsrf(req);
    const action = await this.takeAction(dto.token, "verify");
    await this.users.updateOne({ _id: action.userId }, { $set: { emailVerified: true } });
    const user = await this.users.findById(action.userId);
    if (!user) throw new BadRequestException("Verification link is invalid or expired.");
    await this.issueSession(String(user._id), req, res);
    return this.safeUser(user);
  }

  @Post("resend-verification")
  async resendVerification(@Body() dto: EmailDto, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const user = await this.users.findOne({ email: String(dto.email || "").trim().toLowerCase() });
    if (user && !user.emailVerified) await this.sendActionEmail(user, "verify");
    return { ok: true, message: "If the account needs verification, a message has been sent." };
  }

  @Post("forgot-password")
  async forgotPassword(@Body() dto: EmailDto, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const user = await this.users.findOne({ email: String(dto.email || "").trim().toLowerCase() });
    if (user) await this.sendActionEmail(user, "reset");
    return { ok: true, message: "If that account exists, password reset instructions have been sent." };
  }

  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    if (typeof dto.password !== "string" || dto.password.length < 10 || dto.password.length > 128) throw new BadRequestException("Password must be 10–128 characters.");
    const action = await this.takeAction(dto.token, "reset");
    await this.users.updateOne({ _id: action.userId }, { $set: { passwordHash: await argon2.hash(dto.password, { type: argon2.argon2id }) } });
    await this.sessions.deleteMany({ userId: action.userId });
    return { ok: true };
  }

  @Post("set-password")
  @UseGuards(SessionGuard)
  async setPassword(@Body() dto: ReauthPasswordDto, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const user = await this.users.findById(req.userId).select("+passwordHash");
    if (!user) throw new UnauthorizedException();
    if (user.passwordHash) throw new ConflictException("A password is already set. Use change-password.");
    user.passwordHash = await argon2.hash(dto.password, { type: argon2.argon2id });
    await user.save();
    return { ok: true };
  }
  @Post("change-password")
  @UseGuards(SessionGuard)
  async changePassword(@Body() dto: PasswordChange, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const user = await this.users.findById(req.userId).select("+passwordHash");
    if (!user?.passwordHash || !(await argon2.verify(user.passwordHash, dto.currentPassword))) throw new UnauthorizedException("Current password is incorrect.");
    user.passwordHash = await argon2.hash(dto.newPassword, { type: argon2.argon2id });
    await user.save();
    await this.sessions.deleteMany({ userId: user._id, tokenHash: { $ne: hash(req.cookies.wallet_session) } });
    return { ok: true };
  }

  @Get("sessions")
  @UseGuards(SessionGuard)
  async listSessions(@Req() req: AuthRequest) {
    const sessions = await this.sessions.find({ userId: req.userId, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 }).select("_id createdAt expiresAt userAgent").lean();
    return sessions.map((session) => ({ id: String(session._id), createdAt: session.createdAt, expiresAt: session.expiresAt, current: session.tokenHash === hash(req.cookies.wallet_session || "") }));
  }

  @Delete("sessions/:id")
  @UseGuards(SessionGuard)
  async revokeSession(@Param("id") id: string, @Req() req: AuthRequest) {
    this.assertCsrf(req);
    const result = await this.sessions.deleteOne({ _id: id, userId: req.userId });
    if (!result.deletedCount) throw new BadRequestException("Session not found.");
    return { ok: true };
  }

  @Get("google")
  async google(@Req() req: OidcRequest, @Res() res: FastifyReply) {
    return this.beginGoogle(req, res);
  }

  @Get("google/link")
  @UseGuards(SessionGuard)
  async linkGoogle(@Req() req: AuthRequest, @Res() res: FastifyReply) {
    return this.beginGoogle(req, res, req.userId);
  }

  private async beginGoogle(req: OidcRequest, res: FastifyReply, linkUserId?: string) {
    const config = await this.googleConfig();
    const state = oidc.randomState();
    const nonce = oidc.randomNonce();
    const verifier = oidc.randomPKCECodeVerifier();
    const challenge = await oidc.calculatePKCECodeChallenge(verifier);
    const binding = randomBytes(32).toString("base64url");
    res.setCookie("wallet_oauth_binding", binding, { path: "/api/auth", sameSite: "lax", secure: process.env.NODE_ENV === "production", httpOnly: true, maxAge: 600 });
    res.setCookie("wallet_oauth_state", Buffer.from(JSON.stringify({ state, nonce, verifier, binding: hash(binding), linkUserId })).toString("base64url"), { path: "/api/auth", sameSite: "lax", secure: process.env.NODE_ENV === "production", httpOnly: true, maxAge: 600 });
    return res.redirect(oidc.buildAuthorizationUrl(config, {
      redirect_uri: this.config.get<string>("GOOGLE_CALLBACK_URL")!,
      scope: "openid email profile", state, nonce, code_challenge: challenge, code_challenge_method: "S256",
    }).href, 302);
  }
  @Get("google/callback")
  async googleCallback(@Req() req: OidcRequest, @Res() res: FastifyReply) {
    const frontend = this.frontendOrigin();
    const encoded = req.cookies?.wallet_oauth_state;
    const binding = req.cookies?.wallet_oauth_binding;
    try {
      if (!encoded || !binding) throw new UnauthorizedException("Google sign-in state is missing.");
      const stored = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { state: string; nonce: string; verifier: string; binding: string; linkUserId?: string };
      if (!secureEqual(stored.binding, hash(binding))) throw new UnauthorizedException("Google sign-in state is invalid.");
      const config = await this.googleConfig();
      const tokens = await oidc.authorizationCodeGrant(config, new URL(req.url, this.config.get<string>("GOOGLE_CALLBACK_URL")!), {
        pkceCodeVerifier: stored.verifier,
        expectedState: stored.state,
        expectedNonce: stored.nonce,
      });
      const claims = tokens.claims();
      if (!claims || typeof claims.sub !== "string" || typeof claims.email !== "string" || claims.email_verified !== true) throw new UnauthorizedException("Google did not return a verified account.");
      const existing = await this.accounts.findOne({ provider: "google", providerSubject: claims.sub });
      let user: User | null = null;
      let destination = frontend + "/dashboard";
      if (stored.linkUserId) {
        const currentToken = req.cookies.wallet_session;
        const currentSession = currentToken ? await this.sessions.findOne({ tokenHash: hash(currentToken), userId: stored.linkUserId, expiresAt: { $gt: new Date() } }) : null;
        if (!currentSession) throw new UnauthorizedException("Sign in again before linking Google.");
        if (existing && String(existing.userId) !== stored.linkUserId) throw new ConflictException("That Google account is already connected to another account.");
        if (!existing) await this.accounts.create({ userId: stored.linkUserId, provider: "google", providerSubject: claims.sub });
        user = await this.users.findById(stored.linkUserId);
        destination = frontend + "/settings";
      } else if (existing) {
        user = await this.users.findById(existing.userId);
      } else {
        const email = claims.email.toLowerCase();
        if (await this.users.exists({ email })) throw new ConflictException("This email already has an account. Sign in to it first; accounts are never linked by matching email alone.");
        user = await this.users.create({ email, name: typeof claims.name === "string" ? claims.name : email.split("@")[0], emailVerified: true });
        await this.accounts.create({ userId: (user as User & { _id: unknown })._id, provider: "google", providerSubject: claims.sub });
      }
      if (!user) throw new UnauthorizedException("Google account is no longer linked.");
      if (!stored.linkUserId) await this.issueSession(String((user as User & { _id: unknown })._id), req as AuthRequest, res);
      res.clearCookie("wallet_oauth_state", { path: "/api/auth" });
      res.clearCookie("wallet_oauth_binding", { path: "/api/auth" });
      return res.redirect(destination, 302);
    } catch {
      res.clearCookie("wallet_oauth_state", { path: "/api/auth" });
      res.clearCookie("wallet_oauth_binding", { path: "/api/auth" });
      return res.redirect(frontend + "/auth/sign-in?error=google-sign-in-failed", 302);
    }
  }

  private safeUser(user: User) {
    const doc = user as User & { _id: unknown };
    return { id: String(doc._id), email: user.email, name: user.name, emailVerified: user.emailVerified, age: user.age ?? null, bio: user.bio, avatar: user.avatar };
  }

  private async takeAction(token: string, purpose: string) {
    if (typeof token !== "string" || token.length < 32) throw new BadRequestException("Action link is invalid or expired.");
    const action = await this.actions.findOneAndDelete({ tokenHash: hash(token), purpose, expiresAt: { $gt: new Date() } });
    if (!action) throw new BadRequestException("Action link is invalid or expired.");
    return action;
  }

  private async sendActionEmail(user: User, purpose: "verify" | "reset") {
    const host = this.config.get<string>("SMTP_HOST");
    if (!host) throw new ServiceUnavailableException("Email delivery is not configured. Configure SMTP_HOST and credentials before using email account actions.");
    const token = randomBytes(32).toString("base64url");
    await this.actions.deleteMany({ userId: (user as User & { _id: unknown })._id, purpose });
    await this.actions.create({ userId: (user as User & { _id: unknown })._id, purpose, tokenHash: hash(token), expiresAt: new Date(Date.now() + (purpose === "verify" ? 24 : 1) * 60 * 60 * 1000) });
    const transporter = nodemailer.createTransport({
      host, port: Number(this.config.get<string>("SMTP_PORT") || 587),
      secure: this.config.get<string>("SMTP_SECURE") === "true",
      auth: { user: this.config.get<string>("SMTP_USER"), pass: this.config.get<string>("SMTP_PASSWORD") },
    });
    const actionUrl = this.frontendOrigin() + (purpose === "verify" ? "/auth/verify-email" : "/auth/reset-password") + "?token=" + encodeURIComponent(token);
    await transporter.sendMail({
      from: this.config.get<string>("SMTP_FROM") || this.config.get<string>("SMTP_USER"),
      to: user.email,
      subject: purpose === "verify" ? "Verify your Wallet Tracker email" : "Reset your Wallet Tracker password",
      text: purpose === "verify" ? "Verify your account: " + actionUrl : "Reset your password: " + actionUrl,
    });
  }

  private async googleConfig() {
    const clientId = this.config.get<string>("GOOGLE_CLIENT_ID");
    const secret = this.config.get<string>("GOOGLE_CLIENT_SECRET");
    if (!clientId || !secret || !this.config.get<string>("GOOGLE_CALLBACK_URL")) throw new ServiceUnavailableException("Google sign-in is not configured.");
    return oidc.discovery(new URL("https://accounts.google.com"), clientId, secret);
  }

  private frontendOrigin() { return (this.config.get<string>("FRONTEND_ORIGIN") || "http://localhost:5173").split(",")[0].trim(); }

  private assertCsrf(req: AuthRequest) {
    const cookie = req.cookies?.wallet_csrf;
    const header = req.headers["x-csrf-token"];
    const origin = req.headers.origin;
    const allowed = (this.config.get<string>("FRONTEND_ORIGIN") || "http://localhost:5173").split(",").map((x) => x.trim());
    if (!origin || !allowed.includes(origin) || typeof header !== "string" || !cookie || !secureEqual(cookie, header)) throw new ForbiddenException("Security token check failed. Refresh and retry.");
  }

  private async issueSession(userId: string, req: AuthRequest, res: FastifyReply) {
    const previous = req.cookies?.wallet_session;
    if (previous) await this.sessions.deleteOne({ tokenHash: hash(previous) });
    const token = randomBytes(32).toString("base64url");
    await this.sessions.create({ userId, tokenHash: hash(token), expiresAt: new Date(Date.now() + 14 * 86400000), userAgent: req.headers["user-agent"] });
    const options = { path: "/", sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", maxAge: 14 * 86400 };
    res.setCookie("wallet_session", token, { ...options, httpOnly: true });
    res.setCookie("wallet_csrf", randomBytes(32).toString("base64url"), { ...options, httpOnly: false });
  }

  private clearSessionCookies(res: FastifyReply) {
    const opts = { path: "/", sameSite: "lax" as const, secure: process.env.NODE_ENV === "production" };
    res.clearCookie("wallet_session", { ...opts, httpOnly: true });
    res.clearCookie("wallet_csrf", opts);
  }
}








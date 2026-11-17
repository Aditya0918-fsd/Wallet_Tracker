import { createHash } from "node:crypto";
import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { Session } from "../../models";
import { AuthRequest, SessionGuard } from "./session.guard";

function contextFor(request: AuthRequest): ExecutionContext {
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
}

describe("SessionGuard", () => {
  it("loads the identity only from a valid unexpired hashed session", async () => {
    const token = "opaque-session-cookie";
    const session = { userId: "owner-1" };
    const findOne = jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue(session) });
    const guard = new SessionGuard({ findOne } as unknown as Model<Session>);
    const request = { cookies: { wallet_session: token } } as unknown as AuthRequest;

    await expect(guard.canActivate(contextFor(request))).resolves.toBe(true);
    expect(request.userId).toBe("owner-1");
    expect(findOne).toHaveBeenCalledWith({
      tokenHash: createHash("sha256").update(token).digest("hex"),
      expiresAt: { $gt: expect.any(Date) },
    });
  });

  it("rejects a missing or expired session", async () => {
    const findOne = jest.fn().mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });
    const guard = new SessionGuard({ findOne } as unknown as Model<Session>);
    const request = { cookies: { wallet_session: "expired-token" } } as unknown as AuthRequest;

    await expect(guard.canActivate(contextFor(request))).rejects.toBeInstanceOf(UnauthorizedException);
  });
});

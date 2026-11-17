import { CanActivate,ExecutionContext,Injectable,UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; import { FastifyRequest } from "fastify";
import { createHash } from "node:crypto"; import { Model } from "mongoose"; import { Session } from "../../models";
export type AuthRequest=FastifyRequest & {userId?:string;cookies:Record<string,string>};
@Injectable() export class SessionGuard implements CanActivate {
 constructor(@InjectModel(Session.name) private sessions:Model<Session>){}
 async canActivate(ctx:ExecutionContext){const req=ctx.switchToHttp().getRequest<AuthRequest>();const token=req.cookies?.wallet_session;if(!token)throw new UnauthorizedException("Please sign in.");const tokenHash=createHash("sha256").update(token).digest("hex");const s=await this.sessions.findOne({tokenHash,expiresAt:{$gt:new Date()}}).lean();if(!s)throw new UnauthorizedException("Session expired.");req.userId=String(s.userId);return true;}
}

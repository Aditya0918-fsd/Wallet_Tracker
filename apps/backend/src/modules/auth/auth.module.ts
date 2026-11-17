import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Session, SessionSchema, User, UserSchema, AuthAccount, AuthAccountSchema, EmailAction, EmailActionSchema } from "../../models";
import { AuthController } from "./auth.controller";
import { SessionGuard } from "./session.guard";
@Module({
 imports:[MongooseModule.forFeature([
  {name:User.name,schema:UserSchema},{name:Session.name,schema:SessionSchema},
  {name:AuthAccount.name,schema:AuthAccountSchema},{name:EmailAction.name,schema:EmailActionSchema},
 ])],
 controllers:[AuthController],providers:[SessionGuard],exports:[MongooseModule,SessionGuard],
})
export class AuthModule{}

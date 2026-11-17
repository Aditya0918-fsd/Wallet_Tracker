import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { WalletModule } from "./modules/wallet/wallet.module";
import { HealthController } from "./modules/health/health.controller";
@Module({
 imports:[
  ConfigModule.forRoot({isGlobal:true}),
  MongooseModule.forRootAsync({useFactory:()=>{
   const uri=process.env.MONGODB_URI;
   if(process.env.NODE_ENV==="production"&&(!uri||/^mongodb(?:\+srv)?:\/\/(localhost|127\.0\.0\.1)([:/]|$)/i.test(uri)))throw new Error("MONGODB_URI must point to a configured production MongoDB host.");
   return{uri:uri||"mongodb://127.0.0.1:27017/wallet_tracker",autoIndex:true};
  }}),
  AuthModule,WalletModule,
 ],
 controllers:[HealthController],
})
export class AppModule{}

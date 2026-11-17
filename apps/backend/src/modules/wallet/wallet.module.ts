import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import {
 TransactionSchema, CategorySchema, TaskSchema, BudgetSchema,
 RecurringSchema, NotificationSchema, SettingsSchema, ProfileSchema,
} from "../../models";
import { WalletController } from "./wallet.controller";
@Module({
 imports:[
  AuthModule,
  MongooseModule.forFeature([
   {name:"WalletTransaction",schema:TransactionSchema,collection:"transactions"},
   {name:"WalletCategory",schema:CategorySchema,collection:"categories"},
   {name:"WalletTask",schema:TaskSchema,collection:"tasks"},
   {name:"WalletBudget",schema:BudgetSchema,collection:"budgets"},
   {name:"WalletRecurring",schema:RecurringSchema,collection:"recurring_transactions"},
   {name:"WalletNotification",schema:NotificationSchema,collection:"notifications"},
   {name:"WalletSettings",schema:SettingsSchema,collection:"user_settings"},
   {name:"WalletProfile",schema:ProfileSchema,collection:"user_profiles"},
  ]),
 ],
 controllers:[WalletController],
})
export class WalletModule {}

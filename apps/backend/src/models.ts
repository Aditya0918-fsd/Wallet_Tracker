import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
@Schema({timestamps:true}) export class User {
 @Prop({required:true,lowercase:true,trim:true,unique:true,index:true}) email!:string;
 @Prop({required:true,trim:true}) name!:string; @Prop({select:false}) passwordHash?:string;
 @Prop({default:false}) emailVerified!:boolean; @Prop({type:Number,default:null}) age?:number|null;
 @Prop({default:""}) bio!:string; @Prop({type:String,default:null}) avatar!:string|null;
}
export const UserSchema=SchemaFactory.createForClass(User);
@Schema({timestamps:true}) export class Session {
 @Prop({required:true,unique:true,index:true}) tokenHash!:string;
 @Prop({type:Types.ObjectId,ref:User.name,required:true,index:true}) userId!:Types.ObjectId;
 @Prop({required:true}) expiresAt!:Date; @Prop() userAgent?:string; createdAt?:Date;
}
export const SessionSchema=SchemaFactory.createForClass(Session); SessionSchema.index({expiresAt:1},{expireAfterSeconds:0});
@Schema({timestamps:true}) export class AuthAccount {
 @Prop({type:Types.ObjectId,ref:User.name,required:true,index:true}) userId!:Types.ObjectId;
 @Prop({required:true,enum:["google"]}) provider!:string; @Prop({required:true}) providerSubject!:string;
}
export const AuthAccountSchema=SchemaFactory.createForClass(AuthAccount); AuthAccountSchema.index({provider:1,providerSubject:1},{unique:true});
@Schema({timestamps:true}) export class EmailAction {
 @Prop({type:Types.ObjectId,ref:User.name,required:true,index:true}) userId!:Types.ObjectId;
 @Prop({required:true,enum:["verify","reset"],index:true}) purpose!:string;
 @Prop({required:true,unique:true}) tokenHash!:string; @Prop({required:true}) expiresAt!:Date;
}
export const EmailActionSchema=SchemaFactory.createForClass(EmailAction); EmailActionSchema.index({expiresAt:1},{expireAfterSeconds:0});
@Schema({ timestamps: true, strict: false })
export class OwnedWalletEntry {
 @Prop({type:Types.ObjectId,ref:User.name,required:true,index:true}) userId!:Types.ObjectId;
 @Prop({required:true}) recordId!:string;
 @Prop({type:Object,required:true}) payload!:Record<string,unknown>;
}
function entrySchema(collection:string) {
 const schema=SchemaFactory.createForClass(OwnedWalletEntry);
 schema.set("collection",collection);
 schema.set("timestamps",true);
 schema.index({userId:1,recordId:1},{unique:true});
 schema.index({userId:1,"payload.date":-1});
 if(collection==="transactions"){schema.index({userId:1,"payload.type":1,"payload.date":-1});schema.index({userId:1,"payload.categoryId":1,"payload.date":-1});}
 return schema;
}
export const TransactionSchema=entrySchema("transactions");
export const CategorySchema=entrySchema("categories");
export const TaskSchema=entrySchema("tasks");
export const BudgetSchema=entrySchema("budgets");
export const RecurringSchema=entrySchema("recurring_transactions");
export const NotificationSchema=entrySchema("notifications");
export const SettingsSchema=entrySchema("user_settings");
export const ProfileSchema=entrySchema("user_profiles");




import { BadRequestException, Body, Controller, ForbiddenException, Get, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FastifyRequest } from "fastify";
import { Model } from "mongoose";
import { timingSafeEqual } from "node:crypto";
import { OwnedWalletEntry, User } from "../../models";
import { AuthRequest, SessionGuard } from "../auth/session.guard";
type WalletRequest=FastifyRequest&{userId?:string};
function csrf(req:AuthRequest){
 const token=req.cookies?.wallet_csrf;const header=req.headers["x-csrf-token"];const origin=req.headers.origin;
 const allowed=(process.env.FRONTEND_ORIGIN||"http://localhost:5173").split(",").map((v)=>v.trim());
 if(!token||typeof header!=="string"||!origin||!allowed.includes(origin))throw new ForbiddenException("Security token check failed.");
 const a=Buffer.from(token),b=Buffer.from(header);if(a.length!==b.length||!timingSafeEqual(a,b))throw new ForbiddenException("Security token check failed.");
}function safeJson(v:unknown,d=0):boolean {
 if(d>12)return false;
 if(v===null||typeof v==="boolean")return true;
 if(typeof v==="string")return v.length<=500000;
 if(typeof v==="number")return Number.isFinite(v);
 if(Array.isArray(v))return v.length<=5000&&v.every(x=>safeJson(x,d+1));
 if(typeof v!=="object")return false;
 return Object.entries(v).every(([k,x])=>!k.startsWith("$")&&!k.includes(".")&&k.length<128&&safeJson(x,d+1));
}
@Controller("wallet") @UseGuards(SessionGuard)
export class WalletController {
 constructor(
  @InjectModel("WalletTransaction")private tx:Model<OwnedWalletEntry>,
  @InjectModel("WalletCategory")private cat:Model<OwnedWalletEntry>,
  @InjectModel("WalletTask")private task:Model<OwnedWalletEntry>,
  @InjectModel("WalletBudget")private budget:Model<OwnedWalletEntry>,
  @InjectModel("WalletRecurring")private recurring:Model<OwnedWalletEntry>,
  @InjectModel("WalletNotification")private notification:Model<OwnedWalletEntry>,
  @InjectModel("WalletSettings")private settings:Model<OwnedWalletEntry>,
  @InjectModel("WalletProfile")private profile:Model<OwnedWalletEntry>,
  @InjectModel(User.name) private users:Model<User>,
 ){}
 private models():Record<string,Model<OwnedWalletEntry>>{return{transactions:this.tx,categories:this.cat,tasks:this.task,budgets:this.budget,recurring:this.recurring,notifications:this.notification,settings:this.settings,profile:this.profile};}
 @Get() async get(@Req() req:WalletRequest){
  const result:Record<string,unknown>={version:1,transactions:[],categories:[],tasks:[],budgets:[],recurring:[],notifications:[],settings:{},profile:{}};
  const groups=await Promise.all(Object.entries(this.models()).map(async([k,m])=>[k,await m.find({userId:req.userId}).lean()] as const));
  for(const[k,rows]of groups){if(k==="settings"||k==="profile")result[k]=rows.find(r=>r.recordId===k)?.payload||{};else result[k]=(rows as Array<{payload:Record<string,unknown>}>).map(r=>r.payload);}
  return result;
 }
 @Get("transactions") async transactions(@Req()req:WalletRequest,@Query()q:Record<string,string|undefined>){
  const limit=Math.max(1,Math.min(Number(q.limit)||50,100));const f:Record<string,unknown>={userId:req.userId};
  if(q.type==="income"||q.type==="expense")f["payload.type"]=q.type;
  if(q.categoryId)f["payload.categoryId"]=q.categoryId;
  const date:Record<string,string>={};if(q.from&&/^\d{4}-\d{2}-\d{2}$/.test(q.from))date.$gte=q.from;if(q.to&&/^\d{4}-\d{2}-\d{2}$/.test(q.to))date.$lte=q.to;if(Object.keys(date).length)f["payload.date"]=date;
  if(q.search){const term=[...q.search.slice(0,100)].map(c=>"\\.^$|?*+()[]{}".includes(c)?"\\"+c:c).join("");f.$or=[{"payload.title":{$regex:term,$options:"i"}},{"payload.description":{$regex:term,$options:"i"}}];}
  if(q.cursor){try{const c=JSON.parse(Buffer.from(q.cursor,"base64url").toString())as{date?:unknown;id?:unknown};if(typeof c.date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(c.date)||typeof c.id!=="string"||!/^[a-f0-9]{24}$/i.test(c.id))throw new Error();f.$and=[{$or:[{"payload.date":{$lt:c.date}},{"payload.date":c.date,_id:{$lt:c.id}}]}];}catch{throw new BadRequestException("Invalid page cursor.");}}
  const rows=await this.tx.find(f).sort({"payload.date":-1,_id:-1}).limit(limit+1).lean();const more=rows.length>limit;const page=rows.slice(0,limit);const last=page[page.length-1] as (typeof page)[number]&{_id:unknown;recordId:string};
  return{items:page.map(r=>({...r.payload,id:r.recordId})),nextCursor:more&&last?Buffer.from(JSON.stringify({date:last.payload.date,id:String(last._id)})).toString("base64url"):null};
 }
 @Post("delete")
 async deleteRecord(@Req()req:AuthRequest,@Body()body:{kind:string;id:string}){
  csrf(req);
  if(!safeJson(body)||typeof body.kind!=="string"||typeof body.id!=="string"||body.id.length>128)throw new BadRequestException("Invalid deletion request.");
  const model=this.models()[body.kind];
  if(!model||body.kind==="settings"||body.kind==="profile")throw new BadRequestException("Unsupported record type.");
  await model.deleteOne({userId:req.userId,recordId:body.id});
  return{ok:true};
 }
 @Put() async replace(@Req()req:AuthRequest,@Body()body:Record<string,unknown>){
  csrf(req);
  if(body.version!==1||!safeJson(body))throw new BadRequestException("Invalid wallet data.");
  const models=this.models();const lists=["transactions","categories","tasks","budgets","recurring","notifications"];
  for(const key of lists){const items=body[key];if(!Array.isArray(items)||items.length>5000)throw new BadRequestException("Invalid wallet list.");const ids:string[]=[];for(const raw of items){if(!raw||typeof raw!=="object")throw new BadRequestException("Invalid wallet record.");const item={...(raw as Record<string,unknown>)};if(typeof item.id!=="string"||item.id.length<1||item.id.length>128)throw new BadRequestException("Wallet record needs a valid ID.");if(key==="transactions"&&Number.isSafeInteger(item.amount)&&typeof item.currency!=="string")item.currency=(body.settings as Record<string,unknown>|undefined)?.currency||"INR";ids.push(item.id);await models[key].updateOne({userId:req.userId,recordId:item.id},{$set:{payload:item}},{upsert:true});}}
  for(const key of ["settings","profile"]){const value=body[key];if(!value||typeof value!=="object"||Array.isArray(value))throw new BadRequestException("Invalid profile or settings.");await models[key].updateOne({userId:req.userId,recordId:key},{$set:{payload:value}},{upsert:true});}
  const profile=body.profile as Record<string,unknown>;
  const permitted:Record<string,unknown>={};
  if(typeof profile.name==="string")permitted.name=profile.name.slice(0,80);
  if(typeof profile.bio==="string")permitted.bio=profile.bio.slice(0,1000);
  if(profile.age===null||typeof profile.age==="number")permitted.age=profile.age;
  if(profile.avatar===null||typeof profile.avatar==="string")permitted.avatar=profile.avatar;
  await this.users.updateOne({_id:req.userId},{$set:permitted});
  return{ok:true};
 }
}






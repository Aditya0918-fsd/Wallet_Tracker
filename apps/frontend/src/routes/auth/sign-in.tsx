import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Logo from "@/components/logo.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { apiHref, apiRequest } from "@/lib/api.ts";
import { useAuth } from "@/hooks/use-auth.ts";

export const Route=createFileRoute("/auth/sign-in")({component:SignInPage});
function SignInPage(){
 const[register,setRegister]=useState(false);const[busy,setBusy]=useState(false);const[resending,setResending]=useState(false);
 const oauthErrorShown=useRef(false);
 const[name,setName]=useState("");const[email,setEmail]=useState("");const[password,setPassword]=useState("");const[verifyNeeded,setVerifyNeeded]=useState(false);
 const{user,loading,refresh}=useAuth();const navigate=useNavigate();
 useEffect(()=>{
  if(!loading&&user){
   const params=new URLSearchParams(window.location.search);
   const returnTo=params.get("returnTo")||"/dashboard";
   void navigate({to:returnTo,replace:true});
  }
 },[user,loading,navigate]);
 useEffect(()=>{if(oauthErrorShown.current)return;const params=new URLSearchParams(window.location.search);if(params.get("error")==="google-sign-in-failed"){oauthErrorShown.current=true;toast.error("Google sign-in could not be completed. If you already have an account, sign in to it first.");params.delete("error");window.history.replaceState(null,"",window.location.pathname+(params.size?"?"+params.toString():""));}},[]);
 async function submit(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setVerifyNeeded(false);
  try{
   const response=await apiRequest<{message?:string}>(register?"/auth/register":"/auth/login",{method:"POST",body:JSON.stringify(register?{name,email,password}:{email,password})});
   if(register){toast.success("Account created",{description:response.message||"Check your email to verify the account."});setRegister(false);setPassword("");}
   else{await refresh();toast.success("Welcome back");await navigate({to:"/dashboard"});}
  }catch(error){const message=error instanceof Error?error.message:"Unable to sign in.";if(message.toLowerCase().includes("verify your email"))setVerifyNeeded(true);toast.error(message);}
  finally{setBusy(false);}
 }
 async function resend(){setResending(true);try{const response=await apiRequest<{message:string}>("/auth/resend-verification",{method:"POST",body:JSON.stringify({email})});toast.success(response.message);}catch(error){toast.error(error instanceof Error?error.message:"Could not resend verification.");}finally{setResending(false);}}
 if(loading||user){
  return <main className="grid min-h-screen place-items-center bg-background px-4 py-10"><Loader2 className="size-8 animate-spin text-primary"/></main>;
 }
 return <main className="grid min-h-screen place-items-center bg-background px-4 py-10"><div className="w-full max-w-md space-y-6"><div className="rounded-2xl border bg-card p-7 shadow-sm sm:p-9"><div className="mb-7 flex flex-col items-center gap-4"><Logo/><div className="text-center"><h1 className="font-display text-2xl font-semibold">{register?"Create your account":"Welcome back"}</h1><p className="mt-1 text-sm text-muted-foreground">{register?"Start keeping your finances in one place.":"Sign in to access your private wallet."}</p></div></div>
 <form onSubmit={e=>void submit(e)} className="space-y-4">{register&&<div className="space-y-2"><Label htmlFor="name">Name</Label><div className="relative"><UserRound className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="name" required minLength={1} maxLength={80} autoComplete="name" className="pl-9" value={name} onChange={e=>setName(e.target.value)}/></div></div>}
 <div className="space-y-2"><Label htmlFor="email">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="email" type="email" required autoComplete="email" className="pl-9" value={email} onChange={e=>setEmail(e.target.value)}/></div></div>
 <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><LockKeyhole className="absolute left-3 top-3 size-4 text-muted-foreground"/><Input id="password" type="password" required minLength={10} maxLength={128} autoComplete={register?"new-password":"current-password"} className="pl-9" value={password} onChange={e=>setPassword(e.target.value)}/></div>{register&&<p className="text-xs text-muted-foreground">Use at least 10 characters.</p>}</div>
 <Button className="w-full" type="submit" disabled={busy}>{busy&&<Loader2 className="size-4 animate-spin"/>}{register?"Create account":"Sign in"}</Button></form>
 {verifyNeeded&&<Button variant="secondary" className="mt-3 w-full" disabled={!email||resending} onClick={()=>void resend()}>{resending?"Sending…":"Resend verification email"}</Button>}
 {!register&&<p className="mt-4 text-center text-sm"><Link className="text-primary hover:underline" to="/auth/forgot-password">Forgot your password?</Link></p>}
 <div className="relative my-5"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"/></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or</span></div></div>
 <Button variant="secondary" className="w-full" onClick={()=>window.location.assign(apiHref("/auth/google"))}>Continue with Google</Button><p className="pt-2 text-center text-xs text-muted-foreground">Google sign-in requires OAuth credentials in the server environment.</p>
 <p className="mt-5 text-center text-sm text-muted-foreground">{register?"Already have an account?":"New to Wallet Tracker?"}{" "}<button type="button" className="font-medium text-primary underline-offset-4 hover:underline" onClick={()=>setRegister(v=>!v)}>{register?"Sign in":"Create account"}</button></p>
 </div></div></main>;
}



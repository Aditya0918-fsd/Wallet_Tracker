import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api.ts";
import { useAuth } from "@/hooks/use-auth.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
export const Route=createFileRoute("/auth/change-password")({component:ChangePassword});
function ChangePassword(){
 const {user}=useAuth();const navigate=useNavigate();const [current,setCurrent]=useState("");const [next,setNext]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{const path=user?.authMethods?.password?"/auth/change-password":"/auth/set-password";const body=user?.authMethods?.password?{currentPassword:current,newPassword:next}:{password:next};await apiRequest(path,{method:"POST",body:JSON.stringify(body)});toast.success("Password saved");await navigate({to:"/settings"});}catch(error){toast.error(error instanceof Error?error.message:"Could not update password.");}finally{setBusy(false);}}
 return <main className="grid min-h-screen place-items-center px-4"><form onSubmit={e=>void submit(e)} className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-8"><h1 className="font-display text-2xl font-semibold">{user?.authMethods?.password?"Change password":"Set a password"}</h1>{user?.authMethods?.password&&<><Label htmlFor="current">Current password</Label><Input id="current" type="password" required autoComplete="current-password" value={current} onChange={e=>setCurrent(e.target.value)}/></>}<Label htmlFor="new-password">New password</Label><Input id="new-password" type="password" required minLength={10} maxLength={128} autoComplete="new-password" value={next} onChange={e=>setNext(e.target.value)}/><Button className="w-full" disabled={busy}>Save password</Button><Link className="block text-center text-sm text-primary hover:underline" to="/settings">Back to settings</Link></form></main>;
}

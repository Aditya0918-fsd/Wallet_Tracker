import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
export const Route = createFileRoute("/auth/forgot-password")({ component: ForgotPassword });
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try { const r = await apiRequest<{ message: string }>("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }); setSent(true); toast.success(r.message); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Request failed."); }
    finally { setBusy(false); }
  }
  return <main className="grid min-h-screen place-items-center px-4"><div className="w-full max-w-md space-y-5 rounded-2xl border bg-card p-8"><h1 className="font-display text-2xl font-semibold">Reset your password</h1>{sent ? <p className="text-sm text-muted-foreground">If that email belongs to an account, reset instructions have been sent.</p> : <form onSubmit={(e) => void submit(e)} className="space-y-4"><Label htmlFor="email">Email address</Label><Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /><Button className="w-full" disabled={busy}>Send reset link</Button></form>}<Link className="block text-center text-sm text-primary hover:underline" to="/auth/sign-in">Back to sign in</Link></div></main>;
}

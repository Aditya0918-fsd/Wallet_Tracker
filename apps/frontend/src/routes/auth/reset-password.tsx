import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
export const Route = createFileRoute("/auth/reset-password")({ component: ResetPassword });
function ResetPassword() {
  const token = Route.useSearch() as unknown as { token?: string };
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try { await apiRequest("/auth/reset-password", { method: "POST", body: JSON.stringify({ token: token.token, password }) }); toast.success("Password reset. Sign in with your new password."); await navigate({ to: "/auth/sign-in" }); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Could not reset password."); }
    finally { setBusy(false); }
  }
  return <main className="grid min-h-screen place-items-center px-4"><form onSubmit={(e) => void submit(e)} className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-8"><h1 className="font-display text-2xl font-semibold">Choose a new password</h1><Label htmlFor="password">New password</Label><Input id="password" type="password" required minLength={10} maxLength={128} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /><Button className="w-full" disabled={busy || !token.token}>Save password</Button><Link className="block text-center text-sm text-primary hover:underline" to="/auth/sign-in">Back to sign in</Link></form></main>;
}

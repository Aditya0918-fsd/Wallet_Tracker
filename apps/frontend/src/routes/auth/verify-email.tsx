import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api.ts";
import { useAuth } from "@/hooks/use-auth.ts";
import { Button } from "@/components/ui/button.tsx";
export const Route = createFileRoute("/auth/verify-email")({ component: VerifyEmail });
function VerifyEmail() {
  const token = Route.useSearch() as unknown as { token?: string };
  const [finished, setFinished] = useState(false);
  const busy = Boolean(token.token) && !finished;
  const started = useRef(false);
  const { refresh } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token.token || started.current) return;
    started.current = true;
    void apiRequest("/auth/verify-email", { method: "POST", body: JSON.stringify({ token: token.token }) })
      .then(async () => { await refresh(); toast.success("Email verified"); await navigate({ to: "/dashboard" }); })
      .catch((error: unknown) => toast.error(error instanceof Error ? error.message : "Verification failed."))
      .finally(() => setFinished(true));
  }, [token.token, refresh, navigate]);
  return <main className="grid min-h-screen place-items-center px-4"><div className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-8 text-center"><h1 className="font-display text-2xl font-semibold">Verify your email</h1><p className="text-sm text-muted-foreground">{busy ? "Checking your verification link…" : "If verification did not complete, the link may have expired."}</p>{!busy && <Button render={<Link to="/auth/sign-in" />} nativeButton={false}>Return to sign in</Button>}</div></main>;
}


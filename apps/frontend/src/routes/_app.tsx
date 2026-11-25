import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import AppShell from "@/components/app-shell.tsx";
import WalletProvider from "@/components/providers/wallet.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import TxDialogProvider from "@/components/wallet/tx-dialog-provider.tsx";
import { useAuth } from "@/hooks/use-auth.ts";

export const Route = createFileRoute("/_app")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

function ShellSkeleton() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 bg-sidebar lg:block" />
      <div className="flex-1 space-y-6 p-6">
        <Skeleton className="h-10 w-56" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}

function AppLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      const returnTo = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/dashboard";
      void navigate({ to: "/auth/sign-in", search: { returnTo }, replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <ShellSkeleton />;
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email.split("@")[0] || "You";
  return (
    <WalletProvider userId={user.id} name={name} email={user.email} fallback={<ShellSkeleton />}>
      <TxDialogProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </TxDialogProvider>
    </WalletProvider>
  );
}

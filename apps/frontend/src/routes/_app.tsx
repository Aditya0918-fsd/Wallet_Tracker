import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import AppShell from "@/components/app-shell.tsx";
import Logo from "@/components/logo.tsx";
import WalletProvider from "@/components/providers/wallet.tsx";
import { Card } from "@/components/ui/card.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
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
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <Card className="w-full max-w-sm items-center gap-5 px-8 py-10 text-center">
          <Logo />
          <ShieldCheck className="size-8 text-primary" />
          <div className="space-y-1">
            <h1 className="font-display text-xl font-semibold">Sign in to continue</h1>
            <p className="text-sm text-muted-foreground">Your financial dashboard is private to your account.</p>
          </div>
          <SignInButton className="w-full" signInText="Sign in with Google or email" />
        </Card>
      </div>
    );
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

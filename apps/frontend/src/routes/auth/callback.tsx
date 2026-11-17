import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/auth/callback")({
  component: () => <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Completing sign-in…</div>,
});

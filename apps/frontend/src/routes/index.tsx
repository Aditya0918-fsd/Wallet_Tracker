import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth.ts";
import { site } from "@/lib/site.ts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} · Personal finance, beautifully organised` },
      { name: "description", content: site.tagline },
      { property: "og:title", content: site.name },
      { property: "og:description", content: site.tagline },
    ],
  }),
  component: RootIndex,
});

function RootIndex() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        void navigate({ to: "/dashboard", replace: true });
      } else {
        void navigate({ to: "/auth/sign-in", replace: true });
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}

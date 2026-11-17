import { useEffect } from "react";
import { refreshAuth } from "@/lib/auth-api.ts";

export default function AuthProvider({ children, initialAuth }: { children: React.ReactNode; initialAuth?: unknown }) {
  useEffect(() => { void refreshAuth(); }, []);
  return <>{children}</>;
}

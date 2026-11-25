import { apiRequest } from "@/lib/api.ts";
import { useAuthStore, type AppUser } from "@/stores/auth-store.ts";

export async function refreshAuth() {
  const { setUser, setLoading } = useAuthStore.getState();
  try {
    const response = await apiRequest<Omit<AppUser, "firstName" | "lastName">>("/auth/me");
    const parts = response.name.trim().split(/\s+/);
    setUser({ ...response, firstName: parts[0] || "", lastName: parts.slice(1).join(" ") });
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
}

export async function signOut(options?: { returnTo?: string }) {
  try {
    await apiRequest("/auth/logout", { method: "POST" });
  } catch {
    // ignore logout error to ensure local session is cleared
  }
  useAuthStore.getState().setUser(null);
  useAuthStore.getState().setLoading(false);
  window.location.assign(options?.returnTo || "/auth/sign-in");
}

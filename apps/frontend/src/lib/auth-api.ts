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
  await apiRequest("/auth/logout", { method: "POST" });
  useAuthStore.getState().setUser(null);
  if (options?.returnTo) window.location.assign(options.returnTo);
}

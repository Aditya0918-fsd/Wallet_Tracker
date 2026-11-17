import { refreshAuth, signOut } from "@/lib/auth-api.ts";
import { useAuthStore } from "@/stores/auth-store.ts";
export function useAuth() {
  const user=useAuthStore((state)=>state.user);
  const loading=useAuthStore((state)=>state.loading);
  return {user,loading,refresh:refreshAuth,signOut};
}
export function useUser(){return useAuthStore((state)=>state.user);}

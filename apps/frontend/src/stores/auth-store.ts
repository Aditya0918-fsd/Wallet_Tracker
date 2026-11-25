import { create } from "zustand";

export type AppUser = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  age: number | null;
  bio: string;
  avatar: string | null;
  authMethods?: { password: boolean; google: boolean };
};

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
};

const getInitialUser = (): AppUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("wallet_user");
    return raw ? (JSON.parse(raw) as AppUser) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  loading: initialUser === null,
  setUser: (user) => {
    if (typeof window !== "undefined") {
      try {
        if (user) {
          localStorage.setItem("wallet_user", JSON.stringify(user));
        } else {
          localStorage.removeItem("wallet_user");
        }
      } catch {
        // ignore localStorage errors
      }
    }
    set({ user });
  },
  setLoading: (loading) => set({ loading }),
}));

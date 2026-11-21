import { refreshAuth, signOut, useAuthStore } from "./router-BGnyA3VS.mjs";
// node_modules/.nitro/vite/services/ssr/assets/use-auth-QIvZ0sFa.js
function useAuth() {
	return {
		user: useAuthStore((state) => state.user),
		loading: useAuthStore((state) => state.loading),
		refresh: refreshAuth,
		signOut
	};
}
export { useAuth };

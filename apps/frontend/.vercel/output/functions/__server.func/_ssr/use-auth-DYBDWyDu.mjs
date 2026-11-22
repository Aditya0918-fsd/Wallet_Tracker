import { refreshAuth, signOut, useAuthStore } from "./router-CV1frvwC.mjs";
// node_modules/.nitro/vite/services/ssr/assets/use-auth-DYBDWyDu.js
function useAuth() {
	return {
		user: useAuthStore((state) => state.user),
		loading: useAuthStore((state) => state.loading),
		refresh: refreshAuth,
		signOut
	};
}
export { useAuth };

import { __toESM } from "../_runtime.mjs";
import { Button$1 } from "./router-BGnyA3VS.mjs";
import { useAuth } from "./use-auth-QIvZ0sFa.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/signin-SXYwgPQg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
/** Route that starts the OIDC sign-in flow (redirects to the provider). */
var SIGN_IN_PATH = "/auth/sign-in";
/** Renders sign-in and sign-out actions for the Wallet Tracker session (`useAuth()`). */
var SignInButton = (0, import_react.forwardRef)(({ onClick, disabled, showIcon = true, signInText = "Sign In", signOutText = "Sign Out", loadingText, className, variant, size, ...props }, ref) => {
	const { user, loading, signOut } = useAuth();
	const isAuthenticated = user !== null;
	const [pending, setPending] = (0, import_react.useState)(false);
	const handleClick = (0, import_react.useCallback)(async (event) => {
		onClick?.(event);
		setPending(true);
		try {
			if (isAuthenticated) await signOut();
			else {
				const { pathname, search, hash } = window.location;
				const returnTo = encodeURIComponent(`${pathname}${search}${hash}`);
				window.location.href = `${SIGN_IN_PATH}?returnTo=${returnTo}`;
				return;
			}
		} catch (err) {
			console.error("Authentication error:", err);
			toast.error("Authentication error", { description: err instanceof Error ? err.message : String(err) });
		} finally {
			setPending(false);
		}
	}, [
		isAuthenticated,
		signOut,
		onClick
	]);
	const isBusy = loading || pending;
	const isDisabled = disabled || isBusy;
	const buttonText = isBusy ? loadingText || (isAuthenticated ? "Signing Out..." : "Signing In...") : isAuthenticated ? signOutText : signInText;
	const icon = isBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Loader2, { className: "size-4 animate-spin" }) : isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogIn, { className: "size-4" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		ref,
		onClick: handleClick,
		disabled: isDisabled,
		variant,
		size,
		className,
		"aria-label": isAuthenticated ? "Sign out of your account" : "Sign in to your account",
		...props,
		children: [showIcon && icon, buttonText]
	});
});
SignInButton.displayName = "SignInButton";
export { SignInButton };

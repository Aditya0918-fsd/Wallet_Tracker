import { __toESM } from "../_runtime.mjs";
import { Button$1, Route$1, apiRequest } from "./router-CV1frvwC.mjs";
import { useAuth } from "./use-auth-DYBDWyDu.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/verify-email-BDKXMwvL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyEmail() {
	const token = Route$1.useSearch();
	const [finished, setFinished] = (0, import_react.useState)(false);
	const busy = Boolean(token.token) && !finished;
	const started = (0, import_react.useRef)(false);
	const { refresh } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!token.token || started.current) return;
		started.current = true;
		apiRequest("/auth/verify-email", {
			method: "POST",
			body: JSON.stringify({ token: token.token })
		}).then(async () => {
			await refresh();
			toast.success("Email verified");
			await navigate({ to: "/dashboard" });
		}).catch((error) => toast.error(error instanceof Error ? error.message : "Verification failed.")).finally(() => setFinished(true));
	}, [
		token.token,
		refresh,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-4 rounded-2xl border bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Verify your email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: busy ? "Checking your verification link…" : "If verification did not complete, the link may have expired."
				}),
				!busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/auth/sign-in" }),
					nativeButton: false,
					children: "Return to sign in"
				})
			]
		})
	});
}
export { VerifyEmail as component };

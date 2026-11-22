import { __toESM } from "../_runtime.mjs";
import { Button$1, apiRequest } from "./router-CV1frvwC.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { Label } from "./label-DrwUoeEr.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/forgot-password-DgJx7snQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPassword() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const r = await apiRequest("/auth/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email })
			});
			setSent(true);
			toast.success(r.message);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Request failed.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md space-y-5 rounded-2xl border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Reset your password"
				}),
				sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "If that email belongs to an account, reset instructions have been sent."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void submit(e),
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email address"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							id: "email",
							type: "email",
							required: true,
							autoComplete: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							className: "w-full",
							disabled: busy,
							children: "Send reset link"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "block text-center text-sm text-primary hover:underline",
					to: "/auth/sign-in",
					children: "Back to sign in"
				})
			]
		})
	});
}
export { ForgotPassword as component };

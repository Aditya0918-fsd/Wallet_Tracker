import { __toESM } from "../_runtime.mjs";
import { Button$1, Route$3, apiRequest } from "./router-CV1frvwC.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { Label } from "./label-DrwUoeEr.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/reset-password-BswPMU-_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const token = Route$3.useSearch();
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await apiRequest("/auth/reset-password", {
				method: "POST",
				body: JSON.stringify({
					token: token.token,
					password
				})
			});
			toast.success("Password reset. Sign in with your new password.");
			await navigate({ to: "/auth/sign-in" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not reset password.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void submit(e),
			className: "w-full max-w-md space-y-4 rounded-2xl border bg-card p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Choose a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "password",
					children: "New password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "password",
					type: "password",
					required: true,
					minLength: 10,
					maxLength: 128,
					autoComplete: "new-password",
					value: password,
					onChange: (e) => setPassword(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					className: "w-full",
					disabled: busy || !token.token,
					children: "Save password"
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
export { ResetPassword as component };

import { __toESM } from "../_runtime.mjs";
import { Button$1, apiRequest } from "./router-BGnyA3VS.mjs";
import { useAuth } from "./use-auth-QIvZ0sFa.mjs";
import { Input$1 } from "./input-Ce8VWSEq.mjs";
import { Label } from "./label-C09qvLPy.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/change-password-CpofcXmK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChangePassword() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [current, setCurrent] = (0, import_react.useState)("");
	const [next, setNext] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const path = user?.authMethods?.password ? "/auth/change-password" : "/auth/set-password";
			const body = user?.authMethods?.password ? {
				currentPassword: current,
				newPassword: next
			} : { password: next };
			await apiRequest(path, {
				method: "POST",
				body: JSON.stringify(body)
			});
			toast.success("Password saved");
			await navigate({ to: "/settings" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update password.");
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
					children: user?.authMethods?.password ? "Change password" : "Set a password"
				}),
				user?.authMethods?.password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "current",
					children: "Current password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "current",
					type: "password",
					required: true,
					autoComplete: "current-password",
					value: current,
					onChange: (e) => setCurrent(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "new-password",
					children: "New password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "new-password",
					type: "password",
					required: true,
					minLength: 10,
					maxLength: 128,
					autoComplete: "new-password",
					value: next,
					onChange: (e) => setNext(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					className: "w-full",
					disabled: busy,
					children: "Save password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "block text-center text-sm text-primary hover:underline",
					to: "/settings",
					children: "Back to settings"
				})
			]
		})
	});
}
export { ChangePassword as component };

import { cn } from "./router-CV1frvwC.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/logo-Dg5jme04.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function Logo({ className, light }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("grid size-9 place-items-center rounded-xl shadow-sm", light ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-primary text-primary-foreground"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Wallet, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-display text-lg font-semibold tracking-tight",
			children: ["Wallet", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: light ? "text-sidebar-primary" : "text-primary",
				children: "Tracker"
			})]
		})]
	});
}
export { Logo };

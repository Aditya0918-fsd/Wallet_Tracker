import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./card-DMJBVK8X.mjs";
import { cn } from "./router-CV1frvwC.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/panel-CTs0xhDl.js
var import_jsx_runtime = require_jsx_runtime();
/** Consistent card frame for dashboard and analytics panels. */
function Panel({ title, description, action, children, className, contentClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("gap-4 shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "font-display text-base font-semibold",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: description }) : null,
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardAction, { children: action }) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: cn("min-w-0", contentClassName),
			children
		})]
	});
}
export { Panel };

import { Card } from "./card-DMJBVK8X.mjs";
import { cn } from "./router-CV1frvwC.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/stat-card-9qXhPqJD.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var TONES = {
	primary: "bg-primary/10 text-primary",
	destructive: "bg-destructive/10 text-destructive",
	accent: "bg-accent text-accent-foreground",
	muted: "bg-muted text-muted-foreground"
};
function StatCard({ label, value, icon: Icon, hint, delta, invert, tone = "primary", className }) {
	const good = delta !== void 0 && delta !== null && (invert ? delta <= 0 : delta >= 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("gap-3 px-5 py-5 shadow-sm", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-9 place-items-center rounded-xl", TONES[tone]),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 truncate font-display text-2xl font-semibold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-5 items-center gap-2 text-xs text-muted-foreground",
				children: [delta !== void 0 && delta !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium", good ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"),
					children: [
						delta >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowDownRight, { className: "size-3" }),
						Math.abs(delta).toFixed(1),
						"%"
					]
				}) : null, hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: hint
				}) : null]
			})
		]
	});
}
export { StatCard };

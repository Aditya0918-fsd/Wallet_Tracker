import { cn } from "./router-BGnyA3VS.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { ProgressIndicator as ProgressIndicator$1, ProgressRoot, ProgressTrack as ProgressTrack$1 } from "../_libs/base-ui__react+base-ui__utils3.mjs";
// node_modules/.nitro/vite/services/ssr/assets/progress-Yxe2GVpc.js
var import_jsx_runtime = require_jsx_runtime();
function Progress$1({ className, children, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgressRoot, {
		value,
		"data-slot": "progress",
		className: cn("flex flex-wrap gap-3", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, {}) })]
	});
}
function ProgressTrack({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack$1, {
		className: cn("relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted", className),
		"data-slot": "progress-track",
		...props
	});
}
function ProgressIndicator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator$1, {
		"data-slot": "progress-indicator",
		className: cn("h-full bg-primary transition-all", className),
		...props
	});
}
export { Progress$1 };

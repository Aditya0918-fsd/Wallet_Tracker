import { Button$1, useTheme } from "./router-CV1frvwC.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/theme-toggle-GO1Ueh-U.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const toggleTheme = () => {
		const resolved = theme === "system" ? document.documentElement.classList.contains("dark") ? "dark" : "light" : theme;
		setTheme(resolved === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		variant: "ghost",
		size: "icon",
		onClick: toggleTheme,
		"aria-label": "Toggle theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.SunIcon, { className: "dark:hidden" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoonIcon, { className: "hidden dark:block" })]
	});
}
export { ThemeToggle };

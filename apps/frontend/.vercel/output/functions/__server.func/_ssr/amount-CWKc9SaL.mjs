import { useWallet } from "./card-CHTOrAKP.mjs";
import { cn, formatMoney } from "./router-BGnyA3VS.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/amount-CWKc9SaL.js
var import_jsx_runtime = require_jsx_runtime();
/** Renders a paise amount in the user's currency, tinted by direction. */
function Amount({ value, type, currency, compact, signed, className }) {
	const { money } = useWallet();
	const tone = type === "income" ? "text-primary" : type === "expense" ? "text-destructive" : type === "net" ? value >= 0 ? "text-primary" : "text-destructive" : "";
	const prefix = type === "income" && signed ? "+" : type === "expense" && signed ? "−" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("font-mono tabular-nums tracking-tight", tone, className),
		children: [prefix, formatMoney(Math.abs(value) * (type === "net" && value < 0 ? -1 : 1), currency ? {
			...money,
			currency
		} : money, {
			compact,
			signed: type === "net" && signed
		})]
	});
}
export { Amount };

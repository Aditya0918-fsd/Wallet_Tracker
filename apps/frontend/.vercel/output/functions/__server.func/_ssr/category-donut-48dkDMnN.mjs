import { ChartContainer, ChartTooltip, colorAt } from "./colors-Dbj7_3mz.mjs";
import { useWallet } from "./card-CHTOrAKP.mjs";
import { formatMoney } from "./router-BGnyA3VS.mjs";
import { Amount } from "./amount-CWKc9SaL.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { Cell, Pie, PieChart } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/category-donut-48dkDMnN.js
var import_jsx_runtime = require_jsx_runtime();
/** Donut with a legend list; renders nothing chart-wise when empty. */
function CategoryDonut({ slices, total, label }) {
	const { money } = useWallet();
	if (slices.length === 0 || total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-56 place-items-center rounded-xl border border-dashed text-sm text-muted-foreground",
		children: [
			"No ",
			label.toLowerCase(),
			" recorded for this period"
		]
	});
	const top = slices.slice(0, 6);
	const rest = slices.slice(6).reduce((s, c) => s + c.amount, 0);
	const data = rest > 0 ? [...top, {
		categoryId: "rest",
		name: "Others",
		amount: rest
	}] : top;
	const config = Object.fromEntries(data.map((d, i) => [d.categoryId, {
		label: d.name,
		color: colorAt(i)
	}]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-5 sm:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
				config,
				className: "aspect-square h-48 w-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: ({ payload }) => {
					const p = payload?.[0]?.payload;
					if (!p) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono",
							children: formatMoney(p.amount, money)
						})]
					});
				} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "amount",
					nameKey: "name",
					innerRadius: 58,
					outerRadius: 88,
					paddingAngle: 2,
					strokeWidth: 0,
					children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: colorAt(i) }, d.categoryId))
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 grid place-items-center text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					value: total,
					compact: true,
					className: "font-display text-base font-semibold"
				})] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "w-full min-w-0 flex-1 space-y-2",
			children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2.5 shrink-0 rounded-full",
						style: { background: colorAt(i) }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 flex-1 truncate",
						children: d.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground tabular-nums",
						children: [(d.amount / total * 100).toFixed(0), "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
						value: d.amount,
						compact: true,
						className: "w-20 text-right text-xs font-medium"
					})
				]
			}, d.categoryId))
		})]
	});
}
export { CategoryDonut };

import { BALANCE_COLOR, ChartContainer, ChartTooltip, EXPENSE_COLOR, INCOME_COLOR } from "./colors-Dbj7_3mz.mjs";
import { useWallet } from "./card-CHTOrAKP.mjs";
import { formatMoney } from "./router-BGnyA3VS.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { Area, AreaChart } from "../_libs/recharts2.mjs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/cashflow-charts-CrN44Ec0.js
var import_jsx_runtime = require_jsx_runtime();
var config = {
	income: {
		label: "Income",
		color: INCOME_COLOR
	},
	expense: {
		label: "Expenses",
		color: EXPENSE_COLOR
	},
	balance: {
		label: "Balance",
		color: BALANCE_COLOR
	}
};
function MoneyTooltip({ active, payload, label, money }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-36 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pb-1 font-medium",
			children: label
		}), payload.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-2 rounded-full",
					style: { background: p.color }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 text-muted-foreground",
					children: config[p.name]?.label ?? p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: formatMoney(Number(p.value) * 100, money)
				})
			]
		}, String(p.name)))]
	});
}
function toMajor(points) {
	return points.map((p) => ({
		label: p.label,
		income: p.income / 100,
		expense: p.expense / 100,
		balance: p.balance / 100
	}));
}
function CashflowBars({ points, className }) {
	const { money } = useWallet();
	const compact = (v) => formatMoney(v * 100, money, { compact: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config,
		className: className ?? "h-72 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: toMajor(points),
			barGap: 4,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					vertical: false,
					strokeDasharray: "3 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					tickMargin: 8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					width: 64,
					tickFormatter: compact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .4 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTooltip, {
						...p,
						money
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "income",
					fill: "var(--color-income)",
					radius: [
						6,
						6,
						0,
						0
					],
					maxBarSize: 28
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "expense",
					fill: "var(--color-expense)",
					radius: [
						6,
						6,
						0,
						0
					],
					maxBarSize: 28
				})
			]
		})
	});
}
function BalanceArea({ points, className }) {
	const { money } = useWallet();
	const compact = (v) => formatMoney(v * 100, money, { compact: true });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config,
		className: className ?? "h-56 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data: toMajor(points),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "balanceFill",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-balance)",
						stopOpacity: .35
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-balance)",
						stopOpacity: 0
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					vertical: false,
					strokeDasharray: "3 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					tickMargin: 8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					tickLine: false,
					axisLine: false,
					width: 64,
					tickFormatter: compact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyTooltip, {
					...p,
					money
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					dataKey: "balance",
					type: "monotone",
					stroke: "var(--color-balance)",
					strokeWidth: 2.5,
					fill: "url(#balanceFill)"
				})
			]
		})
	});
}
export { BalanceArea, CashflowBars };

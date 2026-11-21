import { __toESM } from "../_runtime.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { Button$1, cn, formatMoney } from "./router-BGnyA3VS.mjs";
import { Input$1 } from "./input-Ce8VWSEq.mjs";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "./native-select-CQoS0Rkt.mjs";
import { Amount } from "./amount-CWKc9SaL.mjs";
import { CashflowBars } from "./cashflow-charts-CrN44Ec0.mjs";
import { Panel } from "./panel-d5fe1IY9.mjs";
import { StatCard } from "./stat-card-BTX7wK1S.mjs";
import { PRESET_LABELS, averageDaily, byCategory, formatDay, fromDay, growth, inRange, monthlySeries, presetRange, previousRange, savingsRate, toDay, todayDay, totals, useWallet } from "./card-CHTOrAKP.mjs";
import { downloadAnalyticsPdf } from "./export-foZGWWqf.mjs";
import { ChartContainer, ChartTooltip, EXPENSE_COLOR, INCOME_COLOR, colorAt } from "./colors-Dbj7_3mz.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-CJaci4eC.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { differenceInCalendarDays, format } from "../_libs/date-fns.mjs";
import { eachDayOfInterval, eachMonthOfInterval } from "../_libs/date-fns3.mjs";
import { Area, AreaChart } from "../_libs/recharts2.mjs";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "../_libs/recharts+[...].mjs";
import { Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ReferenceLine, Scatter, ScatterChart, ZAxis } from "../_libs/recharts.mjs";
// node_modules/.nitro/vite/services/ssr/assets/analytics-Dgk0CG4z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var BASE_CONFIG = {
	income: {
		label: "Income",
		color: INCOME_COLOR
	},
	expense: {
		label: "Expenses",
		color: EXPENSE_COLOR
	}
};
var H$1 = "h-[340px] w-full";
var major$1 = (v) => v / 100;
function Tip({ active, payload, label, fmt }) {
	if (!active || !payload?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-40 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
		children: [label !== void 0 && label !== "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pb-1 font-medium",
			children: label
		}) : null, payload.map((p, i) => {
			const raw = Array.isArray(p.value) ? Number(p.value[1]) - Number(p.value[0]) : Number(p.value);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: p.color }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-muted-foreground",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: fmt(raw)
					})
				]
			}, `${String(p.name)}-${i}`);
		})]
	});
}
function useFmt(props) {
	const full = (v) => formatMoney(Math.round(v * 100), props.money);
	const compact = (v) => formatMoney(Math.round(v * 100), props.money, { compact: true });
	return {
		full,
		compact
	};
}
function Axes({ compact, horizontal }) {
	return horizontal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
			horizontal: false,
			strokeDasharray: "3 3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
			type: "number",
			tickLine: false,
			axisLine: false,
			tickFormatter: compact
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
			type: "category",
			dataKey: "name",
			tickLine: false,
			axisLine: false,
			width: 110
		})
	] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
			vertical: false,
			strokeDasharray: "3 3"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
			dataKey: "label",
			tickLine: false,
			axisLine: false,
			tickMargin: 8,
			minTickGap: 12
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
			tickLine: false,
			axisLine: false,
			width: 64,
			tickFormatter: compact
		})
	] });
}
function GroupedChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		income: major$1(b.income),
		expense: major$1(b.expense)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: BASE_CONFIG,
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			barGap: 3,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, { compact }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .4 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						...p,
						fmt: full
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "income",
					name: "Income",
					fill: "var(--color-income)",
					radius: [
						5,
						5,
						0,
						0
					],
					maxBarSize: 26
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "expense",
					name: "Expenses",
					fill: "var(--color-expense)",
					radius: [
						5,
						5,
						0,
						0
					],
					maxBarSize: 26
				})
			]
		})
	});
}
function ColumnChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		net: major$1(b.net)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: { net: { label: "Net" } },
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, { compact }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 0,
					stroke: "var(--border)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .4 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						...p,
						fmt: full
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "net",
					name: "Net cash flow",
					radius: 4,
					maxBarSize: 32,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.net >= 0 ? INCOME_COLOR : EXPENSE_COLOR }, d.label))
				})
			]
		})
	});
}
function CategoryBarChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.expenseSlices.map((s, i) => ({
		name: s.name,
		amount: major$1(s.amount),
		fill: colorAt(i)
	}));
	const lollipop = (s) => {
		const x = Number(s.x ?? 0);
		const y = Number(s.y ?? 0);
		const w = Number(s.width ?? 0);
		const h = Number(s.height ?? 0);
		const fill = typeof s.fill === "string" ? s.fill : INCOME_COLOR;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: x,
			x2: x + w,
			y1: y + h / 2,
			y2: y + h / 2,
			stroke: fill,
			strokeWidth: 2
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: x + w,
			cy: y + h / 2,
			r: 7,
			fill
		})] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: { amount: { label: "Spent" } },
		className: "w-full",
		style: { height: Math.max(240, data.length * 40 + 40) },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			layout: "vertical",
			margin: { right: 24 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, {
					compact,
					horizontal: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .3 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						...p,
						fmt: full
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "amount",
					name: "Spent",
					radius: 6,
					barSize: props.lollipop ? 18 : 22,
					shape: props.lollipop ? lollipop : void 0,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
				})
			]
		})
	});
}
function PyramidChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		income: -major$1(b.income),
		expense: major$1(b.expense)
	}));
	const abs = (v) => compact(Math.abs(v));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: BASE_CONFIG,
		className: "w-full",
		style: { height: Math.max(300, data.length * 22 + 40) },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			layout: "vertical",
			stackOffset: "sign",
			barCategoryGap: 2,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					horizontal: false,
					strokeDasharray: "3 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					tickLine: false,
					axisLine: false,
					tickFormatter: abs
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "category",
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					width: 64
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					x: 0,
					stroke: "var(--border)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .3 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						...p,
						fmt: (v) => full(Math.abs(v))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "income",
					name: "Income",
					stackId: "p",
					fill: "var(--color-income)",
					radius: [
						4,
						0,
						0,
						4
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "expense",
					name: "Expenses",
					stackId: "p",
					fill: "var(--color-expense)",
					radius: [
						0,
						4,
						4,
						0
					]
				})
			]
		})
	});
}
function WaterfallChart(props) {
	const { full, compact } = useFmt(props);
	const { totals: t, expenseSlices } = props.model;
	const rows = [{
		label: "Income",
		range: [0, major$1(t.income)],
		fill: INCOME_COLOR
	}];
	let running = t.income;
	for (const s of expenseSlices.slice(0, 8)) {
		rows.push({
			label: s.name,
			range: [major$1(running - s.amount), major$1(running)],
			fill: EXPENSE_COLOR
		});
		running -= s.amount;
	}
	const others = expenseSlices.slice(8).reduce((sum, s) => sum + s.amount, 0);
	if (others > 0) {
		rows.push({
			label: "Others",
			range: [major$1(running - others), major$1(running)],
			fill: EXPENSE_COLOR
		});
		running -= others;
	}
	rows.push({
		label: "Net savings",
		range: [Math.min(0, major$1(running)), Math.max(0, major$1(running))],
		fill: running >= 0 ? "var(--chart-3)" : EXPENSE_COLOR
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: { range: { label: "Amount" } },
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data: rows,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, { compact }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
					y: 0,
					stroke: "var(--border)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .3 },
					content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
						...p,
						fmt: full
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "range",
					name: "Amount",
					radius: 4,
					maxBarSize: 48,
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: r.fill }, r.label))
				})
			]
		})
	});
}
function SplineChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		income: major$1(b.income),
		expense: major$1(b.expense)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: BASE_CONFIG,
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, { compact }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
					...p,
					fmt: full
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					dataKey: "income",
					name: "Income",
					type: "natural",
					stroke: "var(--color-income)",
					strokeWidth: 2.5,
					dot: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					dataKey: "expense",
					name: "Expenses",
					type: "natural",
					stroke: "var(--color-expense)",
					strokeWidth: 2.5,
					dot: false
				})
			]
		})
	});
}
function topCategories(props, n) {
	return props.model.expenseSlices.slice(0, n);
}
function StreamChart(props) {
	const { full } = useFmt(props);
	const cats = topCategories(props, 6);
	const data = props.model.buckets.map((b) => {
		const row = { label: b.label };
		for (const c of cats) row[c.categoryId] = major$1(b.byCategory[c.categoryId] ?? 0);
		return row;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
			data,
			stackOffset: "silhouette",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					tickMargin: 8,
					minTickGap: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
					...p,
					fmt: full
				}) }),
				cats.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					dataKey: c.categoryId,
					name: c.name,
					stackId: "s",
					type: "monotone",
					stroke: "none",
					fill: colorAt(i),
					fillOpacity: .85
				}, c.categoryId))
			]
		})
	});
}
function BumpChart(props) {
	const cats = topCategories(props, 6);
	const data = props.model.buckets.filter((b) => b.expense > 0).map((b) => {
		const ranked = [...cats].sort((a, c) => (b.byCategory[c.categoryId] ?? 0) - (b.byCategory[a.categoryId] ?? 0));
		const row = { label: b.label };
		ranked.forEach((c, i) => {
			row[c.categoryId] = i + 1;
		});
		return row;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
			data,
			margin: { right: 16 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
					vertical: false,
					strokeDasharray: "3 3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					dataKey: "label",
					tickLine: false,
					axisLine: false,
					tickMargin: 8,
					minTickGap: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					reversed: true,
					domain: [1, Math.max(1, cats.length)],
					allowDecimals: false,
					tickLine: false,
					axisLine: false,
					width: 32,
					tickFormatter: (v) => `#${v}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
					...p,
					fmt: (v) => `#${v}`
				}) }),
				cats.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					dataKey: c.categoryId,
					name: c.name,
					type: "monotone",
					stroke: colorAt(i),
					strokeWidth: 3,
					dot: {
						r: 4,
						fill: colorAt(i)
					}
				}, c.categoryId))
			]
		})
	});
}
function ConnectedScatterChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		income: major$1(b.income),
		expense: major$1(b.expense)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: BASE_CONFIG,
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
			margin: { right: 16 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { strokeDasharray: "3 3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					dataKey: "income",
					name: "Income",
					tickLine: false,
					axisLine: false,
					tickFormatter: compact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "number",
					dataKey: "expense",
					name: "Expenses",
					tickLine: false,
					axisLine: false,
					width: 64,
					tickFormatter: compact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: ({ active, payload }) => {
					const row = payload?.[0]?.payload;
					if (!active || !row) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: row.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Income ", full(row.income)] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Expenses ", full(row.expense)] })
						]
					});
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
					data,
					fill: "var(--chart-3)",
					line: {
						stroke: "var(--chart-3)",
						strokeWidth: 1.5
					},
					lineType: "joint"
				})
			]
		})
	});
}
function BubbleChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.categoryStats.map((c, i) => ({
		name: c.name,
		count: c.count,
		average: major$1(c.average),
		total: major$1(c.total),
		fill: colorAt(i)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, {
			margin: {
				right: 24,
				top: 16
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { strokeDasharray: "3 3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
					type: "number",
					dataKey: "count",
					name: "Payments",
					allowDecimals: false,
					tickLine: false,
					axisLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
					type: "number",
					dataKey: "average",
					name: "Average",
					tickLine: false,
					axisLine: false,
					width: 64,
					tickFormatter: compact
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, {
					type: "number",
					dataKey: "total",
					range: [120, 2400]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: ({ active, payload }) => {
					const row = payload?.[0]?.payload;
					if (!active || !row) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: row.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								row.count,
								" payments · avg ",
								full(row.average)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Total ", full(row.total)] })
						]
					});
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
					data,
					fillOpacity: .75,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
				})
			]
		})
	});
}
function CandlestickChart(props) {
	const { full, compact } = useFmt(props);
	const data = props.model.buckets.map((b) => ({
		label: b.label,
		open: major$1(b.open),
		close: major$1(b.close),
		high: major$1(b.high),
		low: major$1(b.low),
		span: [major$1(b.low), major$1(b.high)]
	}));
	const candle = (s) => {
		const row = s.payload;
		if (!row) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {});
		const x = Number(s.x ?? 0);
		const y = Number(s.y ?? 0);
		const w = Number(s.width ?? 0);
		const h = Number(s.height ?? 0);
		const spread = row.high - row.low;
		const toY = (v) => spread === 0 ? y + h / 2 : y + (row.high - v) / spread * h;
		const color = row.close >= row.open ? INCOME_COLOR : EXPENSE_COLOR;
		const top = toY(Math.max(row.open, row.close));
		const bottom = toY(Math.min(row.open, row.close));
		const cx = x + w / 2;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: cx,
			x2: cx,
			y1: y,
			y2: y + Math.max(h, 1),
			stroke: color,
			strokeWidth: 1.5
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: x + w * .15,
			width: w * .7,
			y: top,
			height: Math.max(2, bottom - top),
			fill: color,
			rx: 2
		})] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H$1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
			data,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axes, { compact }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
					cursor: { fillOpacity: .3 },
					content: ({ active, payload }) => {
						const row = payload?.[0]?.payload;
						if (!active || !row) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-x-3 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "col-span-2 pb-1 font-medium",
									children: row.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right font-mono",
									children: full(row.open)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Close"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right font-mono",
									children: full(row.close)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right font-mono",
									children: full(row.high)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Low"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right font-mono",
									children: full(row.low)
								})
							]
						});
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					dataKey: "span",
					name: "Balance",
					shape: candle,
					maxBarSize: 22
				})
			]
		})
	});
}
var H = "h-[340px] w-full";
var major = (v) => v / 100;
function fmts(props) {
	return {
		full: (v) => formatMoney(Math.round(v * 100), props.money),
		minor: (v) => formatMoney(v, props.money)
	};
}
function Legend({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2 text-xs",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "size-2.5 rounded-full",
				style: { background: i.color }
			}), i.name]
		}, i.name))
	});
}
function slicesData(props, n = 8) {
	const s = props.model.expenseSlices;
	const top = s.slice(0, n);
	const rest = s.slice(n).reduce((sum, c) => sum + c.amount, 0);
	const rows = top.map((c, i) => ({
		name: c.name,
		value: major(c.amount),
		fill: colorAt(i)
	}));
	if (rest > 0) rows.push({
		name: "Others",
		value: major(rest),
		fill: colorAt(n)
	});
	return rows;
}
function PieChartView(props) {
	const { full } = fmts(props);
	const data = slicesData(props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: props.semi ? "h-[260px] w-full" : H,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
			...p,
			fmt: full
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
			data,
			dataKey: "value",
			nameKey: "name",
			cy: props.semi ? "85%" : "50%",
			startAngle: props.semi ? 180 : 90,
			endAngle: props.semi ? 0 : -270,
			innerRadius: props.semi ? "95%" : 0,
			outerRadius: props.semi ? "150%" : "80%",
			paddingAngle: props.semi ? 1.5 : .5,
			strokeWidth: 0,
			children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: data.map((d) => ({
		name: d.name,
		color: d.fill
	})) })] });
}
function SunburstChart(props) {
	const { full } = fmts(props);
	const { totals: t, incomeSlices, expenseSlices } = props.model;
	const inner = [{
		name: "Income",
		value: major(t.income),
		fill: INCOME_COLOR
	}, {
		name: "Expenses",
		value: major(t.expense),
		fill: EXPENSE_COLOR
	}];
	const outer = [...incomeSlices.map((s, i) => ({
		name: s.name,
		value: major(s.amount),
		fill: `color-mix(in oklch, ${INCOME_COLOR} ${90 - i * 12}%, var(--background))`
	})), ...expenseSlices.map((s, i) => ({
		name: s.name,
		value: major(s.amount),
		fill: `color-mix(in oklch, ${EXPENSE_COLOR} ${90 - Math.min(i, 6) * 11}%, var(--background))`
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
				...p,
				fmt: full
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data: inner,
				dataKey: "value",
				nameKey: "name",
				outerRadius: "45%",
				strokeWidth: 2,
				stroke: "var(--card)",
				children: inner.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data: outer,
				dataKey: "value",
				nameKey: "name",
				innerRadius: "48%",
				outerRadius: "80%",
				strokeWidth: 2,
				stroke: "var(--card)",
				children: outer.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, `${d.name}-${i}`))
			})
		] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: inner.map((d) => ({
		name: d.name,
		color: d.fill
	})) })] });
}
function NightingaleChart(props) {
	const { full } = fmts(props);
	const data = slicesData(props, 9);
	const max = Math.max(...data.map((d) => d.value), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
			...p,
			fmt: full
		}) }), data.map((d, i) => {
			const step = 360 / data.length;
			const r = 20 + 80 * Math.sqrt(d.value / max);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
				data: [d],
				dataKey: "value",
				nameKey: "name",
				startAngle: 90 - i * step,
				endAngle: 90 - (i + 1) * step + 1.5,
				innerRadius: "8%",
				outerRadius: `${r * .8}%`,
				strokeWidth: 0,
				isAnimationActive: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill })
			}, d.name);
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: data.map((d) => ({
		name: d.name,
		color: d.fill
	})) })] });
}
function RadialBarView(props) {
	const { full } = fmts(props);
	const data = slicesData(props, 6).filter((d) => d.name !== "Others").reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
			data,
			innerRadius: "18%",
			outerRadius: "92%",
			startAngle: 90,
			endAngle: -270,
			barSize: 16,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
					type: "number",
					domain: [0, Math.max(...data.map((d) => d.value), 1)],
					tick: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
					...p,
					fmt: full
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
					dataKey: "value",
					background: true,
					cornerRadius: 8,
					children: data.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: d.fill }, d.name))
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: [...data].reverse().map((d) => ({
		name: d.name,
		color: d.fill
	})) })] });
}
function RadarView(props) {
	const { full } = fmts(props);
	const prev = new Map(props.model.prevExpenseSlices.map((s) => [s.categoryId, s.amount]));
	const data = props.model.expenseSlices.slice(0, 8).map((s) => ({
		name: s.name,
		current: major(s.amount),
		previous: major(prev.get(s.categoryId) ?? 0)
	}));
	if (data.length < 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Radar charts need spending in at least 3 categories in the selected range." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
		config: {},
		className: H,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
			data,
			outerRadius: "72%",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
					dataKey: "name",
					tick: { fontSize: 11 }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
					tick: false,
					axisLine: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { content: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tip, {
					...p,
					label: p.label,
					fmt: full
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
					dataKey: "previous",
					name: "Previous range",
					stroke: "var(--chart-3)",
					fill: "var(--chart-3)",
					fillOpacity: .15
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
					dataKey: "current",
					name: "Selected range",
					stroke: EXPENSE_COLOR,
					fill: EXPENSE_COLOR,
					fillOpacity: .35
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: [{
		name: "Selected range",
		color: EXPENSE_COLOR
	}, {
		name: "Previous range",
		color: "var(--chart-3)"
	}] })] });
}
function GaugeChart(props) {
	const rate = savingsRate(props.model.totals);
	if (rate === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "No income in this range, so a savings rate can't be calculated." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
			config: {},
			className: "mx-auto aspect-square h-[300px]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
				data: [{
					name: "Saved",
					value: Math.max(0, Math.min(100, rate)),
					fill: rate < 0 ? EXPENSE_COLOR : rate < 10 ? "var(--chart-4)" : INCOME_COLOR
				}],
				innerRadius: "70%",
				outerRadius: "100%",
				startAngle: 225,
				endAngle: -45,
				barSize: 22,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
					type: "number",
					domain: [0, 100],
					tick: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
					dataKey: "value",
					background: true,
					cornerRadius: 12
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 grid place-items-center text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: cn("font-display text-5xl font-semibold", rate < 0 && "text-destructive"),
				children: [rate.toFixed(1), "%"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "savings rate"
			})] })
		})]
	});
}
function MarimekkoChart(props) {
	const { minor } = fmts(props);
	const buckets = props.model.buckets.filter((b) => b.expense > 0);
	const cats = props.model.expenseSlices.slice(0, 6);
	const total = buckets.reduce((s, b) => s + b.expense, 0);
	if (total === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "No spending in this range." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-[300px] w-full gap-0.5 overflow-hidden rounded-lg",
				children: buckets.map((b) => {
					const other = b.expense - cats.reduce((s, c) => s + (b.byCategory[c.categoryId] ?? 0), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-1 flex-col-reverse gap-px",
						style: { width: `${b.expense / total * 100}%` },
						title: `${b.label}: ${minor(b.expense)}`,
						children: [cats.map((c, i) => {
							const v = b.byCategory[c.categoryId] ?? 0;
							return v > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									height: `${v / b.expense * 100}%`,
									background: colorAt(i)
								},
								title: `${b.label} · ${c.name}: ${minor(v)}`
							}, c.categoryId) : null;
						}), other > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: { height: `${other / b.expense * 100}%` },
							className: "bg-muted-foreground/30",
							title: `${b.label} · Others: ${minor(other)}`
						}) : null]
					}, b.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buckets[0]?.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buckets[buckets.length - 1]?.label })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { items: [...cats.map((c, i) => ({
				name: c.name,
				color: colorAt(i)
			})), {
				name: "Others",
				color: "color-mix(in oklch, var(--muted-foreground) 30%, transparent)"
			}] })
		]
	});
}
function BulletChart(props) {
	const { minor } = fmts(props);
	const { range } = props.model;
	if (props.budgets.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Create budgets to compare spending against your limits." });
	const factor = (differenceInCalendarDays(fromDay(range.to), fromDay(range.from)) + 1) / 30.4375;
	const spent = new Map(props.model.expenseSlices.map((s) => [s.categoryId, s.amount]));
	const names = new Map(props.categories.map((c) => [c.id, c.name]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "space-y-5 py-2",
		children: [props.budgets.map((b) => {
			const target = Math.round(b.limit * factor);
			const actual = spent.get(b.categoryId) ?? 0;
			const max = Math.max(target * 1.25, actual, 1);
			const pct = (v) => `${Math.min(100, v / max * 100)}%`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-1.5 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-sm font-medium",
						children: names.get(b.categoryId) ?? "Uncategorised"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-7 overflow-hidden rounded-md bg-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-y-0 left-0 bg-muted-foreground/10",
								style: { width: pct(target * .8) }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-y-0 left-0 bg-muted-foreground/10",
								style: { width: pct(target) }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("absolute inset-y-2 left-0 rounded-sm", actual > target ? "bg-destructive" : "bg-primary"),
								style: { width: pct(actual) }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-y-1 w-0.5 bg-foreground",
								style: { left: pct(target) }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground tabular-nums",
						children: [
							minor(actual),
							" / ",
							minor(target)
						]
					})
				]
			}, b.id);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "text-xs text-muted-foreground",
			children: "Black marker = budget for this range. Shaded bands = 80% and 100% of budget."
		})]
	});
}
function TableChart(props) {
	const { minor } = fmts(props);
	const rows = props.model.buckets.filter((b) => b.income || b.expense);
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "No transactions in this range." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-h-[400px] overflow-auto rounded-lg border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
			className: "sticky top-0 bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Period" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Income"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Expenses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Net"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Closing balance"
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: b.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right font-mono text-primary",
				children: minor(b.income)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right font-mono text-destructive",
				children: minor(b.expense)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: cn("text-right font-mono", b.net < 0 && "text-destructive"),
				children: minor(b.net)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-right font-mono",
				children: minor(b.close)
			})
		] }, b.key)) })] })
	});
}
function Notice({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-[300px] place-items-center rounded-xl border border-dashed px-6 text-center text-sm text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-md",
			children
		})
	});
}
var NEEDS_EXPENSES = /* @__PURE__ */ new Set([
	"bar",
	"lollipop",
	"pie",
	"semiDonut",
	"nightingale",
	"radialBar",
	"stream",
	"bump",
	"bubble",
	"radar",
	"marimekko"
]);
function ChartRenderer({ id, ...props }) {
	const { totals } = props.model;
	if (id === "parallel") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Parallel coordinates compare records across several numeric measures. A transaction only has one (its amount), so this chart can't show your data honestly. Try the Bubble chart or Radar chart to compare categories instead." });
	if (totals.income === 0 && totals.expense === 0 && id !== "bullet" && id !== "candlestick") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "No transactions in the selected range. Pick a wider range or add a transaction." });
	if (NEEDS_EXPENSES.has(id) && totals.expense === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "This chart breaks down spending, and there are no expenses in the selected range." });
	switch (id) {
		case "grouped": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedChart, { ...props });
		case "column": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColumnChart, { ...props });
		case "bar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBarChart, { ...props });
		case "lollipop": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBarChart, {
			...props,
			lollipop: true
		});
		case "bullet": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletChart, { ...props });
		case "pyramid": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PyramidChart, { ...props });
		case "pie": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChartView, { ...props });
		case "semiDonut": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChartView, {
			...props,
			semi: true
		});
		case "sunburst": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunburstChart, { ...props });
		case "marimekko": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarimekkoChart, { ...props });
		case "nightingale": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightingaleChart, { ...props });
		case "radialBar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBarView, { ...props });
		case "waterfall": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterfallChart, { ...props });
		case "spline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplineChart, { ...props });
		case "stream": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamChart, { ...props });
		case "bump": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BumpChart, { ...props });
		case "candlestick": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandlestickChart, { ...props });
		case "connectedScatter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectedScatterChart, { ...props });
		case "bubble": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BubbleChart, { ...props });
		case "radar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarView, { ...props });
		case "gauge": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GaugeChart, { ...props });
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableChart, { ...props });
	}
}
var CHARTS = [
	{
		id: "grouped",
		label: "Grouped column",
		group: "Compare",
		description: "Income and expenses side by side for each period."
	},
	{
		id: "column",
		label: "Column chart",
		group: "Compare",
		description: "Net cash flow per period. Green columns saved money, red columns overspent."
	},
	{
		id: "bar",
		label: "Bar graph",
		group: "Compare",
		description: "Spending by category, largest first."
	},
	{
		id: "lollipop",
		label: "Lollipop chart",
		group: "Compare",
		description: "Spending by category as a lighter-weight bar chart."
	},
	{
		id: "bullet",
		label: "Bullet chart",
		group: "Compare",
		description: "Spending versus each budget, scaled to the length of the selected range."
	},
	{
		id: "pyramid",
		label: "Population pyramid",
		group: "Compare",
		description: "Income to the left, expenses to the right, for each period."
	},
	{
		id: "pie",
		label: "Pie chart",
		group: "Composition",
		description: "Share of total spending by category."
	},
	{
		id: "semiDonut",
		label: "Semicircle donut",
		group: "Composition",
		description: "Share of spending by category on a half ring."
	},
	{
		id: "sunburst",
		label: "Sunburst chart",
		group: "Composition",
		description: "Inner ring: income vs expenses. Outer ring: the categories inside each."
	},
	{
		id: "marimekko",
		label: "Marimekko chart",
		group: "Composition",
		description: "Column width is each period's total spending; segments show category mix."
	},
	{
		id: "nightingale",
		label: "Nightingale chart",
		group: "Composition",
		description: "Equal-angle petals whose length shows category spending."
	},
	{
		id: "radialBar",
		label: "Radial bar chart",
		group: "Composition",
		description: "Top spending categories as concentric rings."
	},
	{
		id: "waterfall",
		label: "Waterfall chart",
		group: "Flow",
		description: "How income builds up and each expense category draws it down to your net savings."
	},
	{
		id: "spline",
		label: "Spline chart",
		group: "Trend",
		description: "Smoothed income and expense lines over time."
	},
	{
		id: "stream",
		label: "Stream graph",
		group: "Trend",
		description: "Top spending categories flowing over time."
	},
	{
		id: "bump",
		label: "Bump chart",
		group: "Trend",
		description: "Ranking of your top spending categories in each period (1 = highest)."
	},
	{
		id: "candlestick",
		label: "Candlestick chart",
		group: "Trend",
		description: "Balance per period: opening, closing, highest, and lowest point."
	},
	{
		id: "connectedScatter",
		label: "Connected scatter plot",
		group: "Relationship",
		description: "Each dot is a period: income across, expenses up, joined in time order."
	},
	{
		id: "bubble",
		label: "Bubble chart",
		group: "Relationship",
		description: "Categories by number of payments (across) and average payment (up); bubble size is total."
	},
	{
		id: "radar",
		label: "Radar chart",
		group: "Relationship",
		description: "Category spending in this range versus the previous range of the same length."
	},
	{
		id: "gauge",
		label: "Circular gauge",
		group: "Indicator",
		description: "Savings rate: how much of your income you kept."
	},
	{
		id: "table",
		label: "Table chart",
		group: "Indicator",
		description: "Exact figures for each period."
	},
	{
		id: "parallel",
		label: "Parallel coordinates",
		group: "Unavailable",
		description: "Parallel coordinates compare records across many numeric measures. Each transaction has only one measure (its amount), so this chart would be misleading for your data."
	}
];
var UNAVAILABLE = /* @__PURE__ */ new Set(["parallel"]);
/** Collapse "All time" to the span the user actually has data for. */
function clampRange(range, txs, today) {
	if (range.from !== "0000-01-01") return range;
	let min = today;
	for (const t of txs) if (t.date < min) min = t.date;
	return {
		from: min,
		to: range.to > today ? today : range.to
	};
}
function buildBuckets(txs, range) {
	const start = fromDay(range.from);
	const end = fromDay(range.to);
	const ranges = differenceInCalendarDays(end, start) <= 62 ? eachDayOfInterval({
		start,
		end
	}).map((d) => ({
		key: toDay(d),
		label: format(d, "d MMM"),
		range: {
			from: toDay(d),
			to: toDay(d)
		}
	})) : eachMonthOfInterval({
		start,
		end
	}).map((d) => {
		const from = toDay(d) < range.from ? range.from : toDay(d);
		const monthEnd = toDay(new Date(d.getFullYear(), d.getMonth() + 1, 0));
		return {
			key: format(d, "yyyy-MM"),
			label: format(d, "MMM yy"),
			range: {
				from,
				to: monthEnd > range.to ? range.to : monthEnd
			}
		};
	});
	const sorted = [...txs].sort((a, b) => a.date.localeCompare(b.date));
	let running = 0;
	for (const t of sorted) {
		if (t.date >= range.from) break;
		running += t.type === "income" ? t.amount : -t.amount;
	}
	let idx = sorted.findIndex((t) => t.date >= range.from);
	if (idx < 0) idx = sorted.length;
	return ranges.map((r) => {
		const open = running;
		let high = running;
		let low = running;
		let income = 0;
		let expense = 0;
		const cats = {};
		while (idx < sorted.length) {
			const t = sorted[idx];
			if (!t || t.date > r.range.to) break;
			if (t.type === "income") {
				income += t.amount;
				running += t.amount;
			} else {
				expense += t.amount;
				running -= t.amount;
				cats[t.categoryId] = (cats[t.categoryId] ?? 0) + t.amount;
			}
			high = Math.max(high, running);
			low = Math.min(low, running);
			idx++;
		}
		return {
			...r,
			income,
			expense,
			net: income - expense,
			open,
			close: running,
			high,
			low,
			byCategory: cats
		};
	});
}
function buildModel(all, categories, range, prevRange) {
	const txs = all.filter((t) => inRange(t.date, range));
	const expenseSlices = byCategory(txs, categories, "expense");
	const counts = /* @__PURE__ */ new Map();
	for (const t of txs) if (t.type === "expense") counts.set(t.categoryId, (counts.get(t.categoryId) ?? 0) + 1);
	return {
		range,
		txs,
		buckets: buildBuckets(all, range),
		totals: totals(txs),
		prevTotals: totals(all, prevRange),
		expenseSlices,
		incomeSlices: byCategory(txs, categories, "income"),
		prevExpenseSlices: byCategory(all, categories, "expense", prevRange),
		categoryStats: expenseSlices.map((s) => {
			const count = counts.get(s.categoryId) ?? 0;
			return {
				...s,
				count,
				total: s.amount,
				average: count ? Math.round(s.amount / count) : 0
			};
		})
	};
}
var PRESETS = [
	"today",
	"last7",
	"last30",
	"thisMonth",
	"prevMonth",
	"thisYear",
	"all",
	"custom"
];
var GROUPS = [...new Set(CHARTS.map((c) => c.group))];
function AnalyticsPage() {
	const { data, money, replace } = useWallet();
	const [preset, setPreset] = (0, import_react.useState)("thisMonth");
	const [custom, setCustom] = (0, import_react.useState)(() => presetRange("thisMonth"));
	const [chart, setChart] = (0, import_react.useState)("grouped");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const today = todayDay();
	const range = (0, import_react.useMemo)(() => {
		return clampRange(preset === "custom" ? custom : presetRange(preset), data.transactions, today);
	}, [
		preset,
		custom,
		data.transactions,
		today
	]);
	const prevRange = (0, import_react.useMemo)(() => previousRange(range), [range]);
	const model = (0, import_react.useMemo)(() => buildModel(data.transactions, data.categories, range, prevRange), [
		data.transactions,
		data.categories,
		range,
		prevRange
	]);
	const monthly = (0, import_react.useMemo)(() => monthlySeries(data.transactions, 12), [data.transactions]);
	const t = model.totals;
	const highest = model.expenseSlices[0];
	const lowest = model.expenseSlices[model.expenseSlices.length - 1];
	const meta = CHARTS.find((c) => c.id === chart);
	const rangeLabel = preset === "custom" || preset === "all" ? `${formatDay(range.from, data.settings.dateFormat)} – ${formatDay(range.to, data.settings.dateFormat)}` : PRESET_LABELS[preset];
	const refresh = () => {
		replace({ ...data });
		toast.success("Data refreshed", { description: format(/* @__PURE__ */ new Date(), "p") });
	};
	const exportPdf = async () => {
		setBusy(true);
		try {
			await downloadAnalyticsPdf({
				range,
				rangeLabel,
				totals: t,
				expenseByCategory: model.expenseSlices,
				incomeByCategory: model.incomeSlices,
				monthly: monthly.slice(-6),
				transactions: [...model.txs].sort((a, b) => b.date.localeCompare(a.date))
			}, data);
			toast.success("Report downloaded");
		} catch {
			toast.error("Could not create the report");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Analytics"
				}),
				description: "Understand where your money moves, in any range you choose.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "secondary",
					size: "sm",
					onClick: refresh,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.RotateCw, {}), " Refresh"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: () => void exportPdf(),
					disabled: busy,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.FileDown, {}),
						" ",
						busy ? "Preparing…" : "PDF report"
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "sm",
						variant: preset === p ? "default" : "ghost",
						onClick: () => setPreset(p),
						className: "rounded-full",
						children: PRESET_LABELS[p]
					}, p))
				}), preset === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 sm:ml-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							type: "date",
							"aria-label": "From",
							className: "w-40",
							value: custom.from,
							max: custom.to,
							onChange: (e) => e.target.value && setCustom((c) => ({
								...c,
								from: e.target.value
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "to"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							type: "date",
							"aria-label": "To",
							className: "w-40",
							value: custom.to,
							min: custom.from,
							onChange: (e) => e.target.value && setCustom((c) => ({
								...c,
								to: e.target.value
							}))
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-sm text-muted-foreground sm:ml-auto sm:pr-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CalendarDays, { className: "size-4" }),
						" ",
						formatDay(range.from, data.settings.dateFormat),
						" – ",
						formatDay(range.to, data.settings.dateFormat)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total income",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: t.income }),
						icon: import_lucide_react.ArrowDownCircle,
						delta: growth(t.income, model.prevTotals.income),
						hint: "income growth"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total expenses",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: t.expense }),
						icon: import_lucide_react.ArrowUpCircle,
						tone: "destructive",
						invert: true,
						delta: growth(t.expense, model.prevTotals.expense),
						hint: "expense growth"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Net savings",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: t.net,
							type: "net"
						}),
						icon: import_lucide_react.PiggyBank,
						tone: "accent",
						hint: savingsRate(t) === null ? "No income in range" : `${savingsRate(t)?.toFixed(1)}% savings rate`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Average daily spend",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: averageDaily(t.expense, range, today) }),
						icon: import_lucide_react.CalendarDays,
						tone: "muted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: meta?.label ?? "Chart",
				description: meta?.description,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
					"aria-label": "Chart type",
					value: chart,
					onChange: (e) => setChart(e.target.value),
					className: "w-52",
					children: GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOptGroup, {
						label: g,
						children: CHARTS.filter((c) => c.group === g).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelectOption, {
							value: c.id,
							children: [c.label, UNAVAILABLE.has(c.id) ? " (not suited to this data)" : ""]
						}, c.id))
					}, g))
				}),
				className: "[&_[data-slot=card-header]]:flex-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartRenderer, {
					id: chart,
					model,
					money,
					budgets: data.budgets,
					categories: data.categories
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Spending highlights",
					description: rangeLabel,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
								icon: import_lucide_react.Crown,
								label: "Highest spending category",
								name: highest?.name,
								amount: highest?.amount,
								tone: "destructive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, {
								icon: import_lucide_react.Feather,
								label: "Lowest spending category",
								name: model.expenseSlices.length > 1 ? lowest?.name : void 0,
								amount: model.expenseSlices.length > 1 ? lowest?.amount : void 0,
								tone: "primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 rounded-xl bg-muted/60 p-4 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Transactions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl font-semibold",
									children: model.txs.length
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Categories used"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl font-semibold",
									children: model.expenseSlices.length + model.incomeSlices.length
								})] })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Monthly comparison",
					description: "Last 12 months",
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashflowBars, {
						points: monthly,
						className: "h-64 w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-4 pt-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.TrendingUp, { className: "size-3.5 text-primary" }),
								" Best month:",
								" ",
								bestMonth(monthly)?.label ?? "—"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.TrendingDown, { className: "size-3.5 text-destructive" }),
								" Highest spend:",
								" ",
								[...monthly].sort((a, b) => b.expense - a.expense)[0]?.expense ? [...monthly].sort((a, b) => b.expense - a.expense)[0]?.label : "—"
							]
						})]
					})]
				})]
			})
		]
	});
}
function bestMonth(points) {
	return points.filter((p) => p.income || p.expense).sort((a, b) => b.net - a.net)[0];
}
function Highlight({ icon: Icon, label, name, amount, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: tone === "primary" ? "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary" : "grid size-10 place-items-center rounded-xl bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4.5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium",
					children: name ?? "Not enough data"
				})]
			}),
			amount !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
				value: amount,
				className: "text-sm font-semibold"
			}) : null
		]
	});
}
export { AnalyticsPage as component };

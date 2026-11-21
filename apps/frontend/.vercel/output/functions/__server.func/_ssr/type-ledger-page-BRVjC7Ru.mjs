import { __toESM } from "../_runtime.mjs";
import { Button$1, formatMoney } from "./router-BGnyA3VS.mjs";
import { ChartContainer, ChartTooltip, EXPENSE_COLOR, INCOME_COLOR } from "./colors-Dbj7_3mz.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-CQoS0Rkt.mjs";
import { Tabs$1, TabsList, TabsTrigger } from "./tabs-HWewyqH2.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { useTxDialog } from "./use-tx-dialog-BkFXropk.mjs";
import { ExportMenu, TxFilters, useTxFilters } from "./tx-filters-CwG9Ongq.mjs";
import { byCategory, growth, monthRange, totals, useWallet, yearRange } from "./card-CHTOrAKP.mjs";
import { Amount } from "./amount-CWKc9SaL.mjs";
import { CategoryDonut } from "./category-donut-48dkDMnN.mjs";
import { Panel } from "./panel-d5fe1IY9.mjs";
import { StatCard } from "./stat-card-BTX7wK1S.mjs";
import { TransactionsTable } from "./transactions-table-DRJ_E5Vc.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { subMonths } from "../_libs/date-fns.mjs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/type-ledger-page-BRVjC7Ru.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
/** Shared page for the Income and Expenses sections. */
function TypeLedgerPage({ type }) {
	const { data, money } = useWallet();
	const { openNew } = useTxDialog();
	const label = type === "income" ? "Income" : "Expenses";
	const singular = type === "income" ? "income" : "expense";
	const color = type === "income" ? INCOME_COLOR : EXPENSE_COLOR;
	const ofType = (0, import_react.useMemo)(() => data.transactions.filter((t) => t.type === type), [data.transactions, type]);
	const years = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set([(/* @__PURE__ */ new Date()).getFullYear()]);
		for (const t of ofType) set.add(Number(t.date.slice(0, 4)));
		return [...set].sort((a, b) => b - a);
	}, [ofType]);
	const [year, setYear] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getFullYear());
	const [view, setView] = (0, import_react.useState)("monthly");
	const now = /* @__PURE__ */ new Date();
	const thisMonth = totals(ofType, monthRange(now));
	const prevMonth = totals(ofType, monthRange(subMonths(now, 1)));
	const yearTotals = totals(ofType, yearRange(year));
	const pick = (t) => type === "income" ? t.income : t.expense;
	const slices = (0, import_react.useMemo)(() => byCategory(ofType, data.categories, type, yearRange(year)), [
		ofType,
		data.categories,
		type,
		year
	]);
	const history = (0, import_react.useMemo)(() => {
		const key = type === "income" ? "income" : "expense";
		if (view === "monthly") return MONTHS.map((m, i) => ({
			label: m,
			value: totals(ofType, monthRange(new Date(year, i, 1)))[key] / 100
		}));
		return [...years].reverse().map((y) => ({
			label: String(y),
			value: totals(ofType, yearRange(y))[key] / 100
		}));
	}, [
		ofType,
		view,
		year,
		years,
		type
	]);
	const { filters, set, reset, filtered } = useTxFilters(ofType, data.categories, { type });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: label
				}),
				description: type === "income" ? "Every rupee that came in, organised." : "Every payment that went out, organised.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
					name: singular,
					title: `${label} report`,
					rangeLabel: "Filtered records",
					transactions: filtered
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: () => openNew(type),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}),
						" Add ",
						singular
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "This month",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: pick(thisMonth) }),
						icon: type === "income" ? import_lucide_react.TrendingUp : import_lucide_react.TrendingDown,
						tone: type === "income" ? "primary" : "destructive",
						delta: growth(pick(thisMonth), pick(prevMonth)),
						invert: type === "expense",
						hint: "vs last month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Previous month",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: pick(prevMonth) }),
						icon: import_lucide_react.CalendarRange,
						tone: "muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: `Year ${year}`,
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: pick(yearTotals) }),
						icon: import_lucide_react.CalendarRange,
						tone: "accent",
						hint: `${ofType.filter((t) => t.date.startsWith(String(year))).length} records`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: `${label} history`,
					className: "lg:col-span-3",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
							value: view,
							onValueChange: (v) => setView(v),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "monthly",
								children: "Monthly"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "yearly",
								children: "Yearly"
							})] })
						}), view === "monthly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							size: "sm",
							"aria-label": "Year",
							value: String(year),
							onChange: (e) => setYear(Number(e.target.value)),
							children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: y,
								children: y
							}, y))
						}) : null]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContainer, {
						config: { value: {
							label,
							color
						} },
						className: "h-64 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: history,
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
									width: 60,
									tickFormatter: (v) => formatMoney(v * 100, money, { compact: true })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {
									cursor: { fillOpacity: .4 },
									content: ({ active, payload, label: l }) => active && payload?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border bg-popover px-3 py-2 text-xs shadow-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: l
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono",
											children: formatMoney(Number(payload[0]?.value) * 100, money)
										})]
									}) : null
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "value",
									fill: "var(--color-value)",
									radius: [
										6,
										6,
										0,
										0
									],
									maxBarSize: 36
								})
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "By category",
					description: `Year ${year}`,
					className: "lg:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDonut, {
						slices,
						total: pick(yearTotals),
						label
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `All ${label.toLowerCase()}`,
				description: `${filtered.length} of ${ofType.length} records`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxFilters, {
						filters,
						onChange: set,
						onReset: reset,
						fixedType: type
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsTable, {
						transactions: filtered,
						emptyTitle: ofType.length === 0 ? `No ${singular} recorded yet` : "No matching records",
						emptyAction: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "sm",
							onClick: () => openNew(type),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}),
								" Add ",
								singular
							]
						})
					})]
				})
			})
		]
	});
}
export { TypeLedgerPage };

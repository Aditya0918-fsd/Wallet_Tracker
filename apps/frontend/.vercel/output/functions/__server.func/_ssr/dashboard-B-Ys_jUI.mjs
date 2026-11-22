import { __toESM } from "../_runtime.mjs";
import { Badge } from "./badge-Dl7EzMfQ.mjs";
import { Button$1, cn } from "./router-CV1frvwC.mjs";
import { Card, PRESET_LABELS, budgetUsage, byCategory, formatDay, growth, monthRange, monthlySeries, presetRange, savingsRate, totals, useWallet } from "./card-DMJBVK8X.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-DO92WjiG.mjs";
import { Progress$1 } from "./progress-CKNjNqMk.mjs";
import { Amount } from "./amount-D-JW0VDA.mjs";
import { BalanceArea, CashflowBars } from "./cashflow-charts-ZsrYkS43.mjs";
import { CategoryDonut } from "./category-donut-CHmtpdym.mjs";
import { Panel } from "./panel-CTs0xhDl.mjs";
import { StatCard } from "./stat-card-9qXhPqJD.mjs";
import { TransactionsTable } from "./transactions-table-OC2-7CIf.mjs";
import { useTxDialog } from "./use-tx-dialog-BkFXropk.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { format, subMonths } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/dashboard-B-Ys_jUI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var PERIODS = [
	"thisMonth",
	"prevMonth",
	"last30",
	"thisYear",
	"all"
];
function Dashboard() {
	const { data } = useWallet();
	const { openNew, openTask } = useTxDialog();
	const [period, setPeriod] = (0, import_react.useState)("all");
	const now = /* @__PURE__ */ new Date();
	const txs = data.transactions;
	const stats = (0, import_react.useMemo)(() => {
		const all = totals(txs);
		const range = presetRange(period);
		return {
			all,
			p: totals(txs, range),
			month: totals(txs, monthRange(/* @__PURE__ */ new Date())),
			prevMonth: totals(txs, monthRange(subMonths(/* @__PURE__ */ new Date(), 1))),
			range
		};
	}, [txs, period]);
	const series = (0, import_react.useMemo)(() => monthlySeries(txs, 6), [txs]);
	const expenseSlices = (0, import_react.useMemo)(() => byCategory(txs, data.categories, "expense", stats.range), [
		txs,
		data.categories,
		stats.range
	]);
	const incomeSlices = (0, import_react.useMemo)(() => byCategory(txs, data.categories, "income", stats.range), [
		txs,
		data.categories,
		stats.range
	]);
	const budgets = (0, import_react.useMemo)(() => budgetUsage(data.budgets, txs, data.categories, monthRange(/* @__PURE__ */ new Date())), [
		data.budgets,
		txs,
		data.categories
	]);
	const recent = (0, import_react.useMemo)(() => [...txs].sort((a, b) => a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date)).slice(0, 6), [txs]);
	const upcoming = (0, import_react.useMemo)(() => data.recurring.filter((r) => !r.paused).sort((a, b) => a.nextDate.localeCompare(b.nextDate)).slice(0, 4), [data.recurring]);
	const monthRate = savingsRate(stats.month);
	const alerts = budgets.filter((b) => b.status !== "ok");
	const firstName = data.profile.name.split(" ")[0];
	const hour = now.getHours();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "relative overflow-hidden border-0 bg-sidebar p-0 text-sidebar-foreground shadow-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-sidebar-primary/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-chart-1/25 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-sidebar-foreground/70",
									children: [
										hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening",
										", ",
										firstName
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.2em] text-sidebar-foreground/60 uppercase",
									children: "Available balance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
									value: stats.all.net,
									className: cn("font-display text-4xl font-semibold sm:text-5xl", stats.all.net < 0 ? "text-destructive" : "text-sidebar-accent-foreground")
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "sm",
											className: "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/85",
											onClick: () => openNew("income"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowDownCircle, {}), " Add income"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "sm",
											variant: "secondary",
											className: "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80",
											onClick: () => openNew("expense"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpCircle, {}), " Add expense"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "sm",
											variant: "ghost",
											className: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
											render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/transactions" }),
											nativeButton: false,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Receipt, {}), " Transactions"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "sm",
											variant: "ghost",
											className: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
											onClick: openTask,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ListPlus, {}), " Add task"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
											size: "sm",
											variant: "ghost",
											className: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
											render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/analytics" }),
											nativeButton: false,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.BarChart3, {}), " Analytics"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-2xl bg-sidebar-accent/70 p-5 backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm font-semibold text-sidebar-accent-foreground",
										children: format(now, "MMMM yyyy")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-sidebar-foreground/60",
										children: "Savings goal: 20%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-sidebar-foreground/60",
										children: "In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: stats.month.income,
										className: "font-semibold text-sidebar-primary"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-sidebar-foreground/60",
										children: "Out"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: stats.month.expense,
										className: "font-semibold text-sidebar-accent-foreground"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sidebar-foreground/60",
											children: "Saved this month"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-sidebar-accent-foreground",
											children: monthRate === null ? "—" : `${monthRate.toFixed(1)}%`
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
										value: Math.max(0, Math.min(100, (monthRate ?? 0) / 20 * 100)),
										className: "[&_[data-slot=progress-indicator]]:bg-sidebar-primary [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-sidebar/60"
									})]
								})
							]
						})]
					})
				]
			}),
			alerts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: alerts.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/budgets",
					className: cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-muted/50", a.status === "exceeded" ? "border-destructive/30 bg-destructive/5" : "border-chart-4/40 bg-chart-4/10"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.AlertTriangle, { className: cn("size-4 shrink-0", a.status === "exceeded" ? "text-destructive" : "text-foreground") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.categoryName }),
								" ",
								a.status === "exceeded" ? "budget exceeded" : "budget almost used",
								" · ",
								Math.round(a.usage),
								"% used"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { className: "size-4 text-muted-foreground" })
					]
				}, a.budget.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
					"aria-label": "Reporting period",
					value: period,
					onChange: (e) => setPeriod(e.target.value),
					children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
						value: p,
						children: PRESET_LABELS[p]
					}, p))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total income",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: stats.p.income }),
						icon: import_lucide_react.TrendingUp,
						hint: PRESET_LABELS[period]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total expenses",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: stats.p.expense }),
						icon: import_lucide_react.TrendingDown,
						tone: "destructive",
						hint: PRESET_LABELS[period]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Available balance",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: stats.all.net,
							type: "net"
						}),
						icon: import_lucide_react.Wallet,
						tone: "accent",
						hint: "All-time income minus expenses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total savings",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: stats.p.net,
							type: "net"
						}),
						icon: import_lucide_react.PiggyBank,
						tone: "accent",
						hint: savingsRate(stats.p) === null ? "No income in period" : `${savingsRate(stats.p)?.toFixed(1)}% savings rate`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly income",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: stats.month.income }),
						icon: import_lucide_react.ArrowDownCircle,
						delta: growth(stats.month.income, stats.prevMonth.income),
						hint: "vs last month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly expenses",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: stats.month.expense }),
						icon: import_lucide_react.ArrowUpCircle,
						tone: "destructive",
						invert: true,
						delta: growth(stats.month.expense, stats.prevMonth.expense),
						hint: "vs last month"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Income vs expenses",
					description: "Last 6 months",
					className: "xl:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashflowBars, { points: series })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Balance over time",
					description: "Running balance at month end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BalanceArea, {
						points: series,
						className: "h-72 w-full"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Where your money goes",
					description: PRESET_LABELS[period],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDonut, {
						slices: expenseSlices,
						total: stats.p.expense,
						label: "Expenses"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Where your money comes from",
					description: PRESET_LABELS[period],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryDonut, {
						slices: incomeSlices,
						total: stats.p.income,
						label: "Income"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Recent transactions",
					className: "xl:col-span-2",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "ghost",
						size: "sm",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/transactions" }),
						nativeButton: false,
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, {})]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsTable, {
						transactions: recent,
						variant: "compact",
						emptyTitle: "No transactions yet",
						emptyAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							onClick: () => openNew("income"),
							children: "Record your first income"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Budget usage",
						description: "This month",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "ghost",
							size: "sm",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/budgets" }),
							nativeButton: false,
							children: "Manage"
						}),
						children: budgets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No budgets yet. Set monthly limits to track spending."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-4",
							children: budgets.slice(0, 4).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: b.categoryName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
												value: b.spent,
												compact: true
											}),
											" / ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
												value: b.budget.limit,
												compact: true
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
									value: Math.min(100, b.usage),
									className: cn("[&_[data-slot=progress-track]]:h-2", b.status === "exceeded" && "[&_[data-slot=progress-indicator]]:bg-destructive", b.status === "warning" && "[&_[data-slot=progress-indicator]]:bg-chart-4")
								})]
							}, b.budget.id))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Upcoming recurring",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "ghost",
							size: "sm",
							render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/recurring" }),
							nativeButton: false,
							children: "Manage"
						}),
						children: upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No scheduled payments. Add salary, rent, or subscriptions."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: upcoming.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-8 place-items-center rounded-lg bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CalendarClock, { className: "size-4 text-muted-foreground" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate font-medium",
											children: r.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: formatDay(r.nextDate, data.settings.dateFormat)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "hidden capitalize sm:inline-flex",
										children: r.frequency
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: r.amount,
										type: r.type,
										signed: true,
										className: "text-xs font-semibold"
									})
								]
							}, r.id))
						})
					})]
				})]
			})
		]
	});
}
export { Dashboard as component };

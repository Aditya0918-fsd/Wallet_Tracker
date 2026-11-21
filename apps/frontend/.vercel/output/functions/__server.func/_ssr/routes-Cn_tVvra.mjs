import { Logo } from "./logo-vAFHrHGr.mjs";
import { ThemeToggle } from "./theme-toggle-KJlTYGp9.mjs";
import { Button$1 } from "./router-BGnyA3VS.mjs";
import { SignInButton } from "./signin-SXYwgPQg.mjs";
import { useAuth } from "./use-auth-QIvZ0sFa.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { motion } from "../_libs/motion.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-Cn_tVvra.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var FEATURES = [
	{
		icon: import_lucide_react.Wallet,
		title: "Income and expenses",
		body: "Record every rupee in seconds with categories, payment methods, and notes."
	},
	{
		icon: import_lucide_react.BarChart3,
		title: "22 chart views",
		body: "Waterfalls, sunbursts, candlesticks, and more, all from your real data."
	},
	{
		icon: import_lucide_react.PiggyBank,
		title: "Monthly budgets",
		body: "Set limits per category and get warned at 80% before you overspend."
	},
	{
		icon: import_lucide_react.Repeat,
		title: "Recurring payments",
		body: "Salary, rent, and subscriptions post themselves, never twice."
	},
	{
		icon: import_lucide_react.CheckSquare,
		title: "Money to-dos",
		body: "Deadlines and priorities for bills, renewals, and paperwork."
	},
	{
		icon: import_lucide_react.Bell,
		title: "Smart alerts",
		body: "Budget warnings, overdue tasks, and a monthly recap."
	}
];
var BARS = [
	42,
	58,
	35,
	70,
	52,
	80,
	64
];
function Landing() {
	const { user } = useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--accent)_70%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_50%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[size:56px_56px] opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						size: "sm",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard" }),
						nativeButton: false,
						children: "Dashboard"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, {
						size: "sm",
						variant: "secondary"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldCheck, { className: "size-3.5 text-primary" }), " Private by design · INR first"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl",
								children: [
									"Know exactly where your ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-serif font-normal text-primary italic",
										children: "money"
									}),
									" goes."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xl text-lg text-muted-foreground",
								children: "Wallet Tracker brings your income, expenses, budgets, and savings into one calm dashboard, with totals and charts that update the moment you add a transaction."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									size: "lg",
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard" }),
									nativeButton: false,
									className: "h-12 px-6 text-base",
									children: ["Open dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, {})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, {
									size: "lg",
									className: "h-12 px-6 text-base",
									signInText: "Get started free",
									showIcon: false
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: "Sign in with Google or email"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { y: 16 },
						animate: { y: 0 },
						transition: {
							duration: .7,
							ease: "easeOut"
						},
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl bg-sidebar p-6 text-sidebar-foreground shadow-2xl ring-1 ring-black/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.2em] text-sidebar-foreground/60 uppercase",
									children: "Available balance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pt-1 font-display text-4xl font-semibold text-sidebar-accent-foreground",
									children: "₹1,84,320.50"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 flex h-36 items-end gap-2.5",
									children: BARS.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: { height: `${h}%` },
										className: "flex-1 rounded-t-lg bg-sidebar-primary/85"
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-sidebar-accent p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-sidebar-foreground/60",
											children: "This month in"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-lg text-sidebar-primary",
											children: "+₹92,000"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-sidebar-accent p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-sidebar-foreground/60",
											children: "This month out"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-lg text-sidebar-accent-foreground",
											children: "−₹41,250"
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute -right-4 -bottom-16 hidden w-56 rounded-2xl border bg-card p-4 shadow-xl sm:block",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Food budget"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display font-semibold",
									children: "₹4,000 of ₹5,000"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-2 rounded-full bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-4/5 rounded-full bg-chart-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pt-1.5 text-[11px] text-muted-foreground",
									children: "80% used · ₹1,000 left"
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-6xl px-5 pb-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "pb-8 font-display text-3xl font-semibold tracking-tight",
						children: "Everything a careful spender needs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: FEATURES.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								delay: i * .05,
								duration: .4,
								ease: "easeOut"
							},
							className: "rounded-2xl border bg-card/80 p-6 backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "pt-4 font-display text-lg font-semibold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "pt-1 text-sm text-muted-foreground",
									children: f.body
								})
							]
						}, f.title))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Wallet Tracker"
					] })]
				})
			})
		]
	});
}
export { Landing as component };

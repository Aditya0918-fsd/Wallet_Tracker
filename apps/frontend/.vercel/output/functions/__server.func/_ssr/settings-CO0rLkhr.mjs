import { __toESM } from "../_runtime.mjs";
import { Button$1, CURRENCIES, apiHref, apiRequest, cn, formatMoney, useTheme } from "./router-BGnyA3VS.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { Label } from "./label-C09qvLPy.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-CQoS0Rkt.mjs";
import { ConfirmDialog } from "./confirm-dialog-D8LQ_B_g.mjs";
import { Panel } from "./panel-d5fe1IY9.mjs";
import { UserAvatar } from "./app-shell-BssJ5xO0.mjs";
import { useAuth } from "./use-auth-QIvZ0sFa.mjs";
import { DATE_FORMATS, formatDay, todayDay, useWallet } from "./card-CHTOrAKP.mjs";
import { categoryInUse, deleteCategory, updateSettings } from "./dropdown-menu-DJhjwrac.mjs";
import { downloadCsv, downloadJson } from "./export-foZGWWqf.mjs";
import { parseWallet } from "./store-DtDvpF2c.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { useQuery } from "../_libs/tanstack__react-query2.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { SwitchRoot, SwitchThumb } from "../_libs/base-ui__react7.mjs";
// node_modules/.nitro/vite/services/ssr/assets/settings-CO0rLkhr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function Switch$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchRoot, {
		"data-slot": "switch",
		"data-size": size,
		className: cn("peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, {
			"data-slot": "switch-thumb",
			className: "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] dark:data-checked:bg-primary-foreground group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground"
		})
	});
}
var THEMES = [
	{
		id: "light",
		label: "Light",
		icon: import_lucide_react.Sun
	},
	{
		id: "dark",
		label: "Dark",
		icon: import_lucide_react.Moon
	},
	{
		id: "system",
		label: "System",
		icon: import_lucide_react.Monitor
	}
];
var LOCALES = [
	{
		id: "en-IN",
		label: "Indian (12,34,567.89)"
	},
	{
		id: "en-US",
		label: "International (1,234,567.89)"
	},
	{
		id: "de-DE",
		label: "European (1.234.567,89)"
	},
	{
		id: "fr-FR",
		label: "French (1 234 567,89)"
	}
];
var NOTIFY = [
	{
		key: "notifyBudget",
		label: "Budget alerts",
		hint: "When you reach 80% or exceed a budget"
	},
	{
		key: "notifyRecurring",
		label: "Recurring reminders",
		hint: "Upcoming and posted recurring transactions"
	},
	{
		key: "notifyTasks",
		label: "Task deadlines",
		hint: "When a task becomes overdue"
	},
	{
		key: "notifyMonthly",
		label: "Monthly summary",
		hint: "A recap of last month's income and spending"
	},
	{
		key: "notifyTransactions",
		label: "Transaction confirmations",
		hint: "Each time you add income or an expense"
	}
];
function SessionManagement() {
	const sessionsQuery = useQuery({
		queryKey: ["auth-sessions"],
		queryFn: () => apiRequest("/auth/sessions")
	});
	const sessions = sessionsQuery.data ?? [];
	(0, import_react.useEffect)(() => {
		if (sessionsQuery.error) toast.error(sessionsQuery.error instanceof Error ? sessionsQuery.error.message : "Could not load sessions.");
	}, [sessionsQuery.error]);
	async function revoke(id) {
		try {
			await apiRequest("/auth/sessions/" + encodeURIComponent(id), { method: "DELETE" });
			toast.success("Session revoked");
			await sessionsQuery.refetch();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not revoke session.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "Active sessions",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				sessionsQuery.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading sessions…"
				}) : null,
				sessions.map((session) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: session.current ? "This device" : "Signed-in device"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Signed in ",
							new Date(session.createdAt).toLocaleString(),
							" · Expires ",
							new Date(session.expiresAt).toLocaleDateString()
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						size: "sm",
						disabled: session.current,
						onClick: () => void revoke(session.id),
						children: "Revoke"
					})]
				}, session.id)),
				!sessionsQuery.isPending && sessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No active sessions found."
				})
			]
		})
	});
}
function Row({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-sm font-medium",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: hint
		}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:w-64",
			children
		})]
	});
}
function SettingsPage() {
	const { data, update, replace, reset, email, money } = useWallet();
	const { theme, setTheme } = useTheme();
	const { signOut, user } = useAuth();
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const s = data.settings;
	const set = (patch) => {
		update((d) => updateSettings(d, patch));
		toast.success("Preferences saved");
	};
	const custom = data.categories.filter((c) => !c.isDefault);
	const importFile = async (file) => {
		if (!file) return;
		const parsed = parseWallet(await file.text(), data.profile.name);
		if (!parsed) return toast.error("That file isn't a valid Wallet Tracker backup");
		const merge = (current, incoming) => {
			const known = new Set(current.map((item) => item.id));
			const additions = incoming.filter((item) => !known.has(item.id));
			return {
				rows: [...current, ...additions],
				added: additions.length
			};
		};
		const transactions = merge(data.transactions, parsed.transactions), categories = merge(data.categories, parsed.categories);
		const tasks = merge(data.tasks, parsed.tasks), budgets = merge(data.budgets, parsed.budgets);
		const recurring = merge(data.recurring, parsed.recurring), notifications = merge(data.notifications, parsed.notifications);
		replace({
			...data,
			transactions: transactions.rows,
			categories: categories.rows,
			tasks: tasks.rows,
			budgets: budgets.rows,
			recurring: recurring.rows,
			notifications: notifications.rows
		});
		const added = transactions.added + categories.added + tasks.added + budgets.added + recurring.added + notifications.added;
		toast.success("Backup merged safely", { description: added + " new records added; duplicate IDs were skipped." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Settings"
				}),
				description: "Manage your account and preferences."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Account",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAvatar, { className: "size-14" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-lg font-semibold",
								children: data.profile.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									variant: "secondary",
									size: "sm",
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/profile" }),
									nativeButton: false,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.User, {}), " Edit profile"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "secondary",
									size: "sm",
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth/change-password" }),
									nativeButton: false,
									children: "Change password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									variant: "destructive",
									size: "sm",
									onClick: () => void signOut({ returnTo: "/" }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, {}), " Log out"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-4 text-xs text-muted-foreground",
					children: "Password hashing and sessions are handled by the Wallet Tracker backend. Use the forgot-password link on the sign-in screen if needed."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionManagement, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Sign-in methods",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "/auth/change-password" }),
						nativeButton: false,
						children: user?.authMethods?.password ? "Change password" : "Set a password"
					}), !user?.authMethods?.google && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "secondary",
						render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: apiHref("/auth/google/link") }),
						nativeButton: false,
						children: "Connect Google"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Appearance",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-3",
					children: THEMES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTheme(t.id),
						className: cn("flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors hover:bg-muted/50", theme === t.id && "border-primary bg-primary/5 text-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "size-5" }), t.label]
					}, t.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Financial preferences",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Default currency",
							hint: `Preview: ${formatMoney(123456789, money)}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "w-full",
								value: s.currency,
								onChange: (e) => set({ currency: e.target.value }),
								children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value: c.code,
									children: c.label
								}, c.code))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Number format",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "w-full",
								value: s.numberLocale,
								onChange: (e) => set({ numberLocale: e.target.value }),
								children: LOCALES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value: l.id,
									children: l.label
								}, l.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Date format",
							hint: `Today: ${formatDay(todayDay(), s.dateFormat)}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "w-full",
								value: s.dateFormat,
								onChange: (e) => set({ dateFormat: e.target.value }),
								children: DATE_FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value: f,
									children: formatDay(todayDay(), f)
								}, f))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "First day of the week",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
								className: "w-full",
								value: String(s.weekStartsOn),
								onChange: (e) => set({ weekStartsOn: e.target.value === "0" ? 0 : 1 }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value: "1",
									children: "Monday"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value: "0",
									children: "Sunday"
								})]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Notifications",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					children: NOTIFY.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: n.hint
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
							checked: Boolean(s[n.key]),
							onCheckedChange: (v) => set({ [n.key]: v }),
							"aria-label": n.label
						})]
					}, n.key))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Custom categories",
				description: "Categories you added. Defaults can't be removed.",
				children: custom.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No custom categories yet. Add one from any transaction form."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-2",
					children: custom.map((c) => {
						const used = categoryInUse(data, c.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1 rounded-full border py-1 pr-1 pl-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground capitalize",
									children: ["· ", c.type]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "ghost",
									size: "icon-xs",
									"aria-label": `Delete ${c.name}`,
									disabled: used,
									title: used ? "In use by transactions, budgets, or schedules" : "Delete",
									onClick: () => {
										update((d) => deleteCategory(d, c.id));
										toast.success("Category removed");
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {})
								})
							]
						}, c.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Data management",
				description: "Your account data syncs to your Wallet Tracker account. Download a backup regularly.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "secondary",
							className: "justify-start",
							disabled: data.transactions.length === 0,
							onClick: () => downloadCsv("all-transactions", data.transactions, data.categories),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Download, {}), " Export financial data (CSV)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "secondary",
							className: "justify-start",
							onClick: () => downloadJson("wallet-tracker-backup", data),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.FileJson, {}), " Download account data (backup)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "secondary",
							className: "justify-start",
							onClick: () => fileRef.current?.click(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Upload, {}), " Restore from backup"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "application/json,.json",
							className: "hidden",
							onChange: (e) => void importFile(e.target.files?.[0])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							variant: "destructive",
							className: "justify-start",
							onClick: () => setConfirmReset(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete all my data"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 pt-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Database, { className: "size-3.5" }),
						" ",
						data.transactions.length,
						" transactions · ",
						data.tasks.length,
						" tasks · ",
						data.budgets.length,
						" budgets ·",
						" ",
						data.recurring.length,
						" schedules"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: confirmReset,
				onOpenChange: setConfirmReset,
				title: "Delete all your data?",
				description: "This permanently erases every transaction, task, budget, schedule, and preference from your account. Download a backup first if you might need it. Your sign-in account itself is not removed.",
				confirmLabel: "Delete everything",
				onConfirm: () => {
					reset();
					toast.success("All data deleted");
				}
			})
		]
	});
}
export { SettingsPage as component };

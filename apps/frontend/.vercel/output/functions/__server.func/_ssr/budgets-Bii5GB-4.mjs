import { __toESM } from "../_runtime.mjs";
import { PageHeader } from "./page-header-CNhl5PYf.mjs";
import { Button$1, cn, minorToInput, parseAmountToMinor } from "./router-CV1frvwC.mjs";
import { Card, budgetUsage, monthRange, useWallet } from "./card-DMJBVK8X.mjs";
import { Dialog$1, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog-AT5g43mg.mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, deleteBudget, upsertBudget } from "./dropdown-menu-2jleO2R6.mjs";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty-D8Vt0WGC.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { Label } from "./label-DrwUoeEr.mjs";
import { Progress$1 } from "./progress-CKNjNqMk.mjs";
import { Amount } from "./amount-D-JW0VDA.mjs";
import { CategorySelect } from "./category-select-BdW5oQJT.mjs";
import { ConfirmDialog } from "./confirm-dialog-oCcIuwqE.mjs";
import { StatCard } from "./stat-card-9qXhPqJD.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { format } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/budgets-Bii5GB-4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function BudgetsPage() {
	const { data, update } = useWallet();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const usage = (0, import_react.useMemo)(() => budgetUsage(data.budgets, data.transactions, data.categories, monthRange(/* @__PURE__ */ new Date())), [
		data.budgets,
		data.transactions,
		data.categories
	]);
	const totalLimit = usage.reduce((s, u) => s + u.budget.limit, 0);
	const totalSpent = usage.reduce((s, u) => s + u.spent, 0);
	const warnings = usage.filter((u) => u.status !== "ok").length;
	const openNew = () => {
		setEditing(null);
		setFormOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Budgets"
				}),
				description: `Monthly spending limits for ${format(/* @__PURE__ */ new Date(), "MMMM yyyy")}. Limits reset each month; history is kept.`,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " New budget"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total budgeted",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: totalLimit }),
						icon: import_lucide_react.PiggyBank
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Spent so far",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: totalSpent }),
						icon: import_lucide_react.ShieldCheck,
						tone: "destructive",
						hint: totalLimit > 0 ? `${(totalSpent / totalLimit * 100).toFixed(0)}% of all budgets` : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Remaining",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: totalLimit - totalSpent,
							type: "net"
						}),
						icon: import_lucide_react.AlertTriangle,
						tone: "accent",
						hint: warnings > 0 ? `${warnings} need attention` : "All on track"
					})
				]
			}),
			usage.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
				className: "border border-dashed py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
						variant: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.PiggyBank, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "No budgets yet" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: "Set a monthly limit for Food, Shopping, or any category and we'll warn you at 80%." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " Create a budget"]
				}) })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: usage.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: cn("gap-4 px-5 shadow-sm", u.status === "exceeded" && "border-destructive/40", u.status === "warning" && "border-chart-4/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-display text-lg font-semibold",
									children: u.categoryName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusLabel, { u })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "ghost",
									size: "icon-sm",
									"aria-label": "Budget actions"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreVertical, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								className: "w-36",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => {
											setEditing(u.budget);
											setFormOpen(true);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pencil, {}), " Edit"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										variant: "destructive",
										onClick: () => setToDelete(u),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete"]
									})
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
							value: Math.min(100, u.usage),
							className: cn("[&_[data-slot=progress-track]]:h-2.5", u.status === "exceeded" && "[&_[data-slot=progress-indicator]]:bg-destructive", u.status === "warning" && "[&_[data-slot=progress-indicator]]:bg-chart-4")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-4 gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Budget",
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: u.budget.limit,
										compact: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Spent",
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: u.spent,
										compact: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Remaining",
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
										value: u.remaining,
										type: "net",
										compact: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Usage",
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono",
										children: [Math.round(u.usage), "%"]
									})
								})
							]
						})
					]
				}, u.budget.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetDialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				editing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: toDelete !== null,
				onOpenChange: (o) => {
					if (!o) setToDelete(null);
				},
				title: "Delete this budget?",
				description: `The ${toDelete?.categoryName ?? ""} budget will be removed. Your expenses are not affected.`,
				onConfirm: () => {
					if (!toDelete) return;
					update((d) => deleteBudget(d, toDelete.budget.id));
					toast.success("Budget deleted");
				}
			})
		]
	});
}
function StatusLabel({ u }) {
	if (u.status === "exceeded") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1 text-xs font-medium text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.OctagonAlert, { className: "size-3.5" }), " Over budget"]
	});
	if (u.status === "warning") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-1 text-xs font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.AlertTriangle, { className: "size-3.5" }), " Approaching limit"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-muted-foreground",
		children: "On track"
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "truncate font-semibold",
			children: value
		})]
	});
}
function BudgetDialog({ open, onOpenChange, editing }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetForm, {
				editing,
				onDone: () => onOpenChange(false)
			}, editing?.id ?? "new") : null
		})
	});
}
function BudgetForm({ editing, onDone }) {
	const { update } = useWallet();
	const [categoryId, setCategoryId] = (0, import_react.useState)(editing?.categoryId ?? "");
	const [limit, setLimit] = (0, import_react.useState)(editing ? minorToInput(editing.limit) : "");
	const [error, setError] = (0, import_react.useState)(null);
	const submit = (e) => {
		e.preventDefault();
		const amount = parseAmountToMinor(limit);
		if (!categoryId) return setError("Choose a category");
		if (amount === null) return setError("Enter a valid limit greater than 0");
		try {
			update((d) => upsertBudget(d, {
				id: editing?.id,
				categoryId,
				limit: amount
			}));
			toast.success(editing ? "Budget updated" : "Budget created");
			onDone();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not save budget");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "grid gap-4",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-xl",
				children: editing ? "Edit budget" : "New monthly budget"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Set a spending limit for an expense category." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySelect, {
					type: "expense",
					value: categoryId,
					onChange: setCategoryId
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "limit",
					children: "Monthly limit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "limit",
					inputMode: "decimal",
					className: "font-mono",
					placeholder: "5000",
					value: limit,
					onChange: (e) => setLimit(e.target.value)
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-destructive",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				variant: "ghost",
				onClick: onDone,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "submit",
				children: editing ? "Save changes" : "Create budget"
			})] })
		]
	});
}
export { BudgetsPage as component };

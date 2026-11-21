import { __toESM } from "../_runtime.mjs";
import { Badge } from "./badge-BSVLYYzJ.mjs";
import { Button$1 } from "./router-BGnyA3VS.mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, deleteTransaction } from "./dropdown-menu-DJhjwrac.mjs";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty-Ct7DPFVD.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-CJaci4eC.mjs";
import { useTxDialog } from "./use-tx-dialog-BkFXropk.mjs";
import { PAYMENT_METHODS, formatDay, useWallet } from "./card-CHTOrAKP.mjs";
import { Amount } from "./amount-CWKc9SaL.mjs";
import { ConfirmDialog } from "./confirm-dialog-D8LQ_B_g.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/transactions-table-DRJ_E5Vc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var PAGE_SIZE = 15;
function TransactionsTable({ transactions, emptyTitle, emptyAction, variant = "full" }) {
	const { data, update } = useWallet();
	const { openDetails, openEdit } = useTxDialog();
	const [page, setPage] = (0, import_react.useState)(0);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const names = new Map(data.categories.map((c) => [c.id, c.name]));
	const pages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
	const current = Math.min(page, pages - 1);
	const rows = variant === "compact" ? transactions : transactions.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
	if (transactions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
		className: "border border-dashed py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
				variant: "icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Receipt, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: emptyTitle ?? "No transactions found" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: "Try adjusting filters, or record a new transaction." })
		] }), emptyAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: emptyAction }) : null]
	});
	const actions = (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "ghost",
			size: "icon-sm",
			"aria-label": "Transaction actions",
			onClick: (e) => e.stopPropagation()
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreVertical, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => openDetails(t),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, {}), " View details"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: () => openEdit(t),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pencil, {}), " Edit"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				variant: "destructive",
				onClick: () => setToDelete(t),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete"]
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y rounded-xl border md:hidden",
				children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-w-0 flex-1 cursor-pointer flex-col text-left",
							onClick: () => openDetails(t),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 truncate font-medium",
								children: [t.recurringId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Repeat, { className: "size-3.5 shrink-0 text-muted-foreground" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: t.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									names.get(t.categoryId) ?? "Uncategorised",
									" · ",
									formatDay(t.date, data.settings.dateFormat)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: t.amount,
							currency: t.currency,
							type: t.type,
							signed: true,
							className: "text-sm font-semibold"
						}),
						actions(t)
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-hidden rounded-xl border md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
					className: "bg-muted/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "w-32",
							children: "ID"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Method" }) : null,
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "max-w-56",
							children: "Description"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-10" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "cursor-pointer",
					onClick: () => openDetails(t),
					children: [
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs text-muted-foreground",
							children: t.ref
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-56",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 font-medium",
								children: [t.recurringId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Repeat, { className: "size-3.5 shrink-0 text-muted-foreground" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: t.title
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: t.type === "income" ? "secondary" : "destructive",
							className: "capitalize",
							children: t.type
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-muted-foreground",
							children: names.get(t.categoryId) ?? "Uncategorised"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-muted-foreground",
							children: formatDay(t.date, data.settings.dateFormat)
						}),
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "whitespace-nowrap text-muted-foreground",
							children: PAYMENT_METHODS[t.paymentMethod]
						}) : null,
						variant === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-56 truncate text-muted-foreground",
							children: t.description || "—"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								value: t.amount,
								currency: t.currency,
								type: t.type,
								signed: true,
								className: "font-semibold"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							onClick: (e) => e.stopPropagation(),
							children: actions(t)
						})
					]
				}, t.id)) })] })
			}),
			variant === "full" && pages > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					current * PAGE_SIZE + 1,
					"–",
					Math.min((current + 1) * PAGE_SIZE, transactions.length),
					" of ",
					transactions.length
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "secondary",
							size: "sm",
							disabled: current === 0,
							onClick: () => setPage(current - 1),
							children: "Previous"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [
								current + 1,
								" / ",
								pages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							variant: "secondary",
							size: "sm",
							disabled: current >= pages - 1,
							onClick: () => setPage(current + 1),
							children: "Next"
						})
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: toDelete !== null,
				onOpenChange: (o) => {
					if (!o) setToDelete(null);
				},
				title: "Delete this transaction?",
				description: `"${toDelete?.title ?? ""}" will be removed and all totals, budgets, and charts will update.`,
				onConfirm: () => {
					if (!toDelete) return;
					update((d) => deleteTransaction(d, toDelete.id));
					toast.success("Transaction deleted");
				}
			})
		]
	});
}
export { TransactionsTable };

import { Button$1 } from "./router-BGnyA3VS.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { Amount } from "./amount-CWKc9SaL.mjs";
import { ExportMenu, TxFilters, useTxFilters } from "./tx-filters-CwG9Ongq.mjs";
import { Panel } from "./panel-d5fe1IY9.mjs";
import { StatCard } from "./stat-card-BTX7wK1S.mjs";
import { TransactionsTable } from "./transactions-table-DRJ_E5Vc.mjs";
import { useTxDialog } from "./use-tx-dialog-BkFXropk.mjs";
import { totals, useWallet } from "./card-CHTOrAKP.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/transactions-CmHCw429.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function TransactionsPage() {
	const { data } = useWallet();
	const { openNew } = useTxDialog();
	const { filters, set, reset, filtered } = useTxFilters(data.transactions, data.categories);
	const t = totals(filtered);
	const rangeLabel = filters.from || filters.to ? `${filters.from || "start"} to ${filters.to || "today"}` : "All dates";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Transactions"
				}),
				description: "Your complete financial history in one ledger.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportMenu, {
						name: "transactions",
						title: "Transaction history",
						rangeLabel,
						transactions: filtered
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						size: "sm",
						variant: "secondary",
						onClick: () => openNew("income"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowDownCircle, {}), " Income"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						size: "sm",
						onClick: () => openNew("expense"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpCircle, {}), " Expense"]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Filtered income",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: t.income }),
						icon: import_lucide_react.ArrowDownCircle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Filtered expenses",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, { value: t.expense }),
						icon: import_lucide_react.ArrowUpCircle,
						tone: "destructive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Net",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
							value: t.net,
							type: "net"
						}),
						icon: import_lucide_react.Scale,
						tone: "accent",
						hint: `${filtered.length} transactions`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Ledger",
				description: `${filtered.length} of ${data.transactions.length} transactions`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxFilters, {
						filters,
						onChange: set,
						onReset: reset
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionsTable, {
						transactions: filtered,
						emptyTitle: data.transactions.length === 0 ? "No transactions yet" : "No matching transactions",
						emptyAction: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							onClick: () => openNew("expense"),
							children: "Add a transaction"
						})
					})]
				})
			})
		]
	});
}
export { TransactionsPage as component };

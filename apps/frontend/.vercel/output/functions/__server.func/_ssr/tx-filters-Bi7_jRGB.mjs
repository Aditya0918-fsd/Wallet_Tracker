import { __toESM } from "../_runtime.mjs";
import { Button$1 } from "./router-CV1frvwC.mjs";
import { useWallet } from "./card-DMJBVK8X.mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu-2jleO2R6.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-DO92WjiG.mjs";
import { downloadCsv, downloadTransactionsPdf } from "./export-D1CrH6Eo.mjs";
import { l } from "../_libs/use-debounce.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/tx-filters-Bi7_jRGB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var EMPTY_FILTERS = {
	search: "",
	type: "all",
	categoryId: "all",
	from: "",
	to: "",
	sort: "newest"
};
function applyTxFilters(txs, f, categories) {
	const q = f.search.trim().toLowerCase();
	const names = new Map(categories.map((c) => [c.id, c.name.toLowerCase()]));
	const out = txs.filter((t) => {
		if (f.type !== "all" && t.type !== f.type) return false;
		if (f.categoryId !== "all" && t.categoryId !== f.categoryId) return false;
		if (f.from && t.date < f.from) return false;
		if (f.to && t.date > f.to) return false;
		if (q) {
			if (!`${t.title} ${t.description} ${t.ref} ${names.get(t.categoryId) ?? ""}`.toLowerCase().includes(q)) return false;
		}
		return true;
	});
	const byDate = (a, b) => a.date === b.date ? a.createdAt.localeCompare(b.createdAt) : a.date.localeCompare(b.date);
	switch (f.sort) {
		case "newest": return out.sort((a, b) => byDate(b, a));
		case "oldest": return out.sort(byDate);
		case "amount_desc": return out.sort((a, b) => b.amount - a.amount);
		case "amount_asc": return out.sort((a, b) => a.amount - b.amount);
	}
}
function useTxFilters(txs, categories, initial) {
	const [filters, setFilters] = (0, import_react.useState)({
		...EMPTY_FILTERS,
		...initial
	});
	const [debouncedSearch] = l(filters.search, 200);
	const effective = (0, import_react.useMemo)(() => ({
		...filters,
		search: debouncedSearch
	}), [filters, debouncedSearch]);
	const filtered = (0, import_react.useMemo)(() => applyTxFilters(txs, effective, categories), [
		txs,
		effective,
		categories
	]);
	const set = (patch) => setFilters((f) => ({
		...f,
		...patch
	}));
	const reset = () => setFilters({
		...EMPTY_FILTERS,
		...initial
	});
	return {
		filters,
		set,
		reset,
		filtered
	};
}
function ExportMenu({ name, title, rangeLabel, transactions }) {
	const { data } = useWallet();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const empty = transactions.length === 0;
	const pdf = async () => {
		setBusy(true);
		try {
			await downloadTransactionsPdf(title, rangeLabel, transactions, data);
			toast.success("PDF downloaded");
		} catch {
			toast.error("Could not create the PDF");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "secondary",
			size: "sm",
			disabled: busy
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Download, {}), " Export"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-48",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			disabled: empty,
			onClick: () => void pdf(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.FileText, {}), " Download PDF"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			disabled: empty,
			onClick: () => {
				downloadCsv(name, transactions, data.categories);
				toast.success("CSV downloaded");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.FileSpreadsheet, {}), " Export CSV"]
		})]
	})] });
}
function TxFilters({ filters, onChange, onReset, fixedType }) {
	const { data } = useWallet();
	const type = fixedType ?? (filters.type === "all" ? void 0 : filters.type);
	const categories = data.categories.filter((c) => !type || c.type === type);
	const dirty = filters.search !== "" || filters.categoryId !== "all" || filters.from !== "" || filters.to !== "" || filters.sort !== EMPTY_FILTERS.sort || !fixedType && filters.type !== "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-0 lg:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					value: filters.search,
					onChange: (e) => onChange({ search: e.target.value }),
					placeholder: "Search title, note, or ID",
					className: "pl-9",
					"aria-label": "Search transactions"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap",
				children: [
					!fixedType ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						"aria-label": "Type",
						className: "w-full sm:w-36",
						value: filters.type,
						onChange: (e) => onChange({
							type: e.target.value,
							categoryId: "all"
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "all",
								children: "All types"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "income",
								children: "Income"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "expense",
								children: "Expense"
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						"aria-label": "Category",
						className: "w-full sm:w-44",
						value: filters.categoryId,
						onChange: (e) => onChange({ categoryId: e.target.value }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
							value: "all",
							children: "All categories"
						}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
							value: c.id,
							children: c.name
						}, c.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
						"aria-label": "Sort",
						className: "w-full sm:w-40",
						value: filters.sort,
						onChange: (e) => onChange({ sort: e.target.value }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "newest",
								children: "Newest first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "oldest",
								children: "Oldest first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "amount_desc",
								children: "Highest amount"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: "amount_asc",
								children: "Lowest amount"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						type: "date",
						"aria-label": "From date",
						className: "w-full sm:w-40",
						value: filters.from,
						max: filters.to || void 0,
						onChange: (e) => onChange({ from: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						type: "date",
						"aria-label": "To date",
						className: "w-full sm:w-40",
						value: filters.to,
						min: filters.from || void 0,
						onChange: (e) => onChange({ to: e.target.value })
					})
				]
			}),
			dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
				variant: "ghost",
				size: "sm",
				onClick: onReset,
				className: "self-start lg:self-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, {}), " Clear filters"]
			}) : null
		]
	});
}
export { ExportMenu, TxFilters, useTxFilters };

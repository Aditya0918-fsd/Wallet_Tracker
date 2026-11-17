import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce.ts";
import type { Category, Transaction, TxType } from "@/lib/wallet/types.ts";

export type TxFilterState = {
  search: string;
  type: "all" | TxType;
  categoryId: string;
  from: string;
  to: string;
  sort: "newest" | "oldest" | "amount_desc" | "amount_asc";
};

export const EMPTY_FILTERS: TxFilterState = {
  search: "",
  type: "all",
  categoryId: "all",
  from: "",
  to: "",
  sort: "newest",
};

export function applyTxFilters(
  txs: Transaction[],
  f: TxFilterState,
  categories: Category[],
): Transaction[] {
  const q = f.search.trim().toLowerCase();
  const names = new Map(categories.map((c) => [c.id, c.name.toLowerCase()]));
  const out = txs.filter((t) => {
    if (f.type !== "all" && t.type !== f.type) return false;
    if (f.categoryId !== "all" && t.categoryId !== f.categoryId) return false;
    if (f.from && t.date < f.from) return false;
    if (f.to && t.date > f.to) return false;
    if (q) {
      const hay = `${t.title} ${t.description} ${t.ref} ${names.get(t.categoryId) ?? ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const byDate = (a: Transaction, b: Transaction) =>
    a.date === b.date ? a.createdAt.localeCompare(b.createdAt) : a.date.localeCompare(b.date);
  switch (f.sort) {
    case "newest":
      return out.sort((a, b) => byDate(b, a));
    case "oldest":
      return out.sort(byDate);
    case "amount_desc":
      return out.sort((a, b) => b.amount - a.amount);
    case "amount_asc":
      return out.sort((a, b) => a.amount - b.amount);
  }
}

export function useTxFilters(txs: Transaction[], categories: Category[], initial?: Partial<TxFilterState>) {
  const [filters, setFilters] = useState<TxFilterState>({ ...EMPTY_FILTERS, ...initial });
  const [debouncedSearch] = useDebounce(filters.search, 200);
  const effective = useMemo(() => ({ ...filters, search: debouncedSearch }), [filters, debouncedSearch]);
  const filtered = useMemo(() => applyTxFilters(txs, effective, categories), [txs, effective, categories]);
  const set = (patch: Partial<TxFilterState>) => setFilters((f) => ({ ...f, ...patch }));
  const reset = () => setFilters({ ...EMPTY_FILTERS, ...initial });
  return { filters, set, reset, filtered };
}

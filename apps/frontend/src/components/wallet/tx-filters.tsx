import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { EMPTY_FILTERS, type TxFilterState } from "@/hooks/use-tx-filters.ts";
import type { TxType } from "@/lib/wallet/types.ts";

type Props = {
  filters: TxFilterState;
  onChange: (patch: Partial<TxFilterState>) => void;
  onReset: () => void;
  /** Fixed type hides the type filter and limits categories. */
  fixedType?: TxType;
};

export default function TxFilters({ filters, onChange, onReset, fixedType }: Props) {
  const { data } = useWallet();
  const type = fixedType ?? (filters.type === "all" ? undefined : filters.type);
  const categories = data.categories.filter((c) => !type || c.type === type);
  const dirty =
    filters.search !== "" ||
    filters.categoryId !== "all" ||
    filters.from !== "" ||
    filters.to !== "" ||
    filters.sort !== EMPTY_FILTERS.sort ||
    (!fixedType && filters.type !== "all");

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <div className="relative min-w-0 lg:w-72">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search title, note, or ID"
          className="pl-9"
          aria-label="Search transactions"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {!fixedType ? (
          <NativeSelect
            aria-label="Type"
            className="w-full sm:w-36"
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value as TxFilterState["type"], categoryId: "all" })}
          >
            <NativeSelectOption value="all">All types</NativeSelectOption>
            <NativeSelectOption value="income">Income</NativeSelectOption>
            <NativeSelectOption value="expense">Expense</NativeSelectOption>
          </NativeSelect>
        ) : null}
        <NativeSelect
          aria-label="Category"
          className="w-full sm:w-44"
          value={filters.categoryId}
          onChange={(e) => onChange({ categoryId: e.target.value })}
        >
          <NativeSelectOption value="all">All categories</NativeSelectOption>
          {categories.map((c) => (
            <NativeSelectOption key={c.id} value={c.id}>
              {c.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <NativeSelect
          aria-label="Sort"
          className="w-full sm:w-40"
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value as TxFilterState["sort"] })}
        >
          <NativeSelectOption value="newest">Newest first</NativeSelectOption>
          <NativeSelectOption value="oldest">Oldest first</NativeSelectOption>
          <NativeSelectOption value="amount_desc">Highest amount</NativeSelectOption>
          <NativeSelectOption value="amount_asc">Lowest amount</NativeSelectOption>
        </NativeSelect>
        <Input
          type="date"
          aria-label="From date"
          className="w-full sm:w-40"
          value={filters.from}
          max={filters.to || undefined}
          onChange={(e) => onChange({ from: e.target.value })}
        />
        <Input
          type="date"
          aria-label="To date"
          className="w-full sm:w-40"
          value={filters.to}
          min={filters.from || undefined}
          onChange={(e) => onChange({ to: e.target.value })}
        />
      </div>
      {dirty ? (
        <Button variant="ghost" size="sm" onClick={onReset} className="self-start lg:self-auto">
          <X /> Clear filters
        </Button>
      ) : null}
    </div>
  );
}

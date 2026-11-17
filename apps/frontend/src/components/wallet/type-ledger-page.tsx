import { subMonths } from "date-fns";
import { CalendarRange, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button.tsx";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import PageHeader from "@/components/page-header.tsx";
import { useTxDialog } from "@/hooks/use-tx-dialog.ts";
import { useTxFilters } from "@/hooks/use-tx-filters.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { byCategory, growth, totals } from "@/lib/wallet/calc.ts";
import { EXPENSE_COLOR, INCOME_COLOR } from "@/lib/wallet/colors.ts";
import { monthRange, yearRange } from "@/lib/wallet/dates.ts";
import { formatMoney } from "@/lib/wallet/money.ts";
import type { TxType } from "@/lib/wallet/types.ts";
import Amount from "./amount.tsx";
import CategoryDonut from "./category-donut.tsx";
import ExportMenu from "./export-menu.tsx";
import Panel from "./panel.tsx";
import StatCard from "./stat-card.tsx";
import TransactionsTable from "./transactions-table.tsx";
import TxFilters from "./tx-filters.tsx";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Shared page for the Income and Expenses sections. */
export default function TypeLedgerPage({ type }: { type: TxType }) {
  const { data, money } = useWallet();
  const { openNew } = useTxDialog();
  const label = type === "income" ? "Income" : "Expenses";
  const singular = type === "income" ? "income" : "expense";
  const color = type === "income" ? INCOME_COLOR : EXPENSE_COLOR;
  const ofType = useMemo(() => data.transactions.filter((t) => t.type === type), [data.transactions, type]);

  const years = useMemo(() => {
    const set = new Set<number>([new Date().getFullYear()]);
    for (const t of ofType) set.add(Number(t.date.slice(0, 4)));
    return [...set].sort((a, b) => b - a);
  }, [ofType]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [view, setView] = useState<"monthly" | "yearly">("monthly");

  const now = new Date();
  const thisMonth = totals(ofType, monthRange(now));
  const prevMonth = totals(ofType, monthRange(subMonths(now, 1)));
  const yearTotals = totals(ofType, yearRange(year));
  const pick = (t: { income: number; expense: number }) => (type === "income" ? t.income : t.expense);
  const slices = useMemo(() => byCategory(ofType, data.categories, type, yearRange(year)), [ofType, data.categories, type, year]);

  const history = useMemo(() => {
    const key = type === "income" ? "income" : "expense";
    if (view === "monthly") {
      return MONTHS.map((m, i) => ({ label: m, value: totals(ofType, monthRange(new Date(year, i, 1)))[key] / 100 }));
    }
    return [...years].reverse().map((y) => ({ label: String(y), value: totals(ofType, yearRange(y))[key] / 100 }));
  }, [ofType, view, year, years, type]);

  const { filters, set, reset, filtered } = useTxFilters(ofType, data.categories, { type });

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">{label}</span>}
        description={type === "income" ? "Every rupee that came in, organised." : "Every payment that went out, organised."}
        actions={
          <>
            <ExportMenu name={singular} title={`${label} report`} rangeLabel="Filtered records" transactions={filtered} />
            <Button size="sm" onClick={() => openNew(type)}>
              <Plus /> Add {singular}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="This month"
          value={<Amount value={pick(thisMonth)} />}
          icon={type === "income" ? TrendingUp : TrendingDown}
          tone={type === "income" ? "primary" : "destructive"}
          delta={growth(pick(thisMonth), pick(prevMonth))}
          invert={type === "expense"}
          hint="vs last month"
        />
        <StatCard label="Previous month" value={<Amount value={pick(prevMonth)} />} icon={CalendarRange} tone="muted" />
        <StatCard
          label={`Year ${year}`}
          value={<Amount value={pick(yearTotals)} />}
          icon={CalendarRange}
          tone="accent"
          hint={`${ofType.filter((t) => t.date.startsWith(String(year))).length} records`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Panel
          title={`${label} history`}
          className="lg:col-span-3"
          action={
            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={(v) => setView(v as "monthly" | "yearly")}>
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </Tabs>
              {view === "monthly" ? (
                <NativeSelect size="sm" aria-label="Year" value={String(year)} onChange={(e) => setYear(Number(e.target.value))}>
                  {years.map((y) => (
                    <NativeSelectOption key={y} value={y}>
                      {y}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              ) : null}
            </div>
          }
        >
          <ChartContainer config={{ value: { label, color } }} className="h-64 w-full">
            <BarChart data={history}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={60} tickFormatter={(v: number) => formatMoney(v * 100, money, { compact: true })} />
              <ChartTooltip
                cursor={{ fillOpacity: 0.4 }}
                content={({ active, payload, label: l }) =>
                  active && payload?.length ? (
                    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
                      <p className="font-medium">{l}</p>
                      <p className="font-mono">{formatMoney(Number(payload[0]?.value) * 100, money)}</p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ChartContainer>
        </Panel>
        <Panel title="By category" description={`Year ${year}`} className="lg:col-span-2">
          <CategoryDonut slices={slices} total={pick(yearTotals)} label={label} />
        </Panel>
      </div>

      <Panel title={`All ${label.toLowerCase()}`} description={`${filtered.length} of ${ofType.length} records`}>
        <div className="space-y-4">
          <TxFilters filters={filters} onChange={set} onReset={reset} fixedType={type} />
          <TransactionsTable
            transactions={filtered}
            emptyTitle={ofType.length === 0 ? `No ${singular} recorded yet` : "No matching records"}
            emptyAction={
              <Button size="sm" onClick={() => openNew(type)}>
                <Plus /> Add {singular}
              </Button>
            }
          />
        </div>
      </Panel>
    </div>
  );
}

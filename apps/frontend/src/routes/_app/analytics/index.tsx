import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarDays,
  Crown,
  FileDown,
  Feather,
  PiggyBank,
  RotateCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/page-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select.tsx";
import Amount from "@/components/wallet/amount.tsx";
import { CashflowBars } from "@/components/wallet/cashflow-charts.tsx";
import Panel from "@/components/wallet/panel.tsx";
import StatCard from "@/components/wallet/stat-card.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { averageDaily, growth, monthlySeries, savingsRate } from "@/lib/wallet/calc.ts";
import { formatDay, presetRange, previousRange, PRESET_LABELS, todayDay, type DayRange, type PresetRange } from "@/lib/wallet/dates.ts";
import { downloadAnalyticsPdf } from "@/lib/wallet/export.ts";
import ChartRenderer from "./-components/chart-renderer.tsx";
import { CHARTS, UNAVAILABLE, type ChartId } from "./-lib/charts.ts";
import { buildModel, clampRange } from "./-lib/model.ts";

export const Route = createFileRoute("/_app/analytics/")({
  head: () => ({ meta: [{ title: "Analytics · Wallet Tracker" }] }),
  component: AnalyticsPage,
});

const PRESETS: PresetRange[] = ["today", "last7", "last30", "thisMonth", "prevMonth", "thisYear", "all", "custom"];
const GROUPS = [...new Set(CHARTS.map((c) => c.group))];

function AnalyticsPage() {
  const { data, money, replace } = useWallet();
  const [preset, setPreset] = useState<PresetRange>("thisMonth");
  const [custom, setCustom] = useState<DayRange>(() => presetRange("thisMonth"));
  const [chart, setChart] = useState<ChartId>("grouped");
  const [busy, setBusy] = useState(false);
  const today = todayDay();

  const range = useMemo(() => {
    const raw = preset === "custom" ? custom : presetRange(preset);
    return clampRange(raw, data.transactions, today);
  }, [preset, custom, data.transactions, today]);
  const prevRange = useMemo(() => previousRange(range), [range]);
  const model = useMemo(() => buildModel(data.transactions, data.categories, range, prevRange), [data.transactions, data.categories, range, prevRange]);
  const monthly = useMemo(() => monthlySeries(data.transactions, 12), [data.transactions]);

  const t = model.totals;
  const highest = model.expenseSlices[0];
  const lowest = model.expenseSlices[model.expenseSlices.length - 1];
  const meta = CHARTS.find((c) => c.id === chart);
  const rangeLabel =
    preset === "custom" || preset === "all"
      ? `${formatDay(range.from, data.settings.dateFormat)} – ${formatDay(range.to, data.settings.dateFormat)}`
      : PRESET_LABELS[preset];

  const refresh = () => {
    // Re-read from storage in case another tab changed it.
    replace({ ...data });
    toast.success("Data refreshed", { description: format(new Date(), "p") });
  };

  const exportPdf = async () => {
    setBusy(true);
    try {
      await downloadAnalyticsPdf(
        {
          range,
          rangeLabel,
          totals: t,
          expenseByCategory: model.expenseSlices,
          incomeByCategory: model.incomeSlices,
          monthly: monthly.slice(-6),
          transactions: [...model.txs].sort((a, b) => b.date.localeCompare(a.date)),
        },
        data,
      );
      toast.success("Report downloaded");
    } catch {
      toast.error("Could not create the report");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">Analytics</span>}
        description="Understand where your money moves, in any range you choose."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={refresh}>
              <RotateCw /> Refresh
            </Button>
            <Button size="sm" onClick={() => void exportPdf()} disabled={busy}>
              <FileDown /> {busy ? "Preparing…" : "PDF report"}
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={preset === p ? "default" : "ghost"}
              onClick={() => setPreset(p)}
              className="rounded-full"
            >
              {PRESET_LABELS[p]}
            </Button>
          ))}
        </div>
        {preset === "custom" ? (
          <div className="flex items-center gap-2 sm:ml-auto">
            <Input
              type="date"
              aria-label="From"
              className="w-40"
              value={custom.from}
              max={custom.to}
              onChange={(e) => e.target.value && setCustom((c) => ({ ...c, from: e.target.value }))}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="date"
              aria-label="To"
              className="w-40"
              value={custom.to}
              min={custom.from}
              onChange={(e) => e.target.value && setCustom((c) => ({ ...c, to: e.target.value }))}
            />
          </div>
        ) : (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground sm:ml-auto sm:pr-2">
            <CalendarDays className="size-4" /> {formatDay(range.from, data.settings.dateFormat)} – {formatDay(range.to, data.settings.dateFormat)}
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total income" value={<Amount value={t.income} />} icon={ArrowDownCircle} delta={growth(t.income, model.prevTotals.income)} hint="income growth" />
        <StatCard
          label="Total expenses"
          value={<Amount value={t.expense} />}
          icon={ArrowUpCircle}
          tone="destructive"
          invert
          delta={growth(t.expense, model.prevTotals.expense)}
          hint="expense growth"
        />
        <StatCard
          label="Net savings"
          value={<Amount value={t.net} type="net" />}
          icon={PiggyBank}
          tone="accent"
          hint={savingsRate(t) === null ? "No income in range" : `${savingsRate(t)?.toFixed(1)}% savings rate`}
        />
        <StatCard label="Average daily spend" value={<Amount value={averageDaily(t.expense, range, today)} />} icon={CalendarDays} tone="muted" />
      </div>

      <Panel
        title={meta?.label ?? "Chart"}
        description={meta?.description}
        action={
          <NativeSelect aria-label="Chart type" value={chart} onChange={(e) => setChart(e.target.value as ChartId)} className="w-52">
            {GROUPS.map((g) => (
              <NativeSelectOptGroup key={g} label={g}>
                {CHARTS.filter((c) => c.group === g).map((c) => (
                  <NativeSelectOption key={c.id} value={c.id}>
                    {c.label}
                    {UNAVAILABLE.has(c.id) ? " (not suited to this data)" : ""}
                  </NativeSelectOption>
                ))}
              </NativeSelectOptGroup>
            ))}
          </NativeSelect>
        }
        className="[&_[data-slot=card-header]]:flex-wrap"
      >
        <ChartRenderer id={chart} model={model} money={money} budgets={data.budgets} categories={data.categories} />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Spending highlights" description={rangeLabel}>
          <div className="space-y-4">
            <Highlight icon={Crown} label="Highest spending category" name={highest?.name} amount={highest?.amount} tone="destructive" />
            <Highlight icon={Feather} label="Lowest spending category" name={model.expenseSlices.length > 1 ? lowest?.name : undefined} amount={model.expenseSlices.length > 1 ? lowest?.amount : undefined} tone="primary" />
            <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/60 p-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Transactions</p>
                <p className="font-display text-xl font-semibold">{model.txs.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Categories used</p>
                <p className="font-display text-xl font-semibold">{model.expenseSlices.length + model.incomeSlices.length}</p>
              </div>
            </div>
          </div>
        </Panel>
        <Panel title="Monthly comparison" description="Last 12 months" className="lg:col-span-2">
          <CashflowBars points={monthly} className="h-64 w-full" />
          <div className="flex flex-wrap gap-4 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-primary" /> Best month:{" "}
              {bestMonth(monthly)?.label ?? "—"}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingDown className="size-3.5 text-destructive" /> Highest spend:{" "}
              {[...monthly].sort((a, b) => b.expense - a.expense)[0]?.expense ? [...monthly].sort((a, b) => b.expense - a.expense)[0]?.label : "—"}
            </span>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function bestMonth<T extends { net: number; income: number; expense: number }>(points: T[]): T | undefined {
  const active = points.filter((p) => p.income || p.expense);
  return active.sort((a, b) => b.net - a.net)[0];
}

function Highlight({
  icon: Icon,
  label,
  name,
  amount,
  tone,
}: {
  icon: typeof Crown;
  label: string;
  name?: string;
  amount?: number;
  tone: "primary" | "destructive";
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={tone === "primary" ? "grid size-10 place-items-center rounded-xl bg-primary/10 text-primary" : "grid size-10 place-items-center rounded-xl bg-destructive/10 text-destructive"}>
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{name ?? "Not enough data"}</p>
      </div>
      {amount !== undefined ? <Amount value={amount} className="text-sm font-semibold" /> : null}
    </div>
  );
}

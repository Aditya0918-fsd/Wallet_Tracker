import { createFileRoute, Link } from "@tanstack/react-router";
import { format, subMonths } from "date-fns";
import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  CalendarClock,
  ChevronRight,
  ListPlus,
  PiggyBank,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import Amount from "@/components/wallet/amount.tsx";
import { BalanceArea, CashflowBars } from "@/components/wallet/cashflow-charts.tsx";
import CategoryDonut from "@/components/wallet/category-donut.tsx";
import Panel from "@/components/wallet/panel.tsx";
import StatCard from "@/components/wallet/stat-card.tsx";
import TransactionsTable from "@/components/wallet/transactions-table.tsx";
import { useTxDialog } from "@/hooks/use-tx-dialog.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { budgetUsage, byCategory, growth, monthlySeries, savingsRate, totals } from "@/lib/wallet/calc.ts";
import { formatDay, monthRange, presetRange, PRESET_LABELS, type PresetRange } from "@/lib/wallet/dates.ts";
import { cn } from "@/lib/utils.ts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · Wallet Tracker" }] }),
  component: Dashboard,
});

const PERIODS = ["thisMonth", "prevMonth", "last30", "thisYear", "all"] as const satisfies ReadonlyArray<Exclude<PresetRange, "custom">>;
type Period = (typeof PERIODS)[number];

function Dashboard() {
  const { data } = useWallet();
  const { openNew, openTask } = useTxDialog();
  const [period, setPeriod] = useState<Period>("all");
  const now = new Date();
  const txs = data.transactions;

  const stats = useMemo(() => {
    const all = totals(txs);
    const range = presetRange(period);
    const p = totals(txs, range);
    const month = totals(txs, monthRange(new Date()));
    const prevMonth = totals(txs, monthRange(subMonths(new Date(), 1)));
    return { all, p, month, prevMonth, range };
  }, [txs, period]);

  const series = useMemo(() => monthlySeries(txs, 6), [txs]);
  const expenseSlices = useMemo(() => byCategory(txs, data.categories, "expense", stats.range), [txs, data.categories, stats.range]);
  const incomeSlices = useMemo(() => byCategory(txs, data.categories, "income", stats.range), [txs, data.categories, stats.range]);
  const budgets = useMemo(
    () => budgetUsage(data.budgets, txs, data.categories, monthRange(new Date())),
    [data.budgets, txs, data.categories],
  );
  const recent = useMemo(
    () => [...txs].sort((a, b) => (a.date === b.date ? b.createdAt.localeCompare(a.createdAt) : b.date.localeCompare(a.date))).slice(0, 6),
    [txs],
  );
  const upcoming = useMemo(
    () => data.recurring.filter((r) => !r.paused).sort((a, b) => a.nextDate.localeCompare(b.nextDate)).slice(0, 4),
    [data.recurring],
  );

  const monthRate = savingsRate(stats.month);
  const alerts = budgets.filter((b) => b.status !== "ok");
  const firstName = data.profile.name.split(" ")[0];
  const hour = now.getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Hero balance band */}
      <Card className="relative overflow-hidden border-0 bg-sidebar p-0 text-sidebar-foreground shadow-lg">
        <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-sidebar-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-chart-1/25 blur-3xl" />
        <div className="relative grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div className="space-y-4">
            <p className="text-sm text-sidebar-foreground/70">
              {greet}, {firstName}
            </p>
            <div>
              <p className="text-xs tracking-[0.2em] text-sidebar-foreground/60 uppercase">Available balance</p>
              <Amount
                value={stats.all.net}
                className={cn(
                  "font-display text-4xl font-semibold sm:text-5xl",
                  stats.all.net < 0 ? "text-destructive" : "text-sidebar-accent-foreground",
                )}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/85" onClick={() => openNew("income")}>
                <ArrowDownCircle /> Add income
              </Button>
              <Button size="sm" variant="secondary" className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80" onClick={() => openNew("expense")}>
                <ArrowUpCircle /> Add expense
              </Button>
              <Button size="sm" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" render={<Link to="/transactions" />} nativeButton={false}>
                <Receipt /> Transactions
              </Button>
              <Button size="sm" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={openTask}>
                <ListPlus /> Add task
              </Button>
              <Button size="sm" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" render={<Link to="/analytics" />} nativeButton={false}>
                <BarChart3 /> Analytics
              </Button>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl bg-sidebar-accent/70 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold text-sidebar-accent-foreground">{format(now, "MMMM yyyy")}</p>
              <span className="text-xs text-sidebar-foreground/60">Savings goal: 20%</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-sidebar-foreground/60">In</p>
                <Amount value={stats.month.income} className="font-semibold text-sidebar-primary" />
              </div>
              <div>
                <p className="text-xs text-sidebar-foreground/60">Out</p>
                <Amount value={stats.month.expense} className="font-semibold text-sidebar-accent-foreground" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-sidebar-foreground/60">Saved this month</span>
                <span className="font-mono text-sidebar-accent-foreground">{monthRate === null ? "—" : `${monthRate.toFixed(1)}%`}</span>
              </div>
              <Progress
                value={Math.max(0, Math.min(100, ((monthRate ?? 0) / 20) * 100))}
                className="[&_[data-slot=progress-indicator]]:bg-sidebar-primary [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-sidebar/60"
              />
            </div>
          </div>
        </div>
      </Card>

      {alerts.length > 0 ? (
        <div className="flex flex-col gap-2">
          {alerts.slice(0, 3).map((a) => (
            <Link
              key={a.budget.id}
              to="/budgets"
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-muted/50",
                a.status === "exceeded" ? "border-destructive/30 bg-destructive/5" : "border-chart-4/40 bg-chart-4/10",
              )}
            >
              <AlertTriangle className={cn("size-4 shrink-0", a.status === "exceeded" ? "text-destructive" : "text-foreground")} />
              <span className="flex-1">
                <strong>{a.categoryName}</strong>{" "}
                {a.status === "exceeded" ? "budget exceeded" : "budget almost used"} · {Math.round(a.usage)}% used
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Overview</h1>
        <NativeSelect aria-label="Reporting period" value={period} onChange={(e) => setPeriod(e.target.value as Period)}>
          {PERIODS.map((p) => (
            <NativeSelectOption key={p} value={p}>
              {PRESET_LABELS[p]}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total income" value={<Amount value={stats.p.income} />} icon={TrendingUp} hint={PRESET_LABELS[period]} />
        <StatCard label="Total expenses" value={<Amount value={stats.p.expense} />} icon={TrendingDown} tone="destructive" hint={PRESET_LABELS[period]} />
        <StatCard label="Available balance" value={<Amount value={stats.all.net} type="net" />} icon={Wallet} tone="accent" hint="All-time income minus expenses" />
        <StatCard
          label="Total savings"
          value={<Amount value={stats.p.net} type="net" />}
          icon={PiggyBank}
          tone="accent"
          hint={savingsRate(stats.p) === null ? "No income in period" : `${savingsRate(stats.p)?.toFixed(1)}% savings rate`}
        />
        <StatCard
          label="Monthly income"
          value={<Amount value={stats.month.income} />}
          icon={ArrowDownCircle}
          delta={growth(stats.month.income, stats.prevMonth.income)}
          hint="vs last month"
        />
        <StatCard
          label="Monthly expenses"
          value={<Amount value={stats.month.expense} />}
          icon={ArrowUpCircle}
          tone="destructive"
          invert
          delta={growth(stats.month.expense, stats.prevMonth.expense)}
          hint="vs last month"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Income vs expenses" description="Last 6 months" className="xl:col-span-2">
          <CashflowBars points={series} />
        </Panel>
        <Panel title="Balance over time" description="Running balance at month end">
          <BalanceArea points={series} className="h-72 w-full" />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Where your money goes" description={PRESET_LABELS[period]}>
          <CategoryDonut slices={expenseSlices} total={stats.p.expense} label="Expenses" />
        </Panel>
        <Panel title="Where your money comes from" description={PRESET_LABELS[period]}>
          <CategoryDonut slices={incomeSlices} total={stats.p.income} label="Income" />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Panel
          title="Recent transactions"
          className="xl:col-span-2"
          action={
            <Button variant="ghost" size="sm" render={<Link to="/transactions" />} nativeButton={false}>
              View all <ChevronRight />
            </Button>
          }
        >
          <TransactionsTable
            transactions={recent}
            variant="compact"
            emptyTitle="No transactions yet"
            emptyAction={
              <Button size="sm" onClick={() => openNew("income")}>
                Record your first income
              </Button>
            }
          />
        </Panel>
        <div className="space-y-4">
          <Panel
            title="Budget usage"
            description="This month"
            action={
              <Button variant="ghost" size="sm" render={<Link to="/budgets" />} nativeButton={false}>
                Manage
              </Button>
            }
          >
            {budgets.length === 0 ? (
              <p className="text-sm text-muted-foreground">No budgets yet. Set monthly limits to track spending.</p>
            ) : (
              <ul className="space-y-4">
                {budgets.slice(0, 4).map((b) => (
                  <li key={b.budget.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{b.categoryName}</span>
                      <span className="text-xs text-muted-foreground">
                        <Amount value={b.spent} compact /> / <Amount value={b.budget.limit} compact />
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, b.usage)}
                      className={cn(
                        "[&_[data-slot=progress-track]]:h-2",
                        b.status === "exceeded" && "[&_[data-slot=progress-indicator]]:bg-destructive",
                        b.status === "warning" && "[&_[data-slot=progress-indicator]]:bg-chart-4",
                      )}
                    />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel
            title="Upcoming recurring"
            action={
              <Button variant="ghost" size="sm" render={<Link to="/recurring" />} nativeButton={false}>
                Manage
              </Button>
            }
          >
            {upcoming.length === 0 ? (
              <p className="text-sm text-muted-foreground">No scheduled payments. Add salary, rent, or subscriptions.</p>
            ) : (
              <ul className="space-y-3">
                {upcoming.map((r) => (
                  <li key={r.id} className="flex items-center gap-3 text-sm">
                    <span className="grid size-8 place-items-center rounded-lg bg-muted">
                      <CalendarClock className="size-4 text-muted-foreground" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{r.title}</span>
                      <span className="text-xs text-muted-foreground">{formatDay(r.nextDate, data.settings.dateFormat)}</span>
                    </span>
                    <Badge variant="secondary" className="hidden capitalize sm:inline-flex">
                      {r.frequency}
                    </Badge>
                    <Amount value={r.amount} type={r.type} signed className="text-xs font-semibold" />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

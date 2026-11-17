import { differenceInCalendarDays, eachDayOfInterval, eachMonthOfInterval, format } from "date-fns";
import { byCategory, totals, type CategorySlice } from "@/lib/wallet/calc.ts";
import { fromDay, inRange, toDay, type DayRange } from "@/lib/wallet/dates.ts";
import type { MoneyFormat } from "@/lib/wallet/money.ts";
import type { Budget, Category, Transaction } from "@/lib/wallet/types.ts";

export type ChartProps = {
  model: AnalyticsModel;
  money: MoneyFormat;
  budgets: Budget[];
  categories: Category[];
};

export type Bucket = {
  key: string;
  label: string;
  range: DayRange;
  income: number;
  expense: number;
  net: number;
  /** Running balance before/after this bucket and its extremes (candlestick). */
  open: number;
  close: number;
  high: number;
  low: number;
  byCategory: Record<string, number>;
};

/** Collapse "All time" to the span the user actually has data for. */
export function clampRange(range: DayRange, txs: Transaction[], today: string): DayRange {
  if (range.from !== "0000-01-01") return range;
  let min = today;
  for (const t of txs) if (t.date < min) min = t.date;
  return { from: min, to: range.to > today ? today : range.to };
}

export function buildBuckets(txs: Transaction[], range: DayRange): Bucket[] {
  const start = fromDay(range.from);
  const end = fromDay(range.to);
  const daily = differenceInCalendarDays(end, start) <= 62;
  const ranges: Array<{ key: string; label: string; range: DayRange }> = daily
    ? eachDayOfInterval({ start, end }).map((d) => ({ key: toDay(d), label: format(d, "d MMM"), range: { from: toDay(d), to: toDay(d) } }))
    : eachMonthOfInterval({ start, end }).map((d) => {
        const from = toDay(d) < range.from ? range.from : toDay(d);
        const monthEnd = toDay(new Date(d.getFullYear(), d.getMonth() + 1, 0));
        return { key: format(d, "yyyy-MM"), label: format(d, "MMM yy"), range: { from, to: monthEnd > range.to ? range.to : monthEnd } };
      });

  const sorted = [...txs].sort((a, b) => a.date.localeCompare(b.date));
  // Balance carried in from before the range.
  let running = 0;
  for (const t of sorted) {
    if (t.date >= range.from) break;
    running += t.type === "income" ? t.amount : -t.amount;
  }

  let idx = sorted.findIndex((t) => t.date >= range.from);
  if (idx < 0) idx = sorted.length;

  return ranges.map((r) => {
    const open = running;
    let high = running;
    let low = running;
    let income = 0;
    let expense = 0;
    const cats: Record<string, number> = {};
    while (idx < sorted.length) {
      const t = sorted[idx];
      if (!t || t.date > r.range.to) break;
      if (t.type === "income") {
        income += t.amount;
        running += t.amount;
      } else {
        expense += t.amount;
        running -= t.amount;
        cats[t.categoryId] = (cats[t.categoryId] ?? 0) + t.amount;
      }
      high = Math.max(high, running);
      low = Math.min(low, running);
      idx++;
    }
    return { ...r, income, expense, net: income - expense, open, close: running, high, low, byCategory: cats };
  });
}

export type AnalyticsModel = {
  range: DayRange;
  txs: Transaction[];
  buckets: Bucket[];
  totals: ReturnType<typeof totals>;
  prevTotals: ReturnType<typeof totals>;
  expenseSlices: CategorySlice[];
  incomeSlices: CategorySlice[];
  prevExpenseSlices: CategorySlice[];
  categoryStats: Array<{ categoryId: string; name: string; count: number; total: number; average: number }>;
};

export function buildModel(
  all: Transaction[],
  categories: Category[],
  range: DayRange,
  prevRange: DayRange,
): AnalyticsModel {
  const txs = all.filter((t) => inRange(t.date, range));
  const expenseSlices = byCategory(txs, categories, "expense");
  const counts = new Map<string, number>();
  for (const t of txs) if (t.type === "expense") counts.set(t.categoryId, (counts.get(t.categoryId) ?? 0) + 1);
  return {
    range,
    txs,
    buckets: buildBuckets(all, range),
    totals: totals(txs),
    prevTotals: totals(all, prevRange),
    expenseSlices,
    incomeSlices: byCategory(txs, categories, "income"),
    prevExpenseSlices: byCategory(all, categories, "expense", prevRange),
    categoryStats: expenseSlices.map((s) => {
      const count = counts.get(s.categoryId) ?? 0;
      return { ...s, count, total: s.amount, average: count ? Math.round(s.amount / count) : 0 };
    }),
  };
}

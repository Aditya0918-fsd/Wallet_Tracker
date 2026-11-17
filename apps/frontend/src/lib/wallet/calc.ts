import { format, subMonths } from "date-fns";
import {
  advance,
  fromDay,
  inRange,
  monthRange,
  type DayRange,
} from "./dates.ts";
import type {
  Budget,
  Category,
  DayString,
  RecurringSchedule,
  Task,
  Transaction,
  TxType,
} from "./types.ts";

export type Totals = { income: number; expense: number; net: number };

export function totals(txs: Transaction[], range?: DayRange): Totals {
  let income = 0;
  let expense = 0;
  for (const t of txs) {
    if (range && !inRange(t.date, range)) continue;
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, net: income - expense };
}

/** Savings rate in percent; null when there is no income (avoids divide by zero). */
export function savingsRate(t: Totals): number | null {
  if (t.income <= 0) return null;
  return (t.net / t.income) * 100;
}

/** Percent change from `prev` to `curr`; null when prev is zero. */
export function growth(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return ((curr - prev) / prev) * 100;
}

export type CategorySlice = { categoryId: string; name: string; amount: number };

export function byCategory(
  txs: Transaction[],
  categories: Category[],
  type: TxType,
  range?: DayRange,
): CategorySlice[] {
  const sums = new Map<string, number>();
  for (const t of txs) {
    if (t.type !== type) continue;
    if (range && !inRange(t.date, range)) continue;
    sums.set(t.categoryId, (sums.get(t.categoryId) ?? 0) + t.amount);
  }
  const names = new Map(categories.map((c) => [c.id, c.name]));
  return [...sums.entries()]
    .map(([categoryId, amount]) => ({
      categoryId,
      name: names.get(categoryId) ?? "Uncategorised",
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export type MonthPoint = {
  key: string;
  label: string;
  income: number;
  expense: number;
  net: number;
  /** Running balance at month end, counting all earlier history. */
  balance: number;
};

export function monthlySeries(txs: Transaction[], months: number, now = new Date()): MonthPoint[] {
  const points: MonthPoint[] = [];
  const firstRange = monthRange(subMonths(now, months - 1));
  let balance = totals(txs, { from: "0000-01-01", to: dayBefore(firstRange.from) }).net;
  for (let i = months - 1; i >= 0; i--) {
    const ref = subMonths(now, i);
    const t = totals(txs, monthRange(ref));
    balance += t.net;
    points.push({
      key: format(ref, "yyyy-MM"),
      label: format(ref, "MMM yy"),
      income: t.income,
      expense: t.expense,
      net: t.net,
      balance,
    });
  }
  return points;
}

function dayBefore(day: DayString): DayString {
  const d = fromDay(day);
  d.setDate(d.getDate() - 1);
  return format(d, "yyyy-MM-dd");
}

export type BudgetStatus = "ok" | "warning" | "exceeded";

export type BudgetUsage = {
  budget: Budget;
  categoryName: string;
  spent: number;
  remaining: number;
  /** 0..∞ percent */
  usage: number;
  status: BudgetStatus;
};

export const BUDGET_WARNING_PERCENT = 80;

export function budgetUsage(
  budgets: Budget[],
  txs: Transaction[],
  categories: Category[],
  month: DayRange,
): BudgetUsage[] {
  const names = new Map(categories.map((c) => [c.id, c.name]));
  return budgets.map((budget) => {
    let spent = 0;
    for (const t of txs) {
      if (t.type === "expense" && t.categoryId === budget.categoryId && inRange(t.date, month)) {
        spent += t.amount;
      }
    }
    const usage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    const status: BudgetStatus =
      usage > 100 ? "exceeded" : usage >= BUDGET_WARNING_PERCENT ? "warning" : "ok";
    return {
      budget,
      categoryName: names.get(budget.categoryId) ?? "Uncategorised",
      spent,
      remaining: budget.limit - spent,
      usage,
      status,
    };
  });
}

/**
 * Returns the occurrences each active schedule owes up to `today`, and the
 * schedule's next date afterwards. Existing transactions with the same
 * (recurringId, date) are skipped so a schedule never posts twice.
 */
export function dueRecurring(
  schedules: RecurringSchedule[],
  txs: Transaction[],
  today: DayString,
  maxPerSchedule = 400,
): Array<{ schedule: RecurringSchedule; dates: DayString[]; nextDate: DayString }> {
  const posted = new Set(
    txs.filter((t) => t.recurringId).map((t) => `${t.recurringId}|${t.date}`),
  );
  const out: Array<{ schedule: RecurringSchedule; dates: DayString[]; nextDate: DayString }> = [];
  for (const s of schedules) {
    if (s.paused || s.nextDate > today) continue;
    const dates: DayString[] = [];
    let next = s.nextDate;
    let guard = 0;
    while (next <= today && guard < maxPerSchedule) {
      if (!posted.has(`${s.id}|${next}`)) dates.push(next);
      next = advance(next, s.frequency);
      guard++;
    }
    out.push({ schedule: s, dates, nextDate: next });
  }
  return out;
}

export function isOverdue(task: Task, today: DayString): boolean {
  return !task.completed && task.dueDate !== null && task.dueDate < today;
}

/** Average daily expense over the range, capped at today for open-ended ranges. */
export function averageDaily(expense: number, range: DayRange, today: DayString): number {
  const end = range.to > today ? today : range.to;
  const start = fromDay(range.from);
  const days = Math.round((fromDay(end).getTime() - start.getTime()) / 86_400_000) + 1;
  if (days <= 0) return 0;
  return Math.round(expense / days);
}

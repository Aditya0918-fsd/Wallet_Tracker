import { addDays, format, subMonths } from "date-fns";
import { budgetUsage, dueRecurring, isOverdue, totals } from "./calc.ts";
import { fromDay, monthRange, toDay } from "./dates.ts";
import { formatMoney } from "./money.ts";
import { newId, newTxRef } from "./defaults.ts";
import type { AppNotification, NotificationKind, Transaction, WalletData } from "./types.ts";

const MAX_NOTIFICATIONS = 150;

export function pushNotification(
  data: WalletData,
  n: { key: string; kind: NotificationKind; title: string; message: string },
): WalletData {
  if (data.notifications.some((x) => x.key === n.key)) return data;
  const item: AppNotification = {
    ...n,
    id: newId(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  return {
    ...data,
    notifications: [item, ...data.notifications].slice(0, MAX_NOTIFICATIONS),
  };
}

/**
 * Brings derived state up to date: posts due recurring transactions and
 * raises budget, task, recurring, and monthly-summary alerts. Pure and
 * idempotent: running it twice yields no duplicates.
 */
export function reconcile(input: WalletData, now = new Date()): WalletData {
  let data = input;
  const today = toDay(now);
  const fmt = { currency: data.settings.currency, locale: data.settings.numberLocale };
  const s = data.settings;

  // 1. Post recurring transactions that have come due.
  const due = dueRecurring(data.recurring, data.transactions, today);
  if (due.length > 0) {
    const stamp = now.toISOString();
    const posted: Transaction[] = [];
    const nextById = new Map<string, string>();
    for (const { schedule, dates, nextDate } of due) {
      nextById.set(schedule.id, nextDate);
      for (const date of dates) {
        posted.push({
          id: newId(),
          ref: newTxRef(),
          type: schedule.type,
          title: schedule.title,
          amount: schedule.amount,
          categoryId: schedule.categoryId,
          date,
          paymentMethod: schedule.paymentMethod,
          description: schedule.description,
          createdAt: stamp,
          updatedAt: stamp,
          recurringId: schedule.id,
        });
      }
    }
    data = {
      ...data,
      transactions: [...posted, ...data.transactions],
      recurring: data.recurring.map((r) =>
        nextById.has(r.id) ? { ...r, nextDate: nextById.get(r.id) ?? r.nextDate } : r,
      ),
    };
    if (s.notifyRecurring) {
      for (const tx of posted) {
        data = pushNotification(data, {
          key: `rec-posted:${tx.recurringId}:${tx.date}`,
          kind: "recurring",
          title: `Recurring ${tx.type} recorded`,
          message: `${tx.title} · ${formatMoney(tx.amount, fmt)} on ${tx.date}`,
        });
      }
    }
  }

  // 2. Upcoming recurring payments in the next 3 days.
  if (s.notifyRecurring) {
    const soon = toDay(addDays(now, 3));
    for (const r of data.recurring) {
      if (r.paused || r.nextDate <= today || r.nextDate > soon) continue;
      data = pushNotification(data, {
        key: `rec-upcoming:${r.id}:${r.nextDate}`,
        kind: "recurring",
        title: "Upcoming recurring transaction",
        message: `${r.title} (${formatMoney(r.amount, fmt)}) is scheduled for ${format(fromDay(r.nextDate), "d MMM")}`,
      });
    }
  }

  // 3. Budget alerts for the current month.
  if (s.notifyBudget) {
    const month = monthRange(now);
    const monthKey = format(now, "yyyy-MM");
    for (const u of budgetUsage(data.budgets, data.transactions, data.categories, month)) {
      if (u.status === "exceeded") {
        data = pushNotification(data, {
          key: `budget-exceeded:${u.budget.id}:${monthKey}`,
          kind: "budget_exceeded",
          title: `${u.categoryName} budget exceeded`,
          message: `You've spent ${formatMoney(u.spent, fmt)} of ${formatMoney(u.budget.limit, fmt)} this month.`,
        });
      } else if (u.status === "warning") {
        data = pushNotification(data, {
          key: `budget-warning:${u.budget.id}:${monthKey}`,
          kind: "budget_warning",
          title: `${u.categoryName} budget almost used`,
          message: `${Math.round(u.usage)}% used. ${formatMoney(u.remaining, fmt)} left this month.`,
        });
      }
    }
  }

  // 4. Overdue tasks.
  if (s.notifyTasks) {
    for (const t of data.tasks) {
      if (!isOverdue(t, today) || t.dueDate === null) continue;
      data = pushNotification(data, {
        key: `task-overdue:${t.id}:${t.dueDate}`,
        kind: "task_overdue",
        title: "Task overdue",
        message: `"${t.title}" was due on ${format(fromDay(t.dueDate), "d MMM yyyy")}.`,
      });
    }
  }

  // 5. Monthly summary of the previous month, once it has activity.
  if (s.notifyMonthly) {
    const prev = subMonths(now, 1);
    const t = totals(data.transactions, monthRange(prev));
    if (t.income > 0 || t.expense > 0) {
      data = pushNotification(data, {
        key: `monthly:${format(prev, "yyyy-MM")}`,
        kind: "monthly_summary",
        title: `${format(prev, "MMMM")} summary`,
        message: `Income ${formatMoney(t.income, fmt)} · Expenses ${formatMoney(t.expense, fmt)} · Net ${formatMoney(t.net, fmt, { signed: true })}`,
      });
    }
  }

  return data;
}

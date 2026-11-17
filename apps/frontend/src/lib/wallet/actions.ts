import { newId, newTxRef } from "./defaults.ts";
import { pushNotification } from "./reconcile.ts";
import { formatMoney } from "./money.ts";
import type {
  Budget,
  Category,
  Profile,
  RecurringSchedule,
  Settings,
  Task,
  Transaction,
  TxType,
  WalletData,
} from "./types.ts";

/** Pure state transitions. Each returns a new WalletData. */

export type TxInput = Pick<
  Transaction,
  "type" | "title" | "amount" | "categoryId" | "date" | "paymentMethod" | "description"
>;

export function addTransaction(data: WalletData, input: TxInput): WalletData {
  const now = new Date().toISOString();
  const tx: Transaction = { ...input, id: newId(), ref: newTxRef(), createdAt: now, updatedAt: now };
  let next: WalletData = { ...data, transactions: [tx, ...data.transactions] };
  if (data.settings.notifyTransactions) {
    next = pushNotification(next, {
      key: `tx-created:${tx.id}`,
      kind: "transaction",
      title: tx.type === "income" ? "Income added" : "Expense added",
      message: `${tx.title} · ${formatMoney(tx.amount, { currency: data.settings.currency, locale: data.settings.numberLocale })}`,
    });
  }
  return next;
}

export function updateTransaction(data: WalletData, id: string, input: TxInput): WalletData {
  return {
    ...data,
    transactions: data.transactions.map((t) =>
      t.id === id ? { ...t, ...input, updatedAt: new Date().toISOString() } : t,
    ),
  };
}

export function deleteTransaction(data: WalletData, id: string): WalletData {
  return { ...data, transactions: data.transactions.filter((t) => t.id !== id) };
}

export function addCategory(data: WalletData, type: TxType, name: string): { data: WalletData; category: Category } {
  const trimmed = name.trim();
  const existing = data.categories.find(
    (c) => c.type === type && c.name.toLowerCase() === trimmed.toLowerCase(),
  );
  if (existing) return { data, category: existing };
  const category: Category = { id: newId(), type, name: trimmed, isDefault: false };
  return { data: { ...data, categories: [...data.categories, category] }, category };
}

/** Custom categories can be removed only when nothing references them. */
export function categoryInUse(data: WalletData, id: string): boolean {
  return (
    data.transactions.some((t) => t.categoryId === id) ||
    data.budgets.some((b) => b.categoryId === id) ||
    data.recurring.some((r) => r.categoryId === id)
  );
}

export function deleteCategory(data: WalletData, id: string): WalletData {
  if (categoryInUse(data, id)) return data;
  return { ...data, categories: data.categories.filter((c) => c.id !== id || c.isDefault) };
}

export type TaskInput = Pick<Task, "title" | "description" | "dueDate" | "priority">;

export function addTask(data: WalletData, input: TaskInput): WalletData {
  const task: Task = {
    ...input,
    id: newId(),
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  };
  return { ...data, tasks: [task, ...data.tasks] };
}

export function updateTask(data: WalletData, id: string, input: TaskInput): WalletData {
  return { ...data, tasks: data.tasks.map((t) => (t.id === id ? { ...t, ...input } : t)) };
}

export function setTaskCompleted(data: WalletData, id: string, completed: boolean): WalletData {
  return {
    ...data,
    tasks: data.tasks.map((t) =>
      t.id === id ? { ...t, completed, completedAt: completed ? new Date().toISOString() : null } : t,
    ),
  };
}

export function deleteTask(data: WalletData, id: string): WalletData {
  return { ...data, tasks: data.tasks.filter((t) => t.id !== id) };
}

export function upsertBudget(
  data: WalletData,
  input: { id?: string; categoryId: string; limit: number },
): WalletData {
  const clash = data.budgets.find((b) => b.categoryId === input.categoryId && b.id !== input.id);
  if (clash) throw new Error("A budget for this category already exists.");
  if (input.id) {
    return {
      ...data,
      budgets: data.budgets.map((b) =>
        b.id === input.id ? { ...b, categoryId: input.categoryId, limit: input.limit } : b,
      ),
    };
  }
  const budget: Budget = {
    id: newId(),
    categoryId: input.categoryId,
    limit: input.limit,
    createdAt: new Date().toISOString(),
  };
  return { ...data, budgets: [...data.budgets, budget] };
}

export function deleteBudget(data: WalletData, id: string): WalletData {
  return { ...data, budgets: data.budgets.filter((b) => b.id !== id) };
}

export type RecurringInput = Pick<
  RecurringSchedule,
  "type" | "title" | "amount" | "categoryId" | "paymentMethod" | "description" | "frequency" | "startDate"
>;

export function addRecurring(data: WalletData, input: RecurringInput): WalletData {
  const r: RecurringSchedule = {
    ...input,
    id: newId(),
    nextDate: input.startDate,
    paused: false,
    createdAt: new Date().toISOString(),
  };
  return { ...data, recurring: [...data.recurring, r] };
}

export function updateRecurring(data: WalletData, id: string, input: RecurringInput): WalletData {
  return {
    ...data,
    recurring: data.recurring.map((r) => {
      if (r.id !== id) return r;
      // Changing the start date or frequency re-anchors the schedule; already
      // posted dates are still skipped by the duplicate guard.
      const reanchor = r.startDate !== input.startDate || r.frequency !== input.frequency;
      return { ...r, ...input, nextDate: reanchor ? input.startDate : r.nextDate };
    }),
  };
}

export function setRecurringPaused(data: WalletData, id: string, paused: boolean): WalletData {
  return { ...data, recurring: data.recurring.map((r) => (r.id === id ? { ...r, paused } : r)) };
}

export function deleteRecurring(data: WalletData, id: string): WalletData {
  return { ...data, recurring: data.recurring.filter((r) => r.id !== id) };
}

export function markNotificationRead(data: WalletData, id: string): WalletData {
  return {
    ...data,
    notifications: data.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
  };
}

export function markAllRead(data: WalletData): WalletData {
  return { ...data, notifications: data.notifications.map((n) => ({ ...n, read: true })) };
}

export function clearNotifications(data: WalletData): WalletData {
  // Keep read markers as dedupe keys so cleared alerts do not reappear.
  return { ...data, notifications: data.notifications.map((n) => ({ ...n, read: true, message: "", title: "" })) };
}

export function updateProfile(data: WalletData, profile: Partial<Profile>): WalletData {
  return { ...data, profile: { ...data.profile, ...profile } };
}

export function updateSettings(data: WalletData, settings: Partial<Settings>): WalletData {
  return { ...data, settings: { ...data.settings, ...settings } };
}

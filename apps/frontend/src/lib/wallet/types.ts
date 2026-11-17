/** Calendar day in the user's local timezone, `YYYY-MM-DD`. */
export type DayString = string;

export type TxType = "income" | "expense";

export type PaymentMethod =
  | "cash"
  | "upi"
  | "debit_card"
  | "credit_card"
  | "bank_transfer"
  | "wallet"
  | "cheque"
  | "other";

export type Transaction = {
  id: string;
  /** Short human-friendly reference shown in tables, e.g. TXN-8F2K1Q. */
  ref: string;
  type: TxType;
  title: string;
  /** Integer paise (smallest currency unit) to avoid float errors. */
  amount: number;
  /** ISO currency of this entry; legacy records inherit the account default during migration. */
  currency?: CurrencyCode;
  categoryId: string;
  date: DayString;
  paymentMethod: PaymentMethod;
  description: string;
  createdAt: string;
  updatedAt: string;
  /** Set when generated from a recurring schedule; used to prevent duplicates. */
  recurringId?: string;
};

export type Category = {
  id: string;
  type: TxType;
  name: string;
  isDefault: boolean;
};

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: DayString | null;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
};

export type Budget = {
  id: string;
  categoryId: string;
  /** Monthly limit in paise. */
  limit: number;
  createdAt: string;
};

export type Frequency = "daily" | "weekly" | "monthly" | "yearly";

export type RecurringSchedule = {
  id: string;
  type: TxType;
  title: string;
  amount: number;
  categoryId: string;
  paymentMethod: PaymentMethod;
  description: string;
  frequency: Frequency;
  startDate: DayString;
  /** Next date a transaction will be created on. */
  nextDate: DayString;
  paused: boolean;
  createdAt: string;
};

export type NotificationKind =
  | "transaction"
  | "budget_warning"
  | "budget_exceeded"
  | "recurring"
  | "task_overdue"
  | "monthly_summary";

export type AppNotification = {
  id: string;
  /** Dedupe key so the same alert is never raised twice. */
  key: string;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type Profile = {
  name: string;
  age: number | null;
  bio: string;
  /** Small resized data URL stored locally. */
  avatar: string | null;
};

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "JPY" | "AED" | "AUD" | "CAD" | "SGD";
export type DateFormat = "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd" | "d MMM yyyy";
export type NumberLocale = "en-IN" | "en-US" | "de-DE" | "fr-FR";

export type Settings = {
  currency: CurrencyCode;
  dateFormat: DateFormat;
  numberLocale: NumberLocale;
  weekStartsOn: 0 | 1;
  notifyBudget: boolean;
  notifyRecurring: boolean;
  notifyTasks: boolean;
  notifyMonthly: boolean;
  notifyTransactions: boolean;
};

export type WalletData = {
  version: 1;
  profile: Profile;
  settings: Settings;
  transactions: Transaction[];
  categories: Category[];
  tasks: Task[];
  budgets: Budget[];
  recurring: RecurringSchedule[];
  notifications: AppNotification[];
};


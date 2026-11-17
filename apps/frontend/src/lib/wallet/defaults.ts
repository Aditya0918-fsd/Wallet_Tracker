import type {
  Category,
  PaymentMethod,
  Settings,
  TaskPriority,
  WalletData,
} from "./types.ts";

export const PAYMENT_METHODS: Record<PaymentMethod, string> = {
  cash: "Cash",
  upi: "UPI",
  debit_card: "Debit card",
  credit_card: "Credit card",
  bank_transfer: "Bank transfer",
  wallet: "Digital wallet",
  cheque: "Cheque",
  other: "Other",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const DEFAULT_INCOME = [
  "Salary",
  "Business Income",
  "Freelancing",
  "Investments",
  "Interest",
  "Gifts",
  "Other Income",
];

const DEFAULT_EXPENSE = [
  "Food",
  "Shopping",
  "Transportation",
  "Education",
  "Healthcare",
  "Entertainment",
  "Bills",
  "Rent",
  "Travel",
  "Other Expenses",
];

function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function defaultCategories(): Category[] {
  return [
    ...DEFAULT_INCOME.map((name) => ({
      id: `inc-${slug(name)}`,
      type: "income" as const,
      name,
      isDefault: true,
    })),
    ...DEFAULT_EXPENSE.map((name) => ({
      id: `exp-${slug(name)}`,
      type: "expense" as const,
      name,
      isDefault: true,
    })),
  ];
}

export const DEFAULT_SETTINGS: Settings = {
  currency: "INR",
  dateFormat: "dd/MM/yyyy",
  numberLocale: "en-IN",
  weekStartsOn: 1,
  notifyBudget: true,
  notifyRecurring: true,
  notifyTasks: true,
  notifyMonthly: true,
  notifyTransactions: true,
};

export function emptyWallet(name: string): WalletData {
  return {
    version: 1,
    profile: { name, age: null, bio: "", avatar: null },
    settings: { ...DEFAULT_SETTINGS },
    transactions: [],
    categories: defaultCategories(),
    tasks: [],
    budgets: [],
    recurring: [],
    notifications: [],
  };
}

export function newId(): string {
  return crypto.randomUUID();
}

export function newTxRef(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `TXN-${out}`;
}

import type { RoutePath } from "@/router.tsx";

type Site = {
  name: string;
  tagline: string;
  nav: Array<{ label: string; to: RoutePath }>;
};

export const site: Site = {
  name: "Wallet Tracker",
  tagline:
    "Track income, expenses, budgets, and savings in one calm, beautiful financial dashboard.",
  nav: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Income", to: "/income" },
    { label: "Expenses", to: "/expenses" },
    { label: "Transactions", to: "/transactions" },
    { label: "Analytics", to: "/analytics" },
    { label: "Tasks", to: "/tasks" },
    { label: "Budgets", to: "/budgets" },
    { label: "Recurring", to: "/recurring" },
    { label: "Settings", to: "/settings" },
  ],
};

import type { LucideIcon } from "lucide-react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  BarChart3,
  CheckSquare,
  LayoutDashboard,
  PiggyBank,
  Repeat,
  Settings,
  ArrowLeftRight,
} from "lucide-react";
import type { RoutePath } from "@/router.tsx";
import { site } from "@/lib/site.ts";

const ICONS: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/income": ArrowDownCircle,
  "/expenses": ArrowUpCircle,
  "/transactions": ArrowLeftRight,
  "/analytics": BarChart3,
  "/tasks": CheckSquare,
  "/budgets": PiggyBank,
  "/recurring": Repeat,
  "/settings": Settings,
};

export type NavItem = { label: string; to: RoutePath; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = site.nav.map((n) => ({
  ...n,
  icon: ICONS[n.to] ?? LayoutDashboard,
}));

/** Shown in the mobile bottom bar; the rest live under "More". */
export const MOBILE_PRIMARY: RoutePath[] = ["/dashboard", "/transactions", "/analytics", "/budgets"];

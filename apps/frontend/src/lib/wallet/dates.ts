import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfYear,
  format,
  parseISO,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import type { DateFormat, DayString, Frequency } from "./types.ts";

export function toDay(date: Date): DayString {
  return format(date, "yyyy-MM-dd");
}

export function fromDay(day: DayString): Date {
  return parseISO(day);
}

export function todayDay(): DayString {
  return toDay(new Date());
}

export function formatDay(day: DayString, fmt: DateFormat): string {
  return format(fromDay(day), fmt);
}

/** Inclusive range of calendar days. */
export type DayRange = { from: DayString; to: DayString };

export function inRange(day: DayString, range: DayRange): boolean {
  // `YYYY-MM-DD` strings sort lexicographically in date order.
  return day >= range.from && day <= range.to;
}

export function monthRange(ref: Date): DayRange {
  return { from: toDay(startOfMonth(ref)), to: toDay(endOfMonth(ref)) };
}

export function yearRange(year: number): DayRange {
  const ref = new Date(year, 0, 1);
  return { from: toDay(startOfYear(ref)), to: toDay(endOfYear(ref)) };
}

export type PresetRange =
  | "today"
  | "last7"
  | "last30"
  | "thisMonth"
  | "prevMonth"
  | "thisYear"
  | "all"
  | "custom";

export const PRESET_LABELS: Record<PresetRange, string> = {
  today: "Today",
  last7: "Last 7 days",
  last30: "Last 30 days",
  thisMonth: "This month",
  prevMonth: "Previous month",
  thisYear: "This year",
  all: "All time",
  custom: "Custom range",
};

export function presetRange(preset: Exclude<PresetRange, "custom">, now = new Date()): DayRange {
  const today = toDay(now);
  switch (preset) {
    case "today":
      return { from: today, to: today };
    case "last7":
      return { from: toDay(subDays(now, 6)), to: today };
    case "last30":
      return { from: toDay(subDays(now, 29)), to: today };
    case "thisMonth":
      return monthRange(now);
    case "prevMonth":
      return monthRange(subMonths(now, 1));
    case "thisYear":
      return yearRange(now.getFullYear());
    case "all":
      return { from: "0000-01-01", to: "9999-12-31" };
  }
}

/** The equally long range immediately before `range`, for growth figures. */
export function previousRange(range: DayRange): DayRange {
  const from = fromDay(range.from);
  const to = fromDay(range.to);
  const days = Math.round((to.getTime() - from.getTime()) / 86_400_000) + 1;
  return { from: toDay(subDays(from, days)), to: toDay(subDays(from, 1)) };
}

export function advance(day: DayString, frequency: Frequency): DayString {
  const d = fromDay(day);
  switch (frequency) {
    case "daily":
      return toDay(addDays(d, 1));
    case "weekly":
      return toDay(addWeeks(d, 1));
    case "monthly":
      return toDay(addMonths(d, 1));
    case "yearly":
      return toDay(addYears(d, 1));
  }
}

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
};

export const DATE_FORMATS: DateFormat[] = ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd", "d MMM yyyy"];

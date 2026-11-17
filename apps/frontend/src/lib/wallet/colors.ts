export const CATEGORY_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "color-mix(in oklch, var(--chart-1) 55%, var(--foreground))",
  "color-mix(in oklch, var(--chart-2) 55%, var(--foreground))",
  "color-mix(in oklch, var(--chart-3) 50%, var(--background))",
  "color-mix(in oklch, var(--chart-4) 55%, var(--foreground))",
  "color-mix(in oklch, var(--chart-5) 50%, var(--background))",
];

export const INCOME_COLOR = "var(--chart-1)";
export const EXPENSE_COLOR = "var(--chart-2)";
export const BALANCE_COLOR = "var(--chart-3)";

export function colorAt(i: number): string {
  return CATEGORY_COLORS[i % CATEGORY_COLORS.length] ?? "var(--chart-1)";
}

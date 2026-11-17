import type { CurrencyCode, NumberLocale } from "./types.ts";

/**
 * Parses a user-typed amount ("1,234.5") into integer paise without going
 * through float multiplication. Returns null for invalid or non-positive input.
 */
export function parseAmountToMinor(input: string): number | null {
  const cleaned = input.replace(/[,\s₹$€£]/g, "");
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return null;
  const [whole, frac = ""] = cleaned.split(".");
  const minor = Number(whole) * 100 + Number(frac.padEnd(2, "0"));
  if (!Number.isSafeInteger(minor) || minor <= 0) return null;
  return minor;
}

/** Integer paise to an editable string, e.g. 123450 -> "1234.50". */
export function minorToInput(minor: number): string {
  const sign = minor < 0 ? "-" : "";
  const abs = Math.abs(minor);
  return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

/** Major units as a number, for charts only (never for stored math). */
export function minorToMajor(minor: number): number {
  return minor / 100;
}

export const CURRENCIES: Array<{ code: CurrencyCode; label: string }> = [
  { code: "INR", label: "Indian Rupee (₹)" },
  { code: "USD", label: "US Dollar ($)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "GBP", label: "British Pound (£)" },
  { code: "JPY", label: "Japanese Yen (¥)" },
  { code: "AED", label: "UAE Dirham (AED)" },
  { code: "AUD", label: "Australian Dollar (A$)" },
  { code: "CAD", label: "Canadian Dollar (C$)" },
  { code: "SGD", label: "Singapore Dollar (S$)" },
];

export type MoneyFormat = { currency: CurrencyCode; locale: NumberLocale };

export function formatMoney(
  minor: number,
  fmt: MoneyFormat,
  opts: { compact?: boolean; signed?: boolean; code?: boolean } = {},
): string {
  const formatter = new Intl.NumberFormat(fmt.locale, {
    style: "currency",
    currency: fmt.currency,
    // PDF base fonts lack symbols like ₹, so exports use the ISO code.
    currencyDisplay: opts.code ? "code" : "symbol",
    notation: opts.compact ? "compact" : "standard",
    maximumFractionDigits: opts.compact ? 1 : 2,
    minimumFractionDigits: opts.compact ? 0 : 2,
    signDisplay: opts.signed ? "exceptZero" : "auto",
  });
  return formatter.format(minor / 100);
}

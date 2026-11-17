import { describe, expect, it } from "vitest";
import { budgetUsage, dueRecurring, growth, savingsRate, totals } from "./calc.ts";
import { advance, previousRange } from "./dates.ts";
import { minorToInput, parseAmountToMinor } from "./money.ts";
import type { Budget, Category, RecurringSchedule, Transaction } from "./types.ts";

function tx(p: Partial<Transaction>): Transaction {
  return {
    id: p.id ?? Math.random().toString(),
    ref: "TXN-X",
    type: "expense",
    title: "t",
    amount: 0,
    categoryId: "food",
    date: "2026-11-10",
    paymentMethod: "cash",
    description: "",
    createdAt: "",
    updatedAt: "",
    ...p,
  };
}

describe("parseAmountToMinor", () => {
  it("parses without float error", () => {
    expect(parseAmountToMinor("0.1")).toBe(10);
    expect(parseAmountToMinor("19.99")).toBe(1999);
    expect(parseAmountToMinor("1,23,456.7")).toBe(12345670);
  });
  it("rejects invalid, zero, or 3-decimal input", () => {
    expect(parseAmountToMinor("abc")).toBeNull();
    expect(parseAmountToMinor("0")).toBeNull();
    expect(parseAmountToMinor("1.234")).toBeNull();
    expect(parseAmountToMinor("-5")).toBeNull();
  });
  it("round-trips with minorToInput", () => {
    expect(minorToInput(123405)).toBe("1234.05");
  });
});

describe("totals and rates", () => {
  const txs = [tx({ type: "income", amount: 10000 }), tx({ amount: 2500 }), tx({ amount: 500, date: "2026-10-01" })];
  it("computes balance as income minus expenses", () => {
    expect(totals(txs)).toEqual({ income: 10000, expense: 3000, net: 7000 });
  });
  it("respects inclusive ranges", () => {
    expect(totals(txs, { from: "2026-11-01", to: "2026-11-30" }).expense).toBe(2500);
  });
  it("handles zero income safely", () => {
    expect(savingsRate({ income: 0, expense: 100, net: -100 })).toBeNull();
    expect(growth(50, 0)).toBeNull();
    expect(savingsRate({ income: 10000, expense: 2000, net: 8000 })).toBe(80);
  });
});

describe("budgetUsage", () => {
  const cats: Category[] = [{ id: "food", type: "expense", name: "Food", isDefault: true }];
  const budgets: Budget[] = [{ id: "b1", categoryId: "food", limit: 500000, createdAt: "" }];
  const month = { from: "2026-11-01", to: "2026-11-30" };
  it("matches the spec example: 4000 of 5000 is 80% warning", () => {
    const [u] = budgetUsage(budgets, [tx({ amount: 400000 })], cats, month);
    expect(u?.remaining).toBe(100000);
    expect(u?.usage).toBe(80);
    expect(u?.status).toBe("warning");
  });
  it("flags exceeded and ignores other months", () => {
    const [u] = budgetUsage(budgets, [tx({ amount: 600000 }), tx({ amount: 999999, date: "2026-10-05" })], cats, month);
    expect(u?.status).toBe("exceeded");
    expect(u?.spent).toBe(600000);
  });
});

describe("dueRecurring", () => {
  const base: RecurringSchedule = {
    id: "r1",
    type: "expense",
    title: "Rent",
    amount: 100,
    categoryId: "food",
    paymentMethod: "cash",
    description: "",
    frequency: "monthly",
    startDate: "2026-09-15",
    nextDate: "2026-09-15",
    paused: false,
    createdAt: "",
  };
  it("posts every missed occurrence up to today", () => {
    const [d] = dueRecurring([base], [], "2026-11-15");
    expect(d?.dates).toEqual(["2026-09-15", "2026-10-15", "2026-11-15"]);
    expect(d?.nextDate).toBe("2026-12-15");
  });
  it("never duplicates an already-posted date", () => {
    const posted = tx({ recurringId: "r1", date: "2026-10-15" });
    const [d] = dueRecurring([base], [posted], "2026-11-15");
    expect(d?.dates).toEqual(["2026-09-15", "2026-11-15"]);
  });
  it("skips paused and future schedules", () => {
    expect(dueRecurring([{ ...base, paused: true }], [], "2026-11-15")).toEqual([]);
    expect(dueRecurring([{ ...base, nextDate: "2026-12-01" }], [], "2026-11-15")).toEqual([]);
  });
});

describe("dates", () => {
  it("advances month-end safely", () => {
    expect(advance("2026-01-31", "monthly")).toBe("2026-02-28");
  });
  it("builds an equal-length previous range", () => {
    expect(previousRange({ from: "2026-11-01", to: "2026-11-30" })).toEqual({ from: "2026-10-02", to: "2026-10-31" });
  });
});

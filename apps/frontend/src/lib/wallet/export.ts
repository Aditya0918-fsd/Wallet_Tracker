import { format } from "date-fns";
import { formatDay, type DayRange } from "./dates.ts";
import { PAYMENT_METHODS } from "./defaults.ts";
import { formatMoney, minorToInput } from "./money.ts";
import type { CategorySlice, MonthPoint, Totals } from "./calc.ts";
import type { Category, Transaction, WalletData } from "./types.ts";

function download(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value: string): string {
  // Neutralise spreadsheet formula injection and quote when needed.
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function transactionsToCsv(txs: Transaction[], categories: Category[]): string {
  const names = new Map(categories.map((c) => [c.id, c.name]));
  const header = ["Transaction ID", "Title", "Type", "Category", "Amount", "Date", "Payment Method", "Description", "Recurring"];
  const rows = txs.map((t) => [
    t.ref,
    t.title,
    t.type,
    names.get(t.categoryId) ?? "Uncategorised",
    minorToInput(t.amount),
    t.date,
    PAYMENT_METHODS[t.paymentMethod],
    t.description,
    t.recurringId ? "yes" : "no",
  ]);
  return [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export function downloadCsv(name: string, txs: Transaction[], categories: Category[]) {
  // BOM so Excel opens UTF-8 correctly.
  const blob = new Blob(["\uFEFF", transactionsToCsv(txs, categories)], { type: "text/csv;charset=utf-8" });
  download(`${name}-${format(new Date(), "yyyy-MM-dd")}.csv`, blob);
}

export function downloadJson(name: string, data: WalletData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  download(`${name}-${format(new Date(), "yyyy-MM-dd")}.json`, blob);
}

type PdfColor = [number, number, number];
const INK: PdfColor = [24, 48, 44];
const GREEN: PdfColor = [33, 117, 96];
const RED: PdfColor = [200, 72, 52];
const MUTED: PdfColor = [110, 125, 120];

async function loadPdf() {
  // Loaded on demand: jsPDF touches browser globals and is large.
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
  return { jsPDF, autoTable };
}

type PdfDoc = InstanceType<Awaited<ReturnType<typeof loadPdf>>["jsPDF"]>;

function pdfHeader(doc: PdfDoc, title: string, subtitle: string) {
  doc.setFillColor(...INK);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 70, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Wallet Tracker", 40, 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`${title}  ·  ${subtitle}`, 40, 52);
  doc.setTextColor(...INK);
}

function txRows(txs: Transaction[], data: WalletData) {
  const names = new Map(data.categories.map((c) => [c.id, c.name]));
  const money = { currency: data.settings.currency, locale: data.settings.numberLocale };
  return txs.map((t) => [
    t.ref,
    formatDay(t.date, data.settings.dateFormat),
    t.title,
    t.type === "income" ? "Income" : "Expense",
    names.get(t.categoryId) ?? "Uncategorised",
    PAYMENT_METHODS[t.paymentMethod],
    `${t.type === "income" ? "+" : "-"}${formatMoney(t.amount, money, { code: true })}`,
  ]);
}

const TX_HEAD = [["ID", "Date", "Title", "Type", "Category", "Method", "Amount"]];

export async function downloadTransactionsPdf(title: string, rangeLabel: string, txs: Transaction[], data: WalletData) {
  const { jsPDF, autoTable } = await loadPdf();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  pdfHeader(doc, title, rangeLabel);
  const money = { currency: data.settings.currency, locale: data.settings.numberLocale };
  let income = 0;
  let expense = 0;
  for (const t of txs) {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  }
  doc.setFontSize(10);
  doc.text(
    `Records: ${txs.length}    Income: ${formatMoney(income, money, { code: true })}    Expenses: ${formatMoney(expense, money, { code: true })}    Net: ${formatMoney(income - expense, money, { code: true })}`,
    40,
    92,
  );
  autoTable(doc, {
    startY: 106,
    head: TX_HEAD,
    body: txRows(txs, data),
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: GREEN },
    columnStyles: { 6: { halign: "right" } },
  });
  doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}.pdf`);
}

function drawBars(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  h: number,
  series: Array<{ label: string; values: Array<{ v: number; color: PdfColor }> }>,
) {
  const max = Math.max(1, ...series.flatMap((s) => s.values.map((v) => v.v)));
  const groupW = w / Math.max(1, series.length);
  doc.setDrawColor(...MUTED);
  doc.line(x, y + h, x + w, y + h);
  series.forEach((s, i) => {
    const barW = Math.min(18, (groupW - 8) / s.values.length);
    s.values.forEach((val, j) => {
      const bh = (val.v / max) * h;
      doc.setFillColor(...val.color);
      doc.rect(x + i * groupW + 4 + j * barW, y + h - bh, barW - 2, bh, "F");
    });
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(s.label, x + i * groupW + groupW / 2, y + h + 10, { align: "center" });
  });
  doc.setTextColor(...INK);
}

export type AnalyticsReport = {
  range: DayRange;
  rangeLabel: string;
  totals: Totals;
  expenseByCategory: CategorySlice[];
  incomeByCategory: CategorySlice[];
  monthly: MonthPoint[];
  transactions: Transaction[];
};

export async function downloadAnalyticsPdf(report: AnalyticsReport, data: WalletData) {
  const { jsPDF, autoTable } = await loadPdf();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const money = { currency: data.settings.currency, locale: data.settings.numberLocale };
  const m = (v: number) => formatMoney(v, money, { code: true });
  pdfHeader(doc, "Financial report", report.rangeLabel);

  const pageW = doc.internal.pageSize.getWidth();
  const cards: Array<[string, string, PdfColor]> = [
    ["Income", m(report.totals.income), GREEN],
    ["Expenses", m(report.totals.expense), RED],
    ["Balance", m(report.totals.net), report.totals.net >= 0 ? GREEN : RED],
  ];
  const cw = (pageW - 80 - 20) / 3;
  cards.forEach(([label, value, color], i) => {
    const cx = 40 + i * (cw + 10);
    doc.setDrawColor(220, 226, 222);
    doc.roundedRect(cx, 90, cw, 54, 6, 6, "S");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(label, cx + 12, 108);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...color);
    doc.text(value, cx + 12, 130);
    doc.setFont("helvetica", "normal");
  });
  doc.setTextColor(...INK);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Monthly income vs expenses", 40, 172);
  doc.setFont("helvetica", "normal");
  drawBars(
    doc,
    40,
    182,
    pageW - 80,
    120,
    report.monthly.map((p) => ({
      label: p.label,
      values: [
        { v: p.income, color: GREEN },
        { v: p.expense, color: RED },
      ],
    })),
  );

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Expenses by category", 40, 336);
  doc.setFont("helvetica", "normal");
  const topExp = report.expenseByCategory.slice(0, 8);
  drawBars(
    doc,
    40,
    346,
    pageW - 80,
    100,
    topExp.map((c) => ({ label: c.name.slice(0, 12), values: [{ v: c.amount, color: RED }] })),
  );

  const pct = (v: number, total: number) => (total > 0 ? `${((v / total) * 100).toFixed(1)}%` : "-");
  autoTable(doc, {
    startY: 474,
    head: [["Expense category", "Amount", "Share"]],
    body: report.expenseByCategory.map((c) => [c.name, m(c.amount), pct(c.amount, report.totals.expense)]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: RED },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
  });
  autoTable(doc, {
    head: [["Income category", "Amount", "Share"]],
    body: report.incomeByCategory.map((c) => [c.name, m(c.amount), pct(c.amount, report.totals.income)]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: GREEN },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "right" } },
  });
  autoTable(doc, {
    head: TX_HEAD,
    body: txRows(report.transactions, data),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: INK },
    columnStyles: { 6: { halign: "right" } },
  });
  doc.save(`wallet-report-${report.range.from}-to-${report.range.to}.pdf`);
}

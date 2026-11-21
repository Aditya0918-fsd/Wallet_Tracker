import { __toESM } from "../_runtime.mjs";
import { PAYMENT_METHODS, formatDay } from "./card-CHTOrAKP.mjs";
import { formatMoney, minorToInput } from "./router-BGnyA3VS.mjs";
import { format } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/export-foZGWWqf.js
function download(filename, blob) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function csvCell(value) {
	const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
	return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, "\"\"")}"` : safe;
}
function transactionsToCsv(txs, categories) {
	const names = new Map(categories.map((c) => [c.id, c.name]));
	return [[
		"Transaction ID",
		"Title",
		"Type",
		"Category",
		"Amount",
		"Date",
		"Payment Method",
		"Description",
		"Recurring"
	], ...txs.map((t) => [
		t.ref,
		t.title,
		t.type,
		names.get(t.categoryId) ?? "Uncategorised",
		minorToInput(t.amount),
		t.date,
		PAYMENT_METHODS[t.paymentMethod],
		t.description,
		t.recurringId ? "yes" : "no"
	])].map((r) => r.map(csvCell).join(",")).join("\r\n");
}
function downloadCsv(name, txs, categories) {
	const blob = new Blob(["﻿", transactionsToCsv(txs, categories)], { type: "text/csv;charset=utf-8" });
	download(`${name}-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")}.csv`, blob);
}
function downloadJson(name, data) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
	download(`${name}-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")}.json`, blob);
}
var INK = [
	24,
	48,
	44
];
var GREEN = [
	33,
	117,
	96
];
var RED = [
	200,
	72,
	52
];
var MUTED = [
	110,
	125,
	120
];
async function loadPdf() {
	const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.require_jspdf_node_min())), import("../_libs/jspdf-autotable.mjs").then((n) => n.jspdf_plugin_autotable_exports)]);
	return {
		jsPDF,
		autoTable
	};
}
function pdfHeader(doc, title, subtitle) {
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
function txRows(txs, data) {
	const names = new Map(data.categories.map((c) => [c.id, c.name]));
	const money = {
		currency: data.settings.currency,
		locale: data.settings.numberLocale
	};
	return txs.map((t) => [
		t.ref,
		formatDay(t.date, data.settings.dateFormat),
		t.title,
		t.type === "income" ? "Income" : "Expense",
		names.get(t.categoryId) ?? "Uncategorised",
		PAYMENT_METHODS[t.paymentMethod],
		`${t.type === "income" ? "+" : "-"}${formatMoney(t.amount, money, { code: true })}`
	]);
}
var TX_HEAD = [[
	"ID",
	"Date",
	"Title",
	"Type",
	"Category",
	"Method",
	"Amount"
]];
async function downloadTransactionsPdf(title, rangeLabel, txs, data) {
	const { jsPDF, autoTable } = await loadPdf();
	const doc = new jsPDF({
		unit: "pt",
		format: "a4"
	});
	pdfHeader(doc, title, rangeLabel);
	const money = {
		currency: data.settings.currency,
		locale: data.settings.numberLocale
	};
	let income = 0;
	let expense = 0;
	for (const t of txs) if (t.type === "income") income += t.amount;
	else expense += t.amount;
	doc.setFontSize(10);
	doc.text(`Records: ${txs.length}    Income: ${formatMoney(income, money, { code: true })}    Expenses: ${formatMoney(expense, money, { code: true })}    Net: ${formatMoney(income - expense, money, { code: true })}`, 40, 92);
	autoTable(doc, {
		startY: 106,
		head: TX_HEAD,
		body: txRows(txs, data),
		styles: {
			fontSize: 8,
			cellPadding: 4
		},
		headStyles: { fillColor: GREEN },
		columnStyles: { 6: { halign: "right" } }
	});
	doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}-${format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")}.pdf`);
}
function drawBars(doc, x, y, w, h, series) {
	const max = Math.max(1, ...series.flatMap((s) => s.values.map((v) => v.v)));
	const groupW = w / Math.max(1, series.length);
	doc.setDrawColor(...MUTED);
	doc.line(x, y + h, x + w, y + h);
	series.forEach((s, i) => {
		const barW = Math.min(18, (groupW - 8) / s.values.length);
		s.values.forEach((val, j) => {
			const bh = val.v / max * h;
			doc.setFillColor(...val.color);
			doc.rect(x + i * groupW + 4 + j * barW, y + h - bh, barW - 2, bh, "F");
		});
		doc.setFontSize(7);
		doc.setTextColor(...MUTED);
		doc.text(s.label, x + i * groupW + groupW / 2, y + h + 10, { align: "center" });
	});
	doc.setTextColor(...INK);
}
async function downloadAnalyticsPdf(report, data) {
	const { jsPDF, autoTable } = await loadPdf();
	const doc = new jsPDF({
		unit: "pt",
		format: "a4"
	});
	const money = {
		currency: data.settings.currency,
		locale: data.settings.numberLocale
	};
	const m = (v) => formatMoney(v, money, { code: true });
	pdfHeader(doc, "Financial report", report.rangeLabel);
	const pageW = doc.internal.pageSize.getWidth();
	const cards = [
		[
			"Income",
			m(report.totals.income),
			GREEN
		],
		[
			"Expenses",
			m(report.totals.expense),
			RED
		],
		[
			"Balance",
			m(report.totals.net),
			report.totals.net >= 0 ? GREEN : RED
		]
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
	drawBars(doc, 40, 182, pageW - 80, 120, report.monthly.map((p) => ({
		label: p.label,
		values: [{
			v: p.income,
			color: GREEN
		}, {
			v: p.expense,
			color: RED
		}]
	})));
	doc.setFontSize(12);
	doc.setFont("helvetica", "bold");
	doc.text("Expenses by category", 40, 336);
	doc.setFont("helvetica", "normal");
	const topExp = report.expenseByCategory.slice(0, 8);
	drawBars(doc, 40, 346, pageW - 80, 100, topExp.map((c) => ({
		label: c.name.slice(0, 12),
		values: [{
			v: c.amount,
			color: RED
		}]
	})));
	const pct = (v, total) => total > 0 ? `${(v / total * 100).toFixed(1)}%` : "-";
	autoTable(doc, {
		startY: 474,
		head: [[
			"Expense category",
			"Amount",
			"Share"
		]],
		body: report.expenseByCategory.map((c) => [
			c.name,
			m(c.amount),
			pct(c.amount, report.totals.expense)
		]),
		styles: { fontSize: 9 },
		headStyles: { fillColor: RED },
		columnStyles: {
			1: { halign: "right" },
			2: { halign: "right" }
		}
	});
	autoTable(doc, {
		head: [[
			"Income category",
			"Amount",
			"Share"
		]],
		body: report.incomeByCategory.map((c) => [
			c.name,
			m(c.amount),
			pct(c.amount, report.totals.income)
		]),
		styles: { fontSize: 9 },
		headStyles: { fillColor: GREEN },
		columnStyles: {
			1: { halign: "right" },
			2: { halign: "right" }
		}
	});
	autoTable(doc, {
		head: TX_HEAD,
		body: txRows(report.transactions, data),
		styles: {
			fontSize: 8,
			cellPadding: 3
		},
		headStyles: { fillColor: INK },
		columnStyles: { 6: { halign: "right" } }
	});
	doc.save(`wallet-report-${report.range.from}-to-${report.range.to}.pdf`);
}
export { downloadAnalyticsPdf, downloadCsv, downloadJson, downloadTransactionsPdf };

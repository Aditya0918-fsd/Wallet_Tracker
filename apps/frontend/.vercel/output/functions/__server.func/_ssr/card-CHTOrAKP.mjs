import { __toESM } from "../_runtime.mjs";
import { cn } from "./router-BGnyA3VS.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { addDays, addMonths, addWeeks, addYears, endOfMonth, endOfYear, format, parseISO, startOfMonth, startOfYear, subDays, subMonths } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/card-CHTOrAKP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WalletContext = (0, import_react.createContext)(null);
function useWallet() {
	const ctx = (0, import_react.useContext)(WalletContext);
	if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
	return ctx;
}
var PAYMENT_METHODS = {
	cash: "Cash",
	upi: "UPI",
	debit_card: "Debit card",
	credit_card: "Credit card",
	bank_transfer: "Bank transfer",
	wallet: "Digital wallet",
	cheque: "Cheque",
	other: "Other"
};
var PRIORITY_LABELS = {
	low: "Low",
	medium: "Medium",
	high: "High"
};
var DEFAULT_INCOME = [
	"Salary",
	"Business Income",
	"Freelancing",
	"Investments",
	"Interest",
	"Gifts",
	"Other Income"
];
var DEFAULT_EXPENSE = [
	"Food",
	"Shopping",
	"Transportation",
	"Education",
	"Healthcare",
	"Entertainment",
	"Bills",
	"Rent",
	"Travel",
	"Other Expenses"
];
function slug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
function defaultCategories() {
	return [...DEFAULT_INCOME.map((name) => ({
		id: `inc-${slug(name)}`,
		type: "income",
		name,
		isDefault: true
	})), ...DEFAULT_EXPENSE.map((name) => ({
		id: `exp-${slug(name)}`,
		type: "expense",
		name,
		isDefault: true
	}))];
}
var DEFAULT_SETTINGS = {
	currency: "INR",
	dateFormat: "dd/MM/yyyy",
	numberLocale: "en-IN",
	weekStartsOn: 1,
	notifyBudget: true,
	notifyRecurring: true,
	notifyTasks: true,
	notifyMonthly: true,
	notifyTransactions: true
};
function emptyWallet(name) {
	return {
		version: 1,
		profile: {
			name,
			age: null,
			bio: "",
			avatar: null
		},
		settings: { ...DEFAULT_SETTINGS },
		transactions: [],
		categories: defaultCategories(),
		tasks: [],
		budgets: [],
		recurring: [],
		notifications: []
	};
}
function newId() {
	return crypto.randomUUID();
}
function newTxRef() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "";
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(6));
	for (const b of bytes) out += alphabet[b % 32];
	return `TXN-${out}`;
}
function toDay(date) {
	return format(date, "yyyy-MM-dd");
}
function fromDay(day) {
	return parseISO(day);
}
function todayDay() {
	return toDay(/* @__PURE__ */ new Date());
}
function formatDay(day, fmt) {
	return format(fromDay(day), fmt);
}
function inRange(day, range) {
	return day >= range.from && day <= range.to;
}
function monthRange(ref) {
	return {
		from: toDay(startOfMonth(ref)),
		to: toDay(endOfMonth(ref))
	};
}
function yearRange(year) {
	const ref = new Date(year, 0, 1);
	return {
		from: toDay(startOfYear(ref)),
		to: toDay(endOfYear(ref))
	};
}
var PRESET_LABELS = {
	today: "Today",
	last7: "Last 7 days",
	last30: "Last 30 days",
	thisMonth: "This month",
	prevMonth: "Previous month",
	thisYear: "This year",
	all: "All time",
	custom: "Custom range"
};
function presetRange(preset, now = /* @__PURE__ */ new Date()) {
	const today = toDay(now);
	switch (preset) {
		case "today": return {
			from: today,
			to: today
		};
		case "last7": return {
			from: toDay(subDays(now, 6)),
			to: today
		};
		case "last30": return {
			from: toDay(subDays(now, 29)),
			to: today
		};
		case "thisMonth": return monthRange(now);
		case "prevMonth": return monthRange(subMonths(now, 1));
		case "thisYear": return yearRange(now.getFullYear());
		case "all": return {
			from: "0000-01-01",
			to: "9999-12-31"
		};
	}
}
/** The equally long range immediately before `range`, for growth figures. */
function previousRange(range) {
	const from = fromDay(range.from);
	const to = fromDay(range.to);
	const days = Math.round((to.getTime() - from.getTime()) / 864e5) + 1;
	return {
		from: toDay(subDays(from, days)),
		to: toDay(subDays(from, 1))
	};
}
function advance(day, frequency) {
	const d = fromDay(day);
	switch (frequency) {
		case "daily": return toDay(addDays(d, 1));
		case "weekly": return toDay(addWeeks(d, 1));
		case "monthly": return toDay(addMonths(d, 1));
		case "yearly": return toDay(addYears(d, 1));
	}
}
var FREQUENCY_LABELS = {
	daily: "Daily",
	weekly: "Weekly",
	monthly: "Monthly",
	yearly: "Yearly"
};
var DATE_FORMATS = [
	"dd/MM/yyyy",
	"MM/dd/yyyy",
	"yyyy-MM-dd",
	"d MMM yyyy"
];
function totals(txs, range) {
	let income = 0;
	let expense = 0;
	for (const t of txs) {
		if (range && !inRange(t.date, range)) continue;
		if (t.type === "income") income += t.amount;
		else expense += t.amount;
	}
	return {
		income,
		expense,
		net: income - expense
	};
}
/** Savings rate in percent; null when there is no income (avoids divide by zero). */
function savingsRate(t) {
	if (t.income <= 0) return null;
	return t.net / t.income * 100;
}
/** Percent change from `prev` to `curr`; null when prev is zero. */
function growth(curr, prev) {
	if (prev === 0) return null;
	return (curr - prev) / prev * 100;
}
function byCategory(txs, categories, type, range) {
	const sums = /* @__PURE__ */ new Map();
	for (const t of txs) {
		if (t.type !== type) continue;
		if (range && !inRange(t.date, range)) continue;
		sums.set(t.categoryId, (sums.get(t.categoryId) ?? 0) + t.amount);
	}
	const names = new Map(categories.map((c) => [c.id, c.name]));
	return [...sums.entries()].map(([categoryId, amount]) => ({
		categoryId,
		name: names.get(categoryId) ?? "Uncategorised",
		amount
	})).sort((a, b) => b.amount - a.amount);
}
function monthlySeries(txs, months, now = /* @__PURE__ */ new Date()) {
	const points = [];
	let balance = totals(txs, {
		from: "0000-01-01",
		to: dayBefore(monthRange(subMonths(now, months - 1)).from)
	}).net;
	for (let i = months - 1; i >= 0; i--) {
		const ref = subMonths(now, i);
		const t = totals(txs, monthRange(ref));
		balance += t.net;
		points.push({
			key: format(ref, "yyyy-MM"),
			label: format(ref, "MMM yy"),
			income: t.income,
			expense: t.expense,
			net: t.net,
			balance
		});
	}
	return points;
}
function dayBefore(day) {
	const d = fromDay(day);
	d.setDate(d.getDate() - 1);
	return format(d, "yyyy-MM-dd");
}
function budgetUsage(budgets, txs, categories, month) {
	const names = new Map(categories.map((c) => [c.id, c.name]));
	return budgets.map((budget) => {
		let spent = 0;
		for (const t of txs) if (t.type === "expense" && t.categoryId === budget.categoryId && inRange(t.date, month)) spent += t.amount;
		const usage = budget.limit > 0 ? spent / budget.limit * 100 : 0;
		const status = usage > 100 ? "exceeded" : usage >= 80 ? "warning" : "ok";
		return {
			budget,
			categoryName: names.get(budget.categoryId) ?? "Uncategorised",
			spent,
			remaining: budget.limit - spent,
			usage,
			status
		};
	});
}
/**
* Returns the occurrences each active schedule owes up to `today`, and the
* schedule's next date afterwards. Existing transactions with the same
* (recurringId, date) are skipped so a schedule never posts twice.
*/
function dueRecurring(schedules, txs, today, maxPerSchedule = 400) {
	const posted = new Set(txs.filter((t) => t.recurringId).map((t) => `${t.recurringId}|${t.date}`));
	const out = [];
	for (const s of schedules) {
		if (s.paused || s.nextDate > today) continue;
		const dates = [];
		let next = s.nextDate;
		let guard = 0;
		while (next <= today && guard < maxPerSchedule) {
			if (!posted.has(`${s.id}|${next}`)) dates.push(next);
			next = advance(next, s.frequency);
			guard++;
		}
		out.push({
			schedule: s,
			dates,
			nextDate: next
		});
	}
	return out;
}
function isOverdue(task, today) {
	return !task.completed && task.dueDate !== null && task.dueDate < today;
}
/** Average daily expense over the range, capped at today for open-ended ranges. */
function averageDaily(expense, range, today) {
	const end = range.to > today ? today : range.to;
	const start = fromDay(range.from);
	const days = Math.round((fromDay(end).getTime() - start.getTime()) / 864e5) + 1;
	if (days <= 0) return 0;
	return Math.round(expense / days);
}
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground shadow-xs ring-1 ring-foreground/10 [--card-spacing:--spacing(6)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("text-base leading-normal font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-action",
		className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("flex flex-col gap-3 px-(--card-spacing)", className),
		...props
	});
}
export { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle, DATE_FORMATS, FREQUENCY_LABELS, PAYMENT_METHODS, PRESET_LABELS, PRIORITY_LABELS, WalletContext, averageDaily, budgetUsage, byCategory, dueRecurring, emptyWallet, formatDay, fromDay, growth, inRange, isOverdue, monthRange, monthlySeries, newId, newTxRef, presetRange, previousRange, savingsRate, toDay, todayDay, totals, useWallet, yearRange };

import { __toESM } from "../_runtime.mjs";
import { cn, formatMoney } from "./router-CV1frvwC.mjs";
import { budgetUsage, dueRecurring, fromDay, isOverdue, monthRange, newId, newTxRef, toDay, totals } from "./card-DMJBVK8X.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { addDays, format, subMonths } from "../_libs/date-fns.mjs";
import { MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRoot, MenuTrigger, Separator, useRender } from "../_libs/@base-ui/react+[3...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/dropdown-menu-2jleO2R6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_NOTIFICATIONS = 150;
function pushNotification(data, n) {
	if (data.notifications.some((x) => x.key === n.key)) return data;
	const item = {
		...n,
		id: newId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	};
	return {
		...data,
		notifications: [item, ...data.notifications].slice(0, MAX_NOTIFICATIONS)
	};
}
/**
* Brings derived state up to date: posts due recurring transactions and
* raises budget, task, recurring, and monthly-summary alerts. Pure and
* idempotent: running it twice yields no duplicates.
*/
function reconcile(input, now = /* @__PURE__ */ new Date()) {
	let data = input;
	const today = toDay(now);
	const fmt = {
		currency: data.settings.currency,
		locale: data.settings.numberLocale
	};
	const s = data.settings;
	const due = dueRecurring(data.recurring, data.transactions, today);
	if (due.length > 0) {
		const stamp = now.toISOString();
		const posted = [];
		const nextById = /* @__PURE__ */ new Map();
		for (const { schedule, dates, nextDate } of due) {
			nextById.set(schedule.id, nextDate);
			for (const date of dates) posted.push({
				id: newId(),
				ref: newTxRef(),
				type: schedule.type,
				title: schedule.title,
				amount: schedule.amount,
				categoryId: schedule.categoryId,
				date,
				paymentMethod: schedule.paymentMethod,
				description: schedule.description,
				createdAt: stamp,
				updatedAt: stamp,
				recurringId: schedule.id
			});
		}
		data = {
			...data,
			transactions: [...posted, ...data.transactions],
			recurring: data.recurring.map((r) => nextById.has(r.id) ? {
				...r,
				nextDate: nextById.get(r.id) ?? r.nextDate
			} : r)
		};
		if (s.notifyRecurring) for (const tx of posted) data = pushNotification(data, {
			key: `rec-posted:${tx.recurringId}:${tx.date}`,
			kind: "recurring",
			title: `Recurring ${tx.type} recorded`,
			message: `${tx.title} · ${formatMoney(tx.amount, fmt)} on ${tx.date}`
		});
	}
	if (s.notifyRecurring) {
		const soon = toDay(addDays(now, 3));
		for (const r of data.recurring) {
			if (r.paused || r.nextDate <= today || r.nextDate > soon) continue;
			data = pushNotification(data, {
				key: `rec-upcoming:${r.id}:${r.nextDate}`,
				kind: "recurring",
				title: "Upcoming recurring transaction",
				message: `${r.title} (${formatMoney(r.amount, fmt)}) is scheduled for ${format(fromDay(r.nextDate), "d MMM")}`
			});
		}
	}
	if (s.notifyBudget) {
		const month = monthRange(now);
		const monthKey = format(now, "yyyy-MM");
		for (const u of budgetUsage(data.budgets, data.transactions, data.categories, month)) if (u.status === "exceeded") data = pushNotification(data, {
			key: `budget-exceeded:${u.budget.id}:${monthKey}`,
			kind: "budget_exceeded",
			title: `${u.categoryName} budget exceeded`,
			message: `You've spent ${formatMoney(u.spent, fmt)} of ${formatMoney(u.budget.limit, fmt)} this month.`
		});
		else if (u.status === "warning") data = pushNotification(data, {
			key: `budget-warning:${u.budget.id}:${monthKey}`,
			kind: "budget_warning",
			title: `${u.categoryName} budget almost used`,
			message: `${Math.round(u.usage)}% used. ${formatMoney(u.remaining, fmt)} left this month.`
		});
	}
	if (s.notifyTasks) for (const t of data.tasks) {
		if (!isOverdue(t, today) || t.dueDate === null) continue;
		data = pushNotification(data, {
			key: `task-overdue:${t.id}:${t.dueDate}`,
			kind: "task_overdue",
			title: "Task overdue",
			message: `"${t.title}" was due on ${format(fromDay(t.dueDate), "d MMM yyyy")}.`
		});
	}
	if (s.notifyMonthly) {
		const prev = subMonths(now, 1);
		const t = totals(data.transactions, monthRange(prev));
		if (t.income > 0 || t.expense > 0) data = pushNotification(data, {
			key: `monthly:${format(prev, "yyyy-MM")}`,
			kind: "monthly_summary",
			title: `${format(prev, "MMMM")} summary`,
			message: `Income ${formatMoney(t.income, fmt)} · Expenses ${formatMoney(t.expense, fmt)} · Net ${formatMoney(t.net, fmt, { signed: true })}`
		});
	}
	return data;
}
function addTransaction(data, input) {
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const tx = {
		...input,
		id: newId(),
		ref: newTxRef(),
		createdAt: now,
		updatedAt: now
	};
	let next = {
		...data,
		transactions: [tx, ...data.transactions]
	};
	if (data.settings.notifyTransactions) next = pushNotification(next, {
		key: `tx-created:${tx.id}`,
		kind: "transaction",
		title: tx.type === "income" ? "Income added" : "Expense added",
		message: `${tx.title} · ${formatMoney(tx.amount, {
			currency: data.settings.currency,
			locale: data.settings.numberLocale
		})}`
	});
	return next;
}
function updateTransaction(data, id, input) {
	return {
		...data,
		transactions: data.transactions.map((t) => t.id === id ? {
			...t,
			...input,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : t)
	};
}
function deleteTransaction(data, id) {
	return {
		...data,
		transactions: data.transactions.filter((t) => t.id !== id)
	};
}
function addCategory(data, type, name) {
	const trimmed = name.trim();
	const existing = data.categories.find((c) => c.type === type && c.name.toLowerCase() === trimmed.toLowerCase());
	if (existing) return {
		data,
		category: existing
	};
	const category = {
		id: newId(),
		type,
		name: trimmed,
		isDefault: false
	};
	return {
		data: {
			...data,
			categories: [...data.categories, category]
		},
		category
	};
}
/** Custom categories can be removed only when nothing references them. */
function categoryInUse(data, id) {
	return data.transactions.some((t) => t.categoryId === id) || data.budgets.some((b) => b.categoryId === id) || data.recurring.some((r) => r.categoryId === id);
}
function deleteCategory(data, id) {
	if (categoryInUse(data, id)) return data;
	return {
		...data,
		categories: data.categories.filter((c) => c.id !== id || c.isDefault)
	};
}
function addTask(data, input) {
	const task = {
		...input,
		id: newId(),
		completed: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		completedAt: null
	};
	return {
		...data,
		tasks: [task, ...data.tasks]
	};
}
function updateTask(data, id, input) {
	return {
		...data,
		tasks: data.tasks.map((t) => t.id === id ? {
			...t,
			...input
		} : t)
	};
}
function setTaskCompleted(data, id, completed) {
	return {
		...data,
		tasks: data.tasks.map((t) => t.id === id ? {
			...t,
			completed,
			completedAt: completed ? (/* @__PURE__ */ new Date()).toISOString() : null
		} : t)
	};
}
function deleteTask(data, id) {
	return {
		...data,
		tasks: data.tasks.filter((t) => t.id !== id)
	};
}
function upsertBudget(data, input) {
	if (data.budgets.find((b) => b.categoryId === input.categoryId && b.id !== input.id)) throw new Error("A budget for this category already exists.");
	if (input.id) return {
		...data,
		budgets: data.budgets.map((b) => b.id === input.id ? {
			...b,
			categoryId: input.categoryId,
			limit: input.limit
		} : b)
	};
	const budget = {
		id: newId(),
		categoryId: input.categoryId,
		limit: input.limit,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return {
		...data,
		budgets: [...data.budgets, budget]
	};
}
function deleteBudget(data, id) {
	return {
		...data,
		budgets: data.budgets.filter((b) => b.id !== id)
	};
}
function addRecurring(data, input) {
	const r = {
		...input,
		id: newId(),
		nextDate: input.startDate,
		paused: false,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return {
		...data,
		recurring: [...data.recurring, r]
	};
}
function updateRecurring(data, id, input) {
	return {
		...data,
		recurring: data.recurring.map((r) => {
			if (r.id !== id) return r;
			const reanchor = r.startDate !== input.startDate || r.frequency !== input.frequency;
			return {
				...r,
				...input,
				nextDate: reanchor ? input.startDate : r.nextDate
			};
		})
	};
}
function setRecurringPaused(data, id, paused) {
	return {
		...data,
		recurring: data.recurring.map((r) => r.id === id ? {
			...r,
			paused
		} : r)
	};
}
function deleteRecurring(data, id) {
	return {
		...data,
		recurring: data.recurring.filter((r) => r.id !== id)
	};
}
function markNotificationRead(data, id) {
	return {
		...data,
		notifications: data.notifications.map((n) => n.id === id ? {
			...n,
			read: true
		} : n)
	};
}
function markAllRead(data) {
	return {
		...data,
		notifications: data.notifications.map((n) => ({
			...n,
			read: true
		}))
	};
}
function clearNotifications(data) {
	return {
		...data,
		notifications: data.notifications.map((n) => ({
			...n,
			read: true,
			message: "",
			title: ""
		}))
	};
}
function updateProfile(data, profile) {
	return {
		...data,
		profile: {
			...data.profile,
			...profile
		}
	};
}
function updateSettings(data, settings) {
	return {
		...data,
		settings: {
			...data.settings,
			...settings
		}
	};
}
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuTrigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
			"data-slot": "dropdown-menu-content",
			className: cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
var DropdownMenuGroupContext = import_react.createContext(false);
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroupContext.Provider, {
		value: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
			"data-slot": "dropdown-menu-group",
			...props
		})
	});
}
function DropdownMenuLabel({ className, inset, render, ...props }) {
	const inGroup = import_react.useContext(DropdownMenuGroupContext);
	const labelProps = {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("px-2 py-1.5 text-xs font-medium text-muted-foreground data-inset:pl-8", className),
		...props
	};
	return useRender({
		render,
		props: labelProps,
		enabled: !inGroup
	}) ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroupLabel, {
		render,
		...labelProps
	});
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
export { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, addCategory, addRecurring, addTask, addTransaction, categoryInUse, clearNotifications, deleteBudget, deleteCategory, deleteRecurring, deleteTask, deleteTransaction, markAllRead, markNotificationRead, reconcile, setRecurringPaused, setTaskCompleted, updateProfile, updateRecurring, updateSettings, updateTask, updateTransaction, upsertBudget };

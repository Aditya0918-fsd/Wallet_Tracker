import { __toESM } from "../_runtime.mjs";
import { PageHeader } from "./page-header-Le1DCGmA.mjs";
import { Badge } from "./badge-BSVLYYzJ.mjs";
import { Button$1, cn } from "./router-BGnyA3VS.mjs";
import { Card, PRIORITY_LABELS, formatDay, isOverdue, todayDay, useWallet } from "./card-CHTOrAKP.mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, deleteTask, setTaskCompleted } from "./dropdown-menu-DJhjwrac.mjs";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty-Ct7DPFVD.mjs";
import { Input$1 } from "./input-Ce8VWSEq.mjs";
import { Tabs$1, TabsList, TabsTrigger } from "./tabs-HWewyqH2.mjs";
import { CheckboxIndicator, CheckboxRoot } from "../_libs/base-ui__react+base-ui__utils4.mjs";
import { ConfirmDialog } from "./confirm-dialog-D8LQ_B_g.mjs";
import { TaskFormDialog } from "./task-form-dialog-Cy28-C7p.mjs";
import { l } from "../_libs/use-debounce.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { format, parseISO } from "../_libs/date-fns.mjs";
// node_modules/.nitro/vite/services/ssr/assets/tasks-DIB-da1W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function Checkbox$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxRoot, {
		"data-slot": "checkbox",
		className: cn("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input shadow-xs transition-shadow outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CheckIcon, {})
		})
	});
}
var PRIORITY_RANK = {
	high: 0,
	medium: 1,
	low: 2
};
var PRIORITY_TONE = {
	high: "bg-destructive/10 text-destructive",
	medium: "bg-chart-4/20 text-foreground",
	low: "bg-muted text-muted-foreground"
};
function TasksPage() {
	const { data, update } = useWallet();
	const [status, setStatus] = (0, import_react.useState)("pending");
	const [search, setSearch] = (0, import_react.useState)("");
	const [q] = l(search, 200);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const today = todayDay();
	const { overdue, list, counts } = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const matches = (t) => !query || `${t.title} ${t.description}`.toLowerCase().includes(query);
		const sorted = [...data.tasks].sort((a, b) => {
			if (a.completed !== b.completed) return a.completed ? 1 : -1;
			const ad = a.dueDate ?? "9999";
			const bd = b.dueDate ?? "9999";
			if (ad !== bd) return ad.localeCompare(bd);
			return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
		});
		const over = sorted.filter((t) => isOverdue(t, today) && matches(t));
		const rest = sorted.filter((t) => {
			if (isOverdue(t, today)) return false;
			if (status === "pending" && t.completed) return false;
			if (status === "completed" && !t.completed) return false;
			return matches(t);
		});
		return {
			overdue: status === "completed" ? [] : over,
			list: rest,
			counts: {
				all: data.tasks.length,
				pending: data.tasks.filter((t) => !t.completed).length,
				completed: data.tasks.filter((t) => t.completed).length
			}
		};
	}, [
		data.tasks,
		q,
		status,
		today
	]);
	const toggle = (t) => {
		update((d) => setTaskCompleted(d, t.id, !t.completed));
		toast.success(t.completed ? "Marked as pending" : "Task completed");
	};
	const openNew = () => {
		setEditing(null);
		setFormOpen(true);
	};
	const row = (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3 px-4 py-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
				checked: t.completed,
				onCheckedChange: () => toggle(t),
				className: "mt-0.5 cursor-pointer",
				"aria-label": `Mark ${t.title} ${t.completed ? "pending" : "complete"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-medium break-words", t.completed && "text-muted-foreground line-through"),
							children: t.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("rounded-full px-2 py-0.5 text-[11px] font-medium", PRIORITY_TONE[t.priority]),
							children: PRIORITY_LABELS[t.priority]
						})]
					}),
					t.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm break-words text-muted-foreground",
						children: t.description
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
						children: [t.dueDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("flex items-center gap-1", isOverdue(t, today) && "font-medium text-destructive"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CalendarDays, { className: "size-3.5" }),
								" Due ",
								formatDay(t.dueDate, data.settings.dateFormat)
							]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Created ", format(parseISO(t.createdAt), "d MMM yyyy")] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Task actions"
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreVertical, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				className: "w-44",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => toggle(t),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CheckCircle2, {}),
							" ",
							t.completed ? "Mark pending" : "Mark complete"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						onClick: () => {
							setEditing(t);
							setFormOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pencil, {}), " Edit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
						variant: "destructive",
						onClick: () => setToDelete(t),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete"]
					})
				]
			})] })
		]
	}, t.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Tasks"
				}),
				description: "Bills to pay, documents to file, money to-dos.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " Add task"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
					value: status,
					onValueChange: (v) => setStatus(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "pending",
							children: [
								"Pending (",
								counts.pending,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "completed",
							children: [
								"Completed (",
								counts.completed,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "all",
							children: [
								"All (",
								counts.all,
								")"
							]
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: "Search tasks",
						className: "pl-9",
						"aria-label": "Search tasks"
					})]
				})]
			}),
			overdue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "gap-0 border-destructive/30 py-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-destructive/20 bg-destructive/5 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.AlertCircle, { className: "size-4 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-sm font-semibold text-destructive",
						children: [
							"Overdue (",
							overdue.length,
							")"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: overdue.map(row)
				})]
			}) : null,
			list.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "gap-0 py-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: list.map(row)
				})
			}) : overdue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
				className: "border border-dashed py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
						variant: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ListTodo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: data.tasks.length === 0 ? "No tasks yet" : "Nothing here" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: data.tasks.length === 0 ? "Add reminders like paying rent or renewing insurance." : "No tasks match this view." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " Add task"]
				}) })]
			}) : null,
			counts.completed > 0 && status !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: counts.completed
				}), " completed tasks hidden. Switch to Completed to view them."]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormDialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				editing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: toDelete !== null,
				onOpenChange: (o) => {
					if (!o) setToDelete(null);
				},
				title: "Delete this task?",
				description: `"${toDelete?.title ?? ""}" will be permanently removed.`,
				onConfirm: () => {
					if (!toDelete) return;
					update((d) => deleteTask(d, toDelete.id));
					toast.success("Task deleted");
				}
			})
		]
	});
}
export { TasksPage as component };

import { __toESM } from "../_runtime.mjs";
import { PageHeader } from "./page-header-CNhl5PYf.mjs";
import { Badge } from "./badge-Dl7EzMfQ.mjs";
import { Button$1, amountField, cn, dayField, minorToInput, parseAmountToMinor, paymentMethodField } from "./router-CV1frvwC.mjs";
import { Card, FREQUENCY_LABELS, PAYMENT_METHODS, formatDay, todayDay, useWallet } from "./card-DMJBVK8X.mjs";
import { _enum, object, string } from "../_libs/zod.mjs";
import { Dialog$1, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog-AT5g43mg.mjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, addRecurring, deleteRecurring, setRecurringPaused, updateRecurring } from "./dropdown-menu-2jleO2R6.mjs";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty-D8Vt0WGC.mjs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form-CfATv17M.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-DO92WjiG.mjs";
import { Tabs$1, TabsList, TabsTrigger } from "./tabs-D3vzhz_a.mjs";
import { Amount } from "./amount-D-JW0VDA.mjs";
import { CategorySelect } from "./category-select-BdW5oQJT.mjs";
import { ConfirmDialog } from "./confirm-dialog-oCcIuwqE.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { require_lucide_react } from "../_libs/lucide-react.mjs";
import { u, useForm, useWatch } from "../_libs/@hookform/resolvers+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/recurring-BDXc-Fks.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function RecurringPage() {
	const { data, update } = useWallet();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const names = new Map(data.categories.map((c) => [c.id, c.name]));
	const sorted = [...data.recurring].sort((a, b) => Number(a.paused) - Number(b.paused) || a.nextDate.localeCompare(b.nextDate));
	const postedCount = (id) => data.transactions.filter((t) => t.recurringId === id).length;
	const openNew = () => {
		setEditing(null);
		setOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display",
					children: "Recurring"
				}),
				description: "Schedules post a real transaction automatically on each due date. Upcoming ones stay scheduled until then.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " New schedule"]
				})
			}),
			sorted.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Empty, {
				className: "border border-dashed py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EmptyHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMedia, {
						variant: "icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Repeat, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyTitle, { children: "No recurring schedules" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyDescription, { children: "Automate salary, rent, bills, and subscriptions." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Plus, {}), " Add a schedule"]
				}) })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
				children: sorted.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: cn("gap-4 px-5 shadow-sm", r.paused && "opacity-70"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-10 shrink-0 place-items-center rounded-xl", r.type === "income" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Repeat, { className: "size-4.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display font-semibold",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											names.get(r.categoryId) ?? "Uncategorised",
											" · ",
											PAYMENT_METHODS[r.paymentMethod]
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										variant: "ghost",
										size: "icon-sm",
										"aria-label": "Schedule actions"
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreVertical, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "w-36",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => {
												update((d) => setRecurringPaused(d, r.id, !r.paused));
												toast.success(r.paused ? "Schedule resumed" : "Schedule paused");
											},
											children: [
												r.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Play, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pause, {}),
												" ",
												r.paused ? "Resume" : "Pause"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: () => {
												setEditing(r);
												setOpen(true);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pencil, {}), " Edit"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											variant: "destructive",
											onClick: () => setToDelete(r),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete"]
										})
									]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
								value: r.amount,
								type: r.type,
								signed: true,
								className: "font-display text-2xl font-semibold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: FREQUENCY_LABELS[r.frequency]
								}), r.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "destructive",
									children: "Paused"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Active" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CalendarClock, { className: "size-3.5" }),
									r.paused ? "Paused" : "Next:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: r.paused ? "" : formatDay(r.nextDate, data.settings.dateFormat)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [postedCount(r.id), " posted"]
							})]
						})
					]
				}, r.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "sm:max-w-lg",
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecurringForm, {
						editing,
						onDone: () => setOpen(false)
					}, editing?.id ?? "new") : null
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: toDelete !== null,
				onOpenChange: (o) => {
					if (!o) setToDelete(null);
				},
				title: "Delete this schedule?",
				description: "Future transactions will stop. Transactions already posted stay in your history.",
				onConfirm: () => {
					if (!toDelete) return;
					update((d) => deleteRecurring(d, toDelete.id));
					toast.success("Schedule deleted");
				}
			})
		]
	});
}
var schema = object({
	type: _enum(["income", "expense"]),
	title: string().trim().min(1, "Enter a title").max(80),
	amount: amountField,
	categoryId: string().min(1, "Choose a category"),
	paymentMethod: paymentMethodField,
	frequency: _enum([
		"daily",
		"weekly",
		"monthly",
		"yearly"
	]),
	startDate: dayField,
	description: string().max(500)
});
function RecurringForm({ editing, onDone }) {
	const { update } = useWallet();
	const form = useForm({
		resolver: u(schema),
		defaultValues: editing ? {
			...editing,
			amount: minorToInput(editing.amount)
		} : {
			type: "expense",
			title: "",
			amount: "",
			categoryId: "",
			paymentMethod: "bank_transfer",
			frequency: "monthly",
			startDate: todayDay(),
			description: ""
		}
	});
	const type = useWatch({
		control: form.control,
		name: "type"
	});
	const submit = (v) => {
		const amount = parseAmountToMinor(v.amount);
		if (amount === null) return;
		const input = {
			...v,
			amount,
			title: v.title.trim(),
			description: v.description.trim()
		};
		update((d) => editing ? updateRecurring(d, editing.id, input) : addRecurring(d, input));
		toast.success(editing ? "Schedule updated" : "Schedule created", { description: v.startDate <= todayDay() ? "Due entries were posted to your transactions." : void 0 });
		onDone();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: "font-display text-xl",
		children: editing ? "Edit schedule" : "New recurring schedule"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A transaction is created automatically on each due date, never twice for the same date." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: form.handleSubmit(submit),
			className: "grid gap-4",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
					value: type,
					onValueChange: (v) => {
						form.setValue("type", v);
						form.setValue("categoryId", "");
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "expense",
							children: "Expense"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "income",
							children: "Income"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "title",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							placeholder: type === "income" ? "Monthly salary" : "House rent",
							...field
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "amount",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								inputMode: "decimal",
								className: "font-mono",
								placeholder: "15000",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "frequency",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Repeats" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							className: "w-full",
							value: field.value,
							onChange: (e) => field.onChange(e.target.value),
							children: Object.entries(FREQUENCY_LABELS).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value: k,
								children: l
							}, k))
						})] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "categoryId",
						render: ({ field, fieldState }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Category" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategorySelect, {
								type,
								value: field.value,
								invalid: !!fieldState.error,
								onChange: field.onChange
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "startDate",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: editing ? "Start / next date" : "First date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "paymentMethod",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Payment method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						className: "w-full",
						value: field.value,
						onChange: (e) => field.onChange(e.target.value),
						children: Object.entries(PAYMENT_METHODS).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
							value: k,
							children: l
						}, k))
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "description",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Description" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							placeholder: "Optional note",
							...field
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "button",
					variant: "ghost",
					onClick: onDone,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					children: editing ? "Save changes" : "Create schedule"
				})] })
			]
		})
	})] });
}
export { RecurringPage as component };

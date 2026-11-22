import { __toESM } from "./_runtime.mjs";
import { AppShell } from "./_ssr/app-shell-I3wLl66O.mjs";
import { Logo } from "./_ssr/logo-Dg5jme04.mjs";
import { Card, PAYMENT_METHODS, WalletContext, formatDay, todayDay, useWallet } from "./_ssr/card-DMJBVK8X.mjs";
import { Button$1, apiRequest, cn, minorToInput, parseAmountToMinor, txFormSchema } from "./_ssr/router-CV1frvwC.mjs";
import { clearWallet, getWallet, parseWallet, replaceWallet, subscribe, updateWallet } from "./_ssr/store-D1TB6-Pk.mjs";
import { SignInButton } from "./_ssr/signin-s9QPWhrc.mjs";
import { TxDialogContext } from "./_ssr/use-tx-dialog-BkFXropk.mjs";
import { TaskFormDialog } from "./_ssr/task-form-dialog-gHLf9ch3.mjs";
import { Badge } from "./_ssr/badge-Dl7EzMfQ.mjs";
import { Dialog$1, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./_ssr/dialog-AT5g43mg.mjs";
import { addTransaction, deleteTransaction, updateTransaction } from "./_ssr/dropdown-menu-2jleO2R6.mjs";
import { Amount } from "./_ssr/amount-D-JW0VDA.mjs";
import { ConfirmDialog } from "./_ssr/confirm-dialog-oCcIuwqE.mjs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./_ssr/form-CfATv17M.mjs";
import { Input$1 } from "./_ssr/input-D47Nw5JP.mjs";
import { NativeSelect, NativeSelectOption } from "./_ssr/native-select-DO92WjiG.mjs";
import { Textarea } from "./_ssr/textarea-Dd-ZiYQA.mjs";
import { CategorySelect } from "./_ssr/category-select-BdW5oQJT.mjs";
import { useAuth } from "./_ssr/use-auth-DYBDWyDu.mjs";
import { require_react } from "./_libs/@base-ui/react+[...].mjs";
import { Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { require_jsx_runtime } from "./_libs/react.mjs";
import { useQuery } from "./_libs/tanstack__react-query2.mjs";
import { toast } from "./_libs/sonner.mjs";
import { require_lucide_react } from "./_libs/lucide-react.mjs";
import { format, parseISO } from "./_libs/date-fns.mjs";
import { u, useForm } from "./_libs/@hookform/resolvers+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/_app-CUbcfTfK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var collections = [
	"transactions",
	"categories",
	"tasks",
	"budgets",
	"recurring",
	"notifications"
];
function hasRecords(d) {
	return d.transactions.length + d.categories.length + d.tasks.length + d.budgets.length + d.recurring.length + d.notifications.length > 0;
}
function recordIds(d, key) {
	return new Set(d[key].map((row) => row.id));
}
async function syncWallet(data, previous) {
	await apiRequest("/wallet", {
		method: "PUT",
		body: JSON.stringify(data)
	});
	if (previous) for (const kind of collections) {
		const current = recordIds(data, kind);
		for (const id of recordIds(previous, kind)) if (!current.has(id)) await apiRequest("/wallet/delete", {
			method: "POST",
			body: JSON.stringify({
				kind,
				id
			})
		});
	}
}
function WalletProvider({ userId, name, email, fallback, children }) {
	const [walletState, setWalletState] = (0, import_react.useState)(null);
	const data = walletState?.userId === userId ? walletState.data : null;
	const hydrated = (0, import_react.useRef)(false);
	const failureShown = (0, import_react.useRef)(false);
	const persistTimer = (0, import_react.useRef)(void 0);
	const synced = (0, import_react.useRef)(null);
	const chain = (0, import_react.useRef)(Promise.resolve());
	const query = useQuery({
		queryKey: ["wallet", userId],
		queryFn: () => apiRequest("/wallet"),
		staleTime: 3e4,
		retry: 1
	});
	(0, import_react.useEffect)(() => {
		hydrated.current = false;
		synced.current = null;
		return () => {
			hydrated.current = false;
			if (persistTimer.current) clearTimeout(persistTimer.current);
		};
	}, [userId, name]);
	(0, import_react.useEffect)(() => {
		if (query.isPending) return;
		let active = true;
		(async () => {
			try {
				if (query.isError) throw query.error;
				const remote = parseWallet(JSON.stringify(query.data), name);
				if (!remote) throw new Error("The server returned invalid wallet data.");
				const local = getWallet(userId, name);
				let initial = remote;
				if (!hasRecords(remote) && hasRecords(local)) {
					await apiRequest("/wallet", {
						method: "PUT",
						body: JSON.stringify(local)
					});
					initial = local;
				} else replaceWallet(userId, remote);
				if (active) {
					synced.current = initial;
					setWalletState({
						userId,
						data: initial
					});
					hydrated.current = true;
					updateWallet(userId, name, (wallet) => wallet);
				}
			} catch (error) {
				if (active) {
					setWalletState({
						userId,
						data: getWallet(userId, name)
					});
					toast.error("Wallet API is unavailable", { description: error instanceof Error ? error.message : "Changes are saved in this browser until the connection is restored." });
				}
			}
		})();
		return () => {
			active = false;
		};
	}, [
		query.isError,
		query.isPending,
		query.data,
		query.error,
		userId,
		name
	]);
	(0, import_react.useEffect)(() => subscribe(() => {
		setWalletState({
			userId,
			data: getWallet(userId, name)
		});
		if (!hydrated.current) return;
		if (persistTimer.current) clearTimeout(persistTimer.current);
		persistTimer.current = setTimeout(() => {
			const snapshot = getWallet(userId, name);
			chain.current = chain.current.then(async () => {
				await syncWallet(snapshot, synced.current);
				synced.current = snapshot;
				failureShown.current = false;
			}).catch((error) => {
				if (!failureShown.current) toast.error("Could not sync wallet data", { description: error instanceof Error ? error.message : "Your data remains in this browser for now." });
				failureShown.current = true;
			});
		}, 400);
	}), [userId, name]);
	const update = (0, import_react.useCallback)((fn) => updateWallet(userId, name, fn), [userId, name]);
	const replace = (0, import_react.useCallback)((wallet) => replaceWallet(userId, wallet), [userId]);
	const reset = (0, import_react.useCallback)(() => clearWallet(userId, name), [userId, name]);
	const value = (0, import_react.useMemo)(() => data ? {
		data,
		update,
		replace,
		reset,
		email,
		money: {
			currency: data.settings.currency,
			locale: data.settings.numberLocale
		}
	} : null, [
		data,
		update,
		replace,
		reset,
		email
	]);
	if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletContext, {
		value,
		children
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse rounded-md bg-muted", className),
		...props
	});
}
function TransactionDetailsDialog({ tx, onOpenChange, onEdit }) {
	const { data, update } = useWallet();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	const live = tx ? data.transactions.find((t) => t.id === tx.id) ?? null : null;
	const category = live ? data.categories.find((c) => c.id === live.categoryId) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open: live !== null,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md",
			children: live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: live.type === "income" ? "default" : "destructive",
							className: "capitalize",
							children: live.type
						}), live.recurringId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Repeat, {}), " Recurring"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "pt-1 font-display text-xl",
						children: live.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "font-mono text-xs",
						children: live.ref
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amount, {
					value: live.amount,
					currency: live.currency,
					type: live.type,
					signed: true,
					className: "font-display text-4xl font-semibold"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-muted/60 p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Category",
							value: category?.name ?? "Uncategorised"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Date",
							value: formatDay(live.date, data.settings.dateFormat)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Payment method",
							value: PAYMENT_METHODS[live.paymentMethod]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							label: "Recorded",
							value: format(parseISO(live.createdAt), "d MMM yyyy, p")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "whitespace-pre-wrap break-words pt-0.5",
								children: live.description || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "No description"
								})
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "destructive",
					onClick: () => setConfirm(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2, {}), " Delete"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: () => {
						onOpenChange(false);
						onEdit(live);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Pencil, {}), " Edit"]
				})] })
			] }) : null
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
		open: confirm,
		onOpenChange: setConfirm,
		title: "Delete this transaction?",
		description: "This permanently removes it and updates all totals, budgets, and charts.",
		onConfirm: () => {
			if (!live) return;
			update((d) => deleteTransaction(d, live.id));
			onOpenChange(false);
			toast.success("Transaction deleted");
		}
	})] });
}
function Detail({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "truncate pt-0.5 font-medium",
			children: value
		})]
	});
}
function initialValues(editing) {
	if (editing) return {
		title: editing.title,
		amount: minorToInput(editing.amount),
		categoryId: editing.categoryId,
		date: editing.date,
		paymentMethod: editing.paymentMethod,
		description: editing.description
	};
	return {
		title: "",
		amount: "",
		categoryId: "",
		date: todayDay(),
		paymentMethod: "upi",
		description: ""
	};
}
function TransactionFormDialog({ open, onOpenChange, type, editing }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-lg",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxForm, {
				type: editing?.type ?? type,
				editing,
				onDone: () => onOpenChange(false)
			}, editing?.id ?? `new-${type}`) : null
		})
	});
}
function TxForm({ type, editing, onDone }) {
	const { update, money } = useWallet();
	const form = useForm({
		resolver: u(txFormSchema),
		defaultValues: initialValues(editing)
	});
	const label = type === "income" ? "Income" : "Expense";
	const onSubmit = (values) => {
		const amount = parseAmountToMinor(values.amount);
		if (amount === null) return;
		const input = {
			type,
			title: values.title.trim(),
			amount,
			currency: editing?.currency ?? money.currency,
			categoryId: values.categoryId,
			date: values.date,
			paymentMethod: values.paymentMethod,
			description: values.description.trim()
		};
		try {
			update((d) => editing ? updateTransaction(d, editing.id, input) : addTransaction(d, input));
			toast.success(editing ? `${label} updated` : `${label} added`, { description: input.title });
			onDone();
		} catch {
			toast.error("Could not save. Please try again.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: "font-display text-xl",
		children: editing ? `Edit ${label.toLowerCase()}` : `Add ${label.toLowerCase()}`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: type === "income" ? "Record money coming in." : "Record money going out." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
		...form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: form.handleSubmit(onSubmit),
			className: "grid gap-4",
			noValidate: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "title",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Title" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
							placeholder: type === "income" ? "November salary" : "Groceries at BigBasket",
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
								placeholder: "2500.00",
								className: "font-mono",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "date",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
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
								onChange: (id) => field.onChange(id)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "paymentMethod",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Payment method" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
								className: "w-full",
								value: field.value,
								onChange: (e) => field.onChange(e.target.value),
								children: Object.entries(PAYMENT_METHODS).map(([value, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
									value,
									children: name
								}, value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "description",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Description" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
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
					children: editing ? "Save changes" : `Add ${label.toLowerCase()}`
				})] })
			]
		})
	})] });
}
/** App-wide dialogs so any page (and quick actions) can open them. */
function TxDialogProvider({ children }) {
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [formType, setFormType] = (0, import_react.useState)("expense");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [details, setDetails] = (0, import_react.useState)(null);
	const [taskOpen, setTaskOpen] = (0, import_react.useState)(false);
	const value = (0, import_react.useMemo)(() => ({
		openNew: (type) => {
			setEditing(null);
			setFormType(type);
			setFormOpen(true);
		},
		openEdit: (tx) => {
			setEditing(tx);
			setFormType(tx.type);
			setFormOpen(true);
		},
		openDetails: (tx) => setDetails(tx),
		openTask: () => setTaskOpen(true)
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TxDialogContext, {
		value,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionFormDialog, {
				open: formOpen,
				onOpenChange: setFormOpen,
				type: formType,
				editing
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDetailsDialog, {
				tx: details,
				onOpenChange: (o) => {
					if (!o) setDetails(null);
				},
				onEdit: value.openEdit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskFormDialog, {
				open: taskOpen,
				onOpenChange: setTaskOpen,
				editing: null
			})
		]
	});
}
function ShellSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden w-64 bg-sidebar lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 space-y-6 p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-56" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-xl" }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-xl" })
			]
		})]
	});
}
function AppLayout() {
	const { user } = useAuth();
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-sm items-center gap-5 px-8 py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldCheck, { className: "size-8 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: "Sign in to continue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your financial dashboard is private to your account."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInButton, {
					className: "w-full",
					signInText: "Sign in with Google or email"
				})
			]
		})
	});
	const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email.split("@")[0] || "You";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletProvider, {
		userId: user.id,
		name,
		email: user.email,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellSkeleton, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxDialogProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
export { AppLayout as component };

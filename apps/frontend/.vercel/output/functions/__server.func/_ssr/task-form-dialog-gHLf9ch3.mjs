import { Button$1 } from "./router-CV1frvwC.mjs";
import { Dialog$1, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog-AT5g43mg.mjs";
import { _enum, object, string } from "../_libs/zod.mjs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form-CfATv17M.mjs";
import { Input$1 } from "./input-D47Nw5JP.mjs";
import { NativeSelect, NativeSelectOption } from "./native-select-DO92WjiG.mjs";
import { Textarea } from "./textarea-Dd-ZiYQA.mjs";
import { PRIORITY_LABELS, useWallet } from "./card-DMJBVK8X.mjs";
import { addTask, updateTask } from "./dropdown-menu-2jleO2R6.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
import { u, useForm } from "../_libs/@hookform/resolvers+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/task-form-dialog-gHLf9ch3.js
var import_jsx_runtime = require_jsx_runtime();
var schema = object({
	title: string().trim().min(1, "Enter a task title").max(100, "Keep it under 100 characters"),
	description: string().max(500, "Keep it under 500 characters"),
	dueDate: string(),
	priority: _enum([
		"low",
		"medium",
		"high"
	])
});
function TaskFormDialog({ open, onOpenChange, editing }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskForm, {
				editing,
				onDone: () => onOpenChange(false)
			}, editing?.id ?? "new") : null
		})
	});
}
function TaskForm({ editing, onDone }) {
	const { update } = useWallet();
	const form = useForm({
		resolver: u(schema),
		defaultValues: {
			title: editing?.title ?? "",
			description: editing?.description ?? "",
			dueDate: editing?.dueDate ?? "",
			priority: editing?.priority ?? "medium"
		}
	});
	const onSubmit = (v) => {
		const input = {
			title: v.title.trim(),
			description: v.description.trim(),
			dueDate: v.dueDate || null,
			priority: v.priority
		};
		update((d) => editing ? updateTask(d, editing.id, input) : addTask(d, input));
		toast.success(editing ? "Task updated" : "Task added");
		onDone();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: "font-display text-xl",
		children: editing ? "Edit task" : "New task"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Keep track of bills to pay, documents to file, and money to-dos." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
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
							placeholder: "Pay credit card bill",
							...field
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "dueDate",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Due date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
								type: "date",
								...field
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						control: form.control,
						name: "priority",
						render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							className: "w-full",
							value: field.value,
							onChange: (e) => field.onChange(e.target.value),
							children: Object.entries(PRIORITY_LABELS).map(([value, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelectOption, {
								value,
								children: name
							}, value))
						})] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					control: form.control,
					name: "description",
					render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Description" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							placeholder: "Optional details",
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
					children: editing ? "Save changes" : "Add task"
				})] })
			]
		})
	})] });
}
export { TaskFormDialog };

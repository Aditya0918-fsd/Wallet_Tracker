import { __toESM } from "../_runtime.mjs";
import { cn } from "./router-BGnyA3VS.mjs";
import { Label } from "./label-C09qvLPy.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { useRender } from "../_libs/@base-ui/react+[3...].mjs";
import { Controller, FormProvider, useFormContext, useFormState } from "../_libs/@hookform/resolvers+[...].mjs";
import { mergeProps } from "../_libs/@base-ui/react+[2...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/form-skY7Iqsn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Form = FormProvider;
var FormFieldContext = import_react.createContext({});
var FormField = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormFieldContext.Provider, {
		value: { name: props.name },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, { ...props })
	});
};
var useFormField = () => {
	const fieldContext = import_react.useContext(FormFieldContext);
	const itemContext = import_react.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);
	if (!fieldContext) throw new Error("useFormField should be used within <FormField>");
	const { id } = itemContext;
	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState
	};
};
var FormItemContext = import_react.createContext({});
function FormItem({ className, ...props }) {
	const id = import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormItemContext.Provider, {
		value: { id },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "form-item",
			className: cn("grid gap-2", className),
			...props
		})
	});
}
function FormLabel({ className, ...props }) {
	const { error, formItemId } = useFormField();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-slot": "form-label",
		"data-error": !!error,
		className: cn("data-[error=true]:text-destructive", className),
		htmlFor: formItemId,
		...props
	});
}
function FormControl({ children, ...props }) {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
	return useRender({
		render: children,
		props: mergeProps({
			id: formItemId,
			"aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
			"aria-invalid": !!error
		}, props),
		state: { slot: "form-control" }
	});
}
function FormMessage({ className, ...props }) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : props.children;
	if (!body) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-slot": "form-message",
		id: formMessageId,
		className: cn("text-sm text-destructive", className),
		...props,
		children: body
	});
}
export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };

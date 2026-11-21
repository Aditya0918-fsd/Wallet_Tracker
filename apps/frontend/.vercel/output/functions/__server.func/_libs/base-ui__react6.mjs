import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
import { useIsoLayoutEffect, useRenderElement, useStableCallback, useTimeout } from "./@base-ui/react+[2...].mjs";
import { createChangeEventDetails, none, useValueChanged } from "./base-ui__react+base-ui__utils.mjs";
import { fieldValidityMapping, useFieldRootContext, useFormContext, useLabelableContext, useLabelableId, useRegisterFieldControl, useSetFieldFocused } from "./base-ui__react4.mjs";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/field/control/FieldControl.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* The form control to label and validate.
* Renders an `<input>` element.
*
* You can omit this part and use any Base UI input component instead. For example,
* [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
* or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldControl = /*#__PURE__*/ import_react.forwardRef(function FieldControl(componentProps, forwardedRef) {
	const { render, className, id: idProp, name: nameProp, value, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
	const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFilled, validationMode, validation } = useFieldRootContext();
	const { clearErrors, elementRef: formElementRef, submitCountRef } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const state = {
		...fieldState,
		disabled
	};
	const { labelId } = useLabelableContext();
	const id = useLabelableId({ id: idProp });
	const isControlled = value !== void 0;
	const serializedValue = value == null ? void 0 : String(value);
	const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
	useRegisterFieldControl(validation.inputRef, id, serializedValue, getValueFromInput, !disabled, nameProp);
	useIsoLayoutEffect(() => {
		const currentValue = serializedValue ?? validation.inputRef.current?.value;
		if (currentValue !== void 0) setFilled(currentValue !== "");
	}, [
		serializedValue,
		defaultValue,
		validation.inputRef,
		setFilled
	]);
	useValueChanged(serializedValue, () => {
		if (serializedValue === void 0) return;
		clearErrors(name);
		setDirty(serializedValue !== (validityData.initialValue ?? ""));
		validation.change(serializedValue);
	});
	const inputRef = import_react.useRef(null);
	const setFocused = useSetFieldFocused(disabled, inputRef);
	const enterValidationTimeout = useTimeout();
	return useRenderElement("input", componentProps, {
		ref: [forwardedRef, inputRef],
		state,
		props: [
			{
				id,
				disabled,
				name,
				ref: validation.inputRef,
				"aria-labelledby": labelId,
				autoFocus,
				...isControlled ? { value } : { defaultValue },
				onChange(event) {
					const inputValue = event.currentTarget.value;
					const details = createChangeEventDetails(none, event.nativeEvent);
					onValueChange?.(inputValue, details);
					if (isControlled) return;
					setDirty(inputValue !== (validityData.initialValue ?? ""));
					setFilled(inputValue !== "");
					if (!event.nativeEvent.defaultPrevented && !details.isCanceled) {
						clearErrors(name);
						validation.change(inputValue);
					}
				},
				onFocus() {
					setFocused(true);
				},
				onBlur(event) {
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") {
						const inputValue = event.currentTarget.value;
						validation.commit(inputValue);
						if (isControlled) queueMicrotask(() => {
							const nextValue = validation.inputRef.current?.value;
							if (nextValue !== void 0 && nextValue !== inputValue && nextValue !== (validityData.initialValue ?? "")) validation.commit(nextValue);
						});
					}
				},
				onKeyDown(event) {
					if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
						setTouched(true);
						const value = event.currentTarget.value;
						const form = event.currentTarget.form;
						if (form && form === formElementRef.current && !event.defaultPrevented) {
							const input = event.currentTarget;
							const submitCount = submitCountRef.current;
							enterValidationTimeout.start(0, () => {
								if (submitCountRef.current === submitCount) validation.commit(input.value);
							});
						} else validation.commit(value);
					}
				}
			},
			elementProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping: fieldValidityMapping
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/input/Input.mjs
var import_jsx_runtime = require_jsx_runtime();
/**
* A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
* Renders an `<input>` element.
*
* Documentation: [Base UI Input](https://base-ui.com/react/components/input)
*/
var Input = /*#__PURE__*/ import_react.forwardRef(function Input(props, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldControl, {
		ref: forwardedRef,
		...props
	});
});
export { Input };

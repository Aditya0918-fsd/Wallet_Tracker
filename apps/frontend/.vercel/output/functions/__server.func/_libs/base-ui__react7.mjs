import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
import { EMPTY_OBJECT, dispatchClickWithModifiers, formatErrorMessage, useButton, useIsoLayoutEffect, useMergedRefs, useRenderElement } from "./@base-ui/react+[2...].mjs";
import { visuallyHidden, visuallyHiddenInput } from "./@base-ui/react+[3...].mjs";
import { createChangeEventDetails, none, useBaseUiId, useValueChanged } from "./base-ui__react+base-ui__utils.mjs";
import { useControlled } from "./base-ui__utils.mjs";
import { fieldValidityMapping, useFieldRootContext, useFormContext, useLabelableContext, useLabelableId, useRegisterFieldControl, useSetFieldFocused } from "./base-ui__react4.mjs";
import { useAriaLabelledBy } from "./base-ui__react5.mjs";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/switch/root/SwitchRootContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SwitchRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useSwitchRootContext() {
	const context = import_react.useContext(SwitchRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(63));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/switch/root/SwitchRootDataAttributes.mjs
/**
* Present when the switch is checked.
*/
var checked = "data-checked";
/**
* Present when the switch is not checked.
*/
var unchecked = "data-unchecked";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/switch/stateAttributesMapping.mjs
var stateAttributesMapping = {
	...fieldValidityMapping,
	checked(value) {
		if (value) return { [checked]: "" };
		return { [unchecked]: "" };
	}
};
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/switch/root/SwitchRoot.mjs
var import_jsx_runtime = require_jsx_runtime();
var SwitchRoot = /*#__PURE__*/ import_react.forwardRef(function SwitchRoot(componentProps, forwardedRef) {
	const { checked: checkedProp, className, defaultChecked, "aria-labelledby": ariaLabelledByProp, form, id: idProp, inputRef: externalInputRef, name: nameProp, nativeButton = false, onCheckedChange, readOnly = false, required = false, disabled: disabledProp = false, render, uncheckedValue, value, style, ...elementProps } = componentProps;
	const { clearErrors } = useFormContext();
	const { state: fieldState, setTouched, setDirty, validityData, setFilled, validationMode, disabled: fieldDisabled, name: fieldName, validation } = useFieldRootContext();
	const { labelId } = useLabelableContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const inputRef = import_react.useRef(null);
	const handleInputRef = useMergedRefs(inputRef, externalInputRef, validation.inputRef);
	const switchRef = import_react.useRef(null);
	const setFocused = useSetFieldFocused(disabled, switchRef);
	const id = useBaseUiId();
	const controlId = useLabelableId({ id: idProp });
	const hiddenInputId = nativeButton ? void 0 : controlId;
	const [checked, setCheckedState] = useControlled({
		controlled: checkedProp,
		default: Boolean(defaultChecked),
		name: "Switch",
		state: "checked"
	});
	useRegisterFieldControl(switchRef, id, checked, void 0, !disabled, nameProp);
	useIsoLayoutEffect(() => {
		setFilled(checked);
	}, [checked, setFilled]);
	useValueChanged(checked, () => {
		clearErrors(name);
		setDirty(checked !== validityData.initialValue);
		validation.change(checked);
	});
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, hiddenInputId, elementProps["aria-label"]);
	const rootProps = {
		id: nativeButton ? controlId : id,
		role: "switch",
		"aria-checked": checked,
		"aria-readonly": readOnly || void 0,
		"aria-required": required || void 0,
		"aria-labelledby": ariaLabelledBy,
		onFocus() {
			setFocused(true);
		},
		onBlur() {
			const element = inputRef.current;
			if (!element || disabled) return;
			setTouched(true);
			setFocused(false);
			if (validationMode === "onBlur") validation.commit(element.checked);
		},
		onClick(event) {
			if (readOnly || disabled) return;
			event.preventDefault();
			const input = inputRef.current;
			if (!input) return;
			dispatchClickWithModifiers(input, event);
		}
	};
	const inputProps = {
		...validation.getValidationProps(disabled),
		checked,
		disabled,
		form,
		id: hiddenInputId,
		name,
		required,
		style: name ? visuallyHiddenInput : visuallyHidden,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": true,
		ref: handleInputRef,
		onChange(event) {
			if (event.nativeEvent.defaultPrevented) return;
			if (readOnly) {
				event.preventDefault();
				return;
			}
			const nextChecked = event.currentTarget.checked;
			const eventDetails = createChangeEventDetails(none, event.nativeEvent);
			onCheckedChange?.(nextChecked, eventDetails);
			if (eventDetails.isCanceled) return;
			setCheckedState(nextChecked);
		},
		onClick(event) {
			event.stopPropagation();
		},
		onFocus() {
			switchRef.current?.focus();
		},
		...value !== void 0 ? { value } : EMPTY_OBJECT
	};
	const state = import_react.useMemo(() => ({
		...fieldState,
		checked,
		disabled,
		readOnly,
		required
	}), [
		fieldState,
		checked,
		disabled,
		readOnly,
		required
	]);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: [
			forwardedRef,
			switchRef,
			buttonRef
		],
		props: [
			rootProps,
			elementProps,
			getButtonProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SwitchRootContext.Provider, {
		value: state,
		children: [
			element,
			!checked && name && uncheckedValue !== void 0 && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
				type: "hidden",
				form,
				name,
				value: uncheckedValue,
				disabled
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)("input", {
				...inputProps,
				suppressHydrationWarning: true
			})
		]
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/switch/thumb/SwitchThumb.mjs
/**
* The movable part of the switch that indicates whether the switch is on or off.
* Renders a `<span>`.
*
* Documentation: [Base UI Switch](https://base-ui.com/react/components/switch)
*/
var SwitchThumb = /*#__PURE__*/ import_react.forwardRef(function SwitchThumb(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const state = useSwitchRootContext();
	return useRenderElement("span", componentProps, {
		state,
		ref: forwardedRef,
		stateAttributesMapping,
		props: elementProps
	});
});
export { SwitchRoot, SwitchThumb };

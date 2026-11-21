import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
import { formatErrorMessage, useRenderElement } from "./@base-ui/react+[2...].mjs";
import { visuallyHidden } from "./@base-ui/react+[3...].mjs";
import { clamp } from "./base-ui__utils2.mjs";
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/stringifyLocale.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function stringifyLocale(locale) {
	if (Array.isArray(locale)) return locale.map((value) => stringifyLocale(value)).join(",");
	if (locale == null) return "";
	return String(locale);
}
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/formatNumber.mjs
var cache = /* @__PURE__ */ new Map();
function getFormatter(locale, options) {
	const optionsString = JSON.stringify({
		locale: stringifyLocale(locale),
		options
	});
	const cachedFormatter = cache.get(optionsString);
	if (cachedFormatter) return cachedFormatter;
	const formatter = new Intl.NumberFormat(locale, options);
	cache.set(optionsString, formatter);
	return formatter;
}
function formatNumber(value, locale, options) {
	if (value == null) return "";
	return getFormatter(locale, options).format(value);
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/utils/valueToPercent.mjs
function valueToPercent(value, min, max) {
	return (value - min) * 100 / (max - min);
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/root/ProgressRootContext.mjs
/**
* @internal
*/
var ProgressRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useProgressRootContext() {
	const context = import_react.useContext(ProgressRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(51));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/root/ProgressRootDataAttributes.mjs
/**
* Present when the progress has completed.
*/
var complete = "data-complete";
/**
* Present when the progress is in indeterminate state.
*/
var indeterminate = "data-indeterminate";
/**
* Present while the progress is progressing.
*/
var progressing = "data-progressing";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/root/stateAttributesMapping.mjs
var progressStateAttributesMapping = { status(value) {
	if (value === "progressing") return { [progressing]: "" };
	if (value === "complete") return { [complete]: "" };
	if (value === "indeterminate") return { [indeterminate]: "" };
	return null;
} };
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/root/ProgressRoot.mjs
var import_jsx_runtime = require_jsx_runtime();
/**
* Groups all parts of the progress bar and provides the task completion status to screen readers.
* Renders a `<div>` element.
*
* Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
*/
var ProgressRoot = /*#__PURE__*/ import_react.forwardRef(function ProgressRoot(componentProps, forwardedRef) {
	const { format, getAriaValueText, locale, max = 100, min = 0, value, render, className, children, style, ...elementProps } = componentProps;
	const [labelId, setLabelId] = import_react.useState();
	let status = "indeterminate";
	let percentageValue = null;
	let clampedValue = null;
	let formattedValue = "";
	let defaultAriaValueText = "indeterminate progress";
	if (value != null && Number.isFinite(value)) {
		const rawPercentage = valueToPercent(value, min, max);
		percentageValue = clamp(Number.isNaN(rawPercentage) ? 0 : rawPercentage, 0, 100);
		clampedValue = clamp(value, min, max);
		status = clampedValue === max ? "complete" : "progressing";
		formattedValue = format ? formatNumber(clampedValue, locale, format) : formatNumber(percentageValue / 100, locale, { style: "percent" });
		defaultAriaValueText = formattedValue;
	}
	const state = import_react.useMemo(() => ({ status }), [status]);
	const defaultProps = {
		"aria-labelledby": labelId,
		"aria-valuemax": max,
		"aria-valuemin": min,
		"aria-valuenow": clampedValue ?? void 0,
		"aria-valuetext": getAriaValueText ? getAriaValueText(formattedValue, value) : defaultAriaValueText,
		role: "progressbar",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [children, /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			role: "presentation",
			style: visuallyHidden,
			children: "x"
		})] })
	};
	const contextValue = import_react.useMemo(() => ({
		formattedValue,
		percentageValue,
		setLabelId,
		state,
		value
	}), [
		formattedValue,
		percentageValue,
		setLabelId,
		state,
		value
	]);
	const element = useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [defaultProps, elementProps],
		stateAttributesMapping: progressStateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressRootContext.Provider, {
		value: contextValue,
		children: element
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/track/ProgressTrack.mjs
/**
* Contains the progress bar indicator.
* Renders a `<div>` element.
*
* Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
*/
var ProgressTrack = /*#__PURE__*/ import_react.forwardRef(function ProgressTrack(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { state } = useProgressRootContext();
	return useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: progressStateAttributesMapping
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/progress/indicator/ProgressIndicator.mjs
/**
* Visualizes the completion status of the task.
* Renders a `<div>` element.
*
* Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
*/
var ProgressIndicator = /*#__PURE__*/ import_react.forwardRef(function ProgressIndicator(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { percentageValue, state } = useProgressRootContext();
	const indicatorStyle = percentageValue == null ? {} : {
		insetInlineStart: 0,
		height: "inherit",
		width: `${percentageValue}%`
	};
	return useRenderElement("div", componentProps, {
		state,
		ref: forwardedRef,
		props: [{ style: indicatorStyle }, elementProps],
		stateAttributesMapping: progressStateAttributesMapping
	});
});
export { ProgressIndicator, ProgressRoot, ProgressTrack };

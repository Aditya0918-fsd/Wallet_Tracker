import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { EMPTY_OBJECT, SafeReact, useIsoLayoutEffect, useStableCallback } from "./@base-ui/react+[2...].mjs";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/** Highlight navigation uses mouse events for hover and pointer events for leaving an item. */
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
function createGenericEventDetails(reason, event, customProperties) {
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		...custom
	};
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/reason-parts.mjs
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var pointer = "pointer";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var missing = "missing";
var initial = "initial";
var imperativeAction = "imperative-action";
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/useForcedRerendering.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Returns a function that forces a rerender.
*/
function useForcedRerendering() {
	const [, setState] = import_react.useState({});
	return import_react.useCallback(() => {
		setState({});
	}, []);
}
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/useId.mjs
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const defaultId = import_react.useRef(void 0);
	const forceRerender = useForcedRerendering();
	const id = idOverride ?? defaultId.current;
	import_react.useEffect(() => {
		if (defaultId.current == null) {
			globalId += 1;
			defaultId.current = `${prefix}-${globalId}`;
			if (idOverride == null) forceRerender();
		}
	}, [
		idOverride,
		prefix,
		forceRerender
	]);
	return id;
}
var maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param {string | undefined} idOverride overrides the generated id when provided
* @param {string | undefined} prefix prefixes the generated id when provided
* @returns {string | undefined}
*/
function useId(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/useBaseUiId.mjs
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId(idOverride, "base-ui");
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/useValueChanged.mjs
function useValueChanged(value, onChange) {
	const valueRef = import_react.useRef(value);
	const onChangeCallback = useStableCallback(onChange);
	useIsoLayoutEffect(() => {
		if (valueRef.current !== value) onChangeCallback(valueRef.current);
		valueRef.current = value;
	}, [value, onChangeCallback]);
}
export { cancelOpen, closePress, createChangeEventDetails, createGenericEventDetails, disabled, escapeKey, focusOut, imperativeAction, initial, itemPress, keyboard, listNavigation, missing, none, outsidePress, pointer, siblingOpen, triggerFocus, triggerHover, triggerPress, useBaseUiId, useForcedRerendering, useId, useValueChanged };

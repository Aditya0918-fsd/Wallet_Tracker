import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
import { CompositeRootContext, EMPTY_ARRAY, EMPTY_OBJECT, formatErrorMessage, useButton, useCompositeRootContext, useIsoLayoutEffect, useMergedRefs, useRenderElement, useStableCallback } from "./@base-ui/react+[2...].mjs";
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP, COMPOSITE_KEYS, CompositeList, MODIFIER_KEYS, activeElement, contains, findNonDisabledListIndex, getMaxListIndex, getMinListIndex, getTarget, isIndexOutOfListBounds, isListIndexDisabled, isNativeInput, ownerDocument, scrollIntoViewIfNeeded, useCompositeItem, useDirection } from "./@base-ui/react+[3...].mjs";
import { createChangeEventDetails, disabled, initial, missing, none, useBaseUiId } from "./base-ui__react+base-ui__utils.mjs";
import { useControlled } from "./base-ui__utils.mjs";
// ../../node_modules/.pnpm/@base-ui+utils@0.5.0_@types_6b1c5c30254f04ccfc8f12b63d1f3b80/node_modules/@base-ui/utils/isElementDisabled.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function isElementDisabled(element) {
	return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/root/TabsRootContext.mjs
/**
* @internal
*/
var TabsRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useTabsRootContext() {
	const context = import_react.useContext(TabsRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(64));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/root/TabsRootDataAttributes.mjs
/**
* Indicates the direction of the activation (based on the previous active tab).
* @type {'left' | 'right' | 'up' | 'down' | 'none'}
*/
var activationDirection = "data-activation-direction";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/root/stateAttributesMapping.mjs
var tabsStateAttributesMapping = { tabActivationDirection: (dir) => ({ [activationDirection]: dir }) };
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/root/TabsRoot.mjs
/**
* Groups the tabs and the corresponding panels.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsRoot = /*#__PURE__*/ import_react.forwardRef(function TabsRoot(componentProps, forwardedRef) {
	const { className, defaultValue: defaultValueProp = 0, onValueChange: onValueChangeProp, orientation = "horizontal", render, value: valueProp, style, ...elementProps } = componentProps;
	const hasExplicitDefaultValueProp = componentProps.defaultValue !== void 0;
	const tabPanelRefs = import_react.useRef([]);
	const [mountedTabPanels, setMountedTabPanels] = import_react.useState(() => /* @__PURE__ */ new Map());
	const [value, setValue] = useControlled({
		controlled: valueProp,
		default: defaultValueProp,
		name: "Tabs",
		state: "value"
	});
	const isControlled = valueProp !== void 0;
	const [tabMap, setTabMap] = import_react.useState(() => /* @__PURE__ */ new Map());
	const lastKnownTabElementRef = import_react.useRef(void 0);
	const getTabElementBySelectedValue = import_react.useCallback((selectedValue) => findTabElement(tabMap, selectedValue), [tabMap]);
	const [activationDirectionState, setActivationDirectionState] = import_react.useState(() => ({
		previousValue: value,
		tabActivationDirection: "none"
	}));
	const { previousValue, tabActivationDirection: committedTabActivationDirection } = activationDirectionState;
	let tabActivationDirection = committedTabActivationDirection;
	let directionComputationIncomplete = false;
	if (previousValue !== value) {
		tabActivationDirection = computeActivationDirection(previousValue, value, orientation, tabMap);
		directionComputationIncomplete = previousValue != null && value != null && getTabElementBySelectedValue(value) == null;
	}
	const nextPreviousValue = directionComputationIncomplete ? previousValue : value;
	const shouldSyncActivationDirectionState = previousValue !== nextPreviousValue || committedTabActivationDirection !== tabActivationDirection;
	useIsoLayoutEffect(() => {
		if (!shouldSyncActivationDirectionState) return;
		setActivationDirectionState({
			previousValue: nextPreviousValue,
			tabActivationDirection
		});
	}, [
		nextPreviousValue,
		shouldSyncActivationDirectionState,
		tabActivationDirection
	]);
	const onValueChange = useStableCallback((newValue, eventDetails) => {
		eventDetails.activationDirection = computeActivationDirection(value, newValue, orientation, tabMap);
		onValueChangeProp?.(newValue, eventDetails);
		if (eventDetails.isCanceled) return;
		setValue(() => newValue);
	});
	const notifyAutomaticValueChange = useStableCallback((nextValue, reason) => {
		onValueChangeProp?.(nextValue, createChangeEventDetails(reason, void 0, void 0, { activationDirection: "none" }));
	});
	const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
		setMountedTabPanels((prev) => {
			const next = new Map(prev);
			next.set(panelValue, panelId);
			return next;
		});
		return () => {
			setMountedTabPanels((prev) => {
				if (prev.get(panelValue) !== panelId) return prev;
				const next = new Map(prev);
				next.delete(panelValue);
				return next;
			});
		};
	});
	const getTabPanelIdByValue = import_react.useCallback((tabValue) => {
		return mountedTabPanels.get(tabValue);
	}, [mountedTabPanels]);
	const getTabIdByPanelValue = import_react.useCallback((tabPanelValue) => {
		for (const tabMetadata of tabMap.values()) if (tabPanelValue === tabMetadata.value) return tabMetadata.id;
	}, [tabMap]);
	const tabsContextValue = import_react.useMemo(() => ({
		getTabElementBySelectedValue,
		getTabIdByPanelValue,
		getTabPanelIdByValue,
		onValueChange,
		orientation,
		registerMountedTabPanel,
		setTabMap,
		tabActivationDirection,
		value
	}), [
		getTabElementBySelectedValue,
		getTabIdByPanelValue,
		getTabPanelIdByValue,
		onValueChange,
		orientation,
		registerMountedTabPanel,
		setTabMap,
		tabActivationDirection,
		value
	]);
	const selectedTabMetadata = import_react.useMemo(() => {
		for (const tabMetadata of tabMap.values()) if (tabMetadata.value === value) return tabMetadata;
	}, [tabMap, value]);
	const firstEnabledTabValue = import_react.useMemo(() => {
		for (const tabMetadata of tabMap.values()) if (!tabMetadata.disabled) return tabMetadata.value;
	}, [tabMap]);
	const shouldNotifyInitialValueChangeRef = import_react.useRef(!hasExplicitDefaultValueProp);
	const initialDefaultValueRef = import_react.useRef(defaultValueProp);
	const shouldHonorDisabledDefaultValueRef = import_react.useRef(hasExplicitDefaultValueProp);
	const didRegisterTabsRef = import_react.useRef(false);
	useIsoLayoutEffect(() => {
		if (isControlled) return;
		function commitAutomaticValueChange(fallbackValue, fallbackReason) {
			setValue(() => fallbackValue);
			setActivationDirectionState({
				previousValue: fallbackValue,
				tabActivationDirection: "none"
			});
			notifyAutomaticValueChange(fallbackValue, fallbackReason);
			shouldNotifyInitialValueChangeRef.current = false;
		}
		if (tabMap.size === 0) {
			if (didRegisterTabsRef.current && value !== null && !lastKnownTabElementRef.current?.isConnected) commitAutomaticValueChange(null, missing);
			return;
		}
		didRegisterTabsRef.current = true;
		lastKnownTabElementRef.current = tabMap.keys().next().value;
		const selectionIsDisabled = selectedTabMetadata?.disabled;
		const selectionIsMissing = selectedTabMetadata == null && value !== null;
		if (!selectionIsDisabled && value === initialDefaultValueRef.current) shouldHonorDisabledDefaultValueRef.current = false;
		if (shouldHonorDisabledDefaultValueRef.current && selectionIsDisabled && value === initialDefaultValueRef.current) return;
		const shouldNotifyInitialValueChange = shouldNotifyInitialValueChangeRef.current;
		if (selectionIsDisabled || selectionIsMissing) {
			const fallbackValue = firstEnabledTabValue ?? null;
			if (value === fallbackValue) {
				shouldNotifyInitialValueChangeRef.current = false;
				return;
			}
			let fallbackReason = missing;
			if (shouldNotifyInitialValueChange) fallbackReason = initial;
			else if (selectionIsDisabled) fallbackReason = disabled;
			commitAutomaticValueChange(fallbackValue, fallbackReason);
			return;
		}
		if (shouldNotifyInitialValueChange && selectedTabMetadata != null) {
			notifyAutomaticValueChange(value, initial);
			shouldNotifyInitialValueChangeRef.current = false;
		}
	}, [
		firstEnabledTabValue,
		isControlled,
		notifyAutomaticValueChange,
		selectedTabMetadata,
		setValue,
		tabMap,
		value
	]);
	const element = useRenderElement("div", componentProps, {
		state: {
			orientation,
			tabActivationDirection
		},
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: tabsStateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TabsRootContext.Provider, {
		value: tabsContextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef: tabPanelRefs,
			children: element
		})
	});
});
function findTabElement(tabMap, value) {
	for (const [tabElement, tabMetadata] of tabMap.entries()) if (value === tabMetadata.value) return tabElement;
	return null;
}
function computeActivationDirection(oldValue, newValue, orientation, tabMap) {
	if (oldValue == null || newValue == null) return "none";
	const [positionProp, backward, forward] = orientation === "horizontal" ? [
		"left",
		"left",
		"right"
	] : [
		"top",
		"up",
		"down"
	];
	const oldTab = findTabElement(tabMap, oldValue);
	const newTab = findTabElement(tabMap, newValue);
	if (oldTab == null || newTab == null) {
		if (oldTab !== newTab && (typeof oldValue === "number" || typeof oldValue === "string") && typeof oldValue === typeof newValue) return newValue > oldValue ? forward : backward;
		return "none";
	}
	const oldPosition = oldTab.getBoundingClientRect()[positionProp];
	const newPosition = newTab.getBoundingClientRect()[positionProp];
	if (newPosition < oldPosition) return backward;
	if (newPosition > oldPosition) return forward;
	return "none";
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/composite/constants.mjs
var ACTIVE_COMPOSITE_ITEM = "data-composite-item-active";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/list/TabsListContext.mjs
var TabsListContext = /*#__PURE__*/ import_react.createContext(void 0);
function useTabsListContext() {
	const context = import_react.useContext(TabsListContext);
	if (context === void 0) throw new Error(formatErrorMessage(65));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/tab/TabsTab.mjs
/**
* An individual interactive tab button that toggles the corresponding panel.
* Renders a `<button>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsTab = /*#__PURE__*/ import_react.forwardRef(function TabsTab(componentProps, forwardedRef) {
	const { className, disabled = false, render, value, id: idProp, nativeButton = true, style, ...elementProps } = componentProps;
	const { value: activeTabValue, getTabPanelIdByValue, onValueChange, orientation, tabActivationDirection } = useTabsRootContext();
	const { activateOnFocus, registerTabResizeObserverElement, tabsListElement } = useTabsListContext();
	const { highlightedIndex, onHighlightedIndexChange } = useCompositeRootContext();
	const id = useBaseUiId(idProp);
	const tabMetadata = import_react.useMemo(() => ({
		disabled,
		id,
		value
	}), [
		disabled,
		id,
		value
	]);
	const { compositeProps, compositeRef, index } = useCompositeItem({ metadata: tabMetadata });
	const active = value === activeTabValue;
	const isNavigatingRef = import_react.useRef(false);
	const unobserveTabElementRef = import_react.useRef(null);
	const observeTabElement = useStableCallback((element) => {
		unobserveTabElementRef.current?.();
		unobserveTabElementRef.current = element ? registerTabResizeObserverElement(element) : null;
	});
	useIsoLayoutEffect(() => {
		if (isNavigatingRef.current) {
			isNavigatingRef.current = false;
			return;
		}
		if (!(active && index > -1 && highlightedIndex !== index)) return;
		const listElement = tabsListElement;
		if (listElement != null) {
			const activeEl = activeElement(ownerDocument(listElement));
			if (activeEl && contains(listElement, activeEl)) return;
		}
		if (!disabled) onHighlightedIndexChange(index);
	}, [
		active,
		index,
		highlightedIndex,
		onHighlightedIndexChange,
		disabled,
		tabsListElement
	]);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton,
		focusableWhenDisabled: true
	});
	const tabPanelId = getTabPanelIdByValue(value);
	const isPressingRef = import_react.useRef(false);
	const isMainButtonRef = import_react.useRef(false);
	function activate(event) {
		onValueChange(value, createChangeEventDetails(none, event.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function onClick(event) {
		if (active || disabled) return;
		activate(event);
	}
	function onFocus(event) {
		if (active || disabled) return;
		if (activateOnFocus && (!isPressingRef.current || isMainButtonRef.current)) activate(event);
	}
	function onPointerDown(event) {
		if (active || disabled) return;
		isPressingRef.current = true;
		isMainButtonRef.current = event.button === 0;
		const doc = ownerDocument(event.currentTarget);
		function handlePointerEnd() {
			isPressingRef.current = false;
			isMainButtonRef.current = false;
			doc.removeEventListener("pointerup", handlePointerEnd);
			doc.removeEventListener("pointercancel", handlePointerEnd);
		}
		doc.addEventListener("pointerup", handlePointerEnd);
		doc.addEventListener("pointercancel", handlePointerEnd);
	}
	return useRenderElement("button", componentProps, {
		state: {
			disabled,
			active,
			orientation,
			tabActivationDirection
		},
		ref: [
			forwardedRef,
			buttonRef,
			compositeRef,
			observeTabElement
		],
		props: [
			compositeProps,
			{
				role: "tab",
				"aria-controls": tabPanelId,
				"aria-selected": active,
				id,
				onClick,
				onFocus,
				onPointerDown,
				[ACTIVE_COMPOSITE_ITEM]: active ? "" : void 0,
				onKeyDownCapture() {
					isNavigatingRef.current = true;
				}
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping: tabsStateAttributesMapping
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/composite/root/useCompositeRoot.mjs
function useCompositeRoot(params) {
	const { loopFocus = true, orientation = "both", grid, onLoop, direction, highlightedIndex: externalHighlightedIndex, onHighlightedIndexChange: externalSetHighlightedIndex, rootRef: externalRef, enableHomeAndEndKeys = false, stopEventPropagation, disabledIndices, modifierKeys = EMPTY_ARRAY } = params;
	const [internalHighlightedIndex, internalSetHighlightedIndex] = import_react.useState(0);
	const isGrid = grid != null;
	const rootRef = import_react.useRef(null);
	const mergedRef = useMergedRefs(rootRef, externalRef);
	const elementsRef = import_react.useRef([]);
	const hasSetDefaultIndexRef = import_react.useRef(false);
	const highlightedElementRef = import_react.useRef(null);
	const highlightedIndex = externalHighlightedIndex ?? internalHighlightedIndex;
	const onHighlightedIndexChange = useStableCallback((index, shouldScrollIntoView = false) => {
		highlightedElementRef.current = elementsRef.current[index] ?? null;
		(externalSetHighlightedIndex ?? internalSetHighlightedIndex)(index);
		if (shouldScrollIntoView) {
			const newActiveItem = elementsRef.current[index];
			scrollIntoViewIfNeeded(rootRef.current, newActiveItem, direction, orientation);
		}
	});
	const onMapChange = useStableCallback((map) => {
		if (map.size === 0) return;
		if (hasSetDefaultIndexRef.current) {
			const elements = elementsRef.current;
			const nextIndex = elements.indexOf(highlightedElementRef.current);
			if (nextIndex === -1) {
				const replacement = elements[highlightedIndex];
				if (!replacement || isListIndexDisabled(elements, highlightedIndex, disabledIndices)) onHighlightedIndexChange(getFallbackIndex(elements, disabledIndices));
				else highlightedElementRef.current = replacement;
			} else if (nextIndex !== highlightedIndex) onHighlightedIndexChange(nextIndex);
			return;
		}
		hasSetDefaultIndexRef.current = true;
		const sortedElements = Array.from(map.keys());
		const activeItem = sortedElements.find((compositeElement) => compositeElement?.hasAttribute("data-composite-item-active")) ?? null;
		const activeIndex = activeItem ? map.get(activeItem)?.index ?? -1 : -1;
		if (activeIndex !== -1) onHighlightedIndexChange(activeIndex);
		else if (isListIndexDisabled(sortedElements, highlightedIndex, disabledIndices)) {
			const firstEnabledIndex = findNonDisabledListIndex(sortedElements, { disabledIndices });
			if (!isIndexOutOfListBounds(sortedElements, firstEnabledIndex)) onHighlightedIndexChange(firstEnabledIndex);
		}
		scrollIntoViewIfNeeded(rootRef.current, activeItem, direction, orientation);
	});
	useIsoLayoutEffect(() => {
		if (disabledIndices == null || externalHighlightedIndex != null || !hasSetDefaultIndexRef.current) return;
		const elements = elementsRef.current;
		if (isListIndexDisabled(elements, highlightedIndex, disabledIndices)) {
			const firstEnabledIndex = findNonDisabledListIndex(elements, { disabledIndices });
			if (!isIndexOutOfListBounds(elements, firstEnabledIndex)) onHighlightedIndexChange(firstEnabledIndex);
		}
	}, [
		disabledIndices,
		externalHighlightedIndex,
		highlightedIndex,
		elementsRef,
		onHighlightedIndexChange
	]);
	const wrappedOnLoop = useStableCallback((event, prevIndex, nextIndex) => {
		if (!onLoop) return nextIndex;
		return onLoop(event, prevIndex, nextIndex, elementsRef);
	});
	const onKeyDown = useStableCallback((event) => {
		const isHomeOrEnd = event.key === "Home" || event.key === "End";
		if (!COMPOSITE_KEYS.has(event.key) || !enableHomeAndEndKeys && isHomeOrEnd) return;
		if (isModifierKeySet(event, modifierKeys)) return;
		if (!rootRef.current) return;
		const isRtl = direction === "rtl";
		const horizontalForwardKey = isRtl ? ARROW_LEFT : ARROW_RIGHT;
		const horizontalBackwardKey = isRtl ? ARROW_RIGHT : ARROW_LEFT;
		const forwardKey = orientation === "vertical" ? ARROW_DOWN : horizontalForwardKey;
		const backwardKey = orientation === "vertical" ? ARROW_UP : horizontalBackwardKey;
		const target = getTarget(event.nativeEvent);
		if (target != null && isNativeInput(target) && !isElementDisabled(target)) {
			const selectionStart = target.selectionStart;
			const selectionEnd = target.selectionEnd;
			const textContent = target.value;
			if (selectionStart == null || event.shiftKey || selectionStart !== selectionEnd) return;
			if (event.key !== backwardKey && selectionStart < textContent.length) return;
			if (event.key !== forwardKey && selectionStart > 0) return;
		}
		let nextIndex = highlightedIndex;
		const minIndex = getMinListIndex(elementsRef, disabledIndices);
		const maxIndex = getMaxListIndex(elementsRef, disabledIndices);
		if (grid != null) nextIndex = grid({
			disabledIndices,
			elementsRef,
			event,
			highlightedIndex,
			loopFocus,
			maxIndex,
			minIndex,
			onLoop: wrappedOnLoop,
			orientation,
			rtl: isRtl
		});
		const isForwardKey = orientation !== "vertical" && event.key === horizontalForwardKey || orientation !== "horizontal" && event.key === "ArrowDown";
		const isBackwardKey = orientation !== "vertical" && event.key === horizontalBackwardKey || orientation !== "horizontal" && event.key === "ArrowUp";
		if (enableHomeAndEndKeys) {
			if (event.key === "Home") nextIndex = minIndex;
			else if (event.key === "End") nextIndex = maxIndex;
		}
		if (nextIndex === highlightedIndex && (isForwardKey || isBackwardKey)) {
			if (loopFocus && nextIndex === maxIndex && isForwardKey) {
				nextIndex = minIndex;
				if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
			} else if (loopFocus && nextIndex === minIndex && isBackwardKey) {
				nextIndex = maxIndex;
				if (onLoop) nextIndex = onLoop(event, highlightedIndex, nextIndex, elementsRef);
			} else nextIndex = findNonDisabledListIndex(elementsRef.current, {
				startingIndex: nextIndex,
				decrement: isBackwardKey,
				disabledIndices
			});
		}
		if (nextIndex !== highlightedIndex && !isIndexOutOfListBounds(elementsRef.current, nextIndex)) {
			if (stopEventPropagation) event.stopPropagation();
			if (isGrid || isHomeOrEnd || isForwardKey || isBackwardKey) event.preventDefault();
			onHighlightedIndexChange(nextIndex, true);
			queueMicrotask(() => {
				elementsRef.current[nextIndex]?.focus();
			});
		}
	});
	return {
		props: {
			ref: mergedRef,
			onFocus(event) {
				const element = rootRef.current;
				const target = getTarget(event.nativeEvent);
				if (!element || target == null || !isNativeInput(target)) return;
				target.setSelectionRange(0, target.value.length);
			},
			onKeyDown
		},
		highlightedIndex,
		onHighlightedIndexChange,
		elementsRef,
		onMapChange,
		relayKeyboardEvent: onKeyDown
	};
}
function getFallbackIndex(elements, disabledIndices) {
	let fallbackIndex = -1;
	for (let index = 0; index < elements.length; index += 1) {
		const element = elements[index];
		if (!element || isListIndexDisabled(elements, index, disabledIndices)) continue;
		if (element.hasAttribute("data-composite-item-active")) return index;
		if (fallbackIndex === -1) fallbackIndex = index;
	}
	return Math.max(fallbackIndex, 0);
}
function isModifierKeySet(event, ignoredModifierKeys) {
	for (const key of MODIFIER_KEYS) {
		if (ignoredModifierKeys.includes(key)) continue;
		if (event.getModifierState(key)) return true;
	}
	return false;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/composite/root/CompositeRoot.mjs
function CompositeRoot(componentProps) {
	const { render, className, style, refs = EMPTY_ARRAY, props = EMPTY_ARRAY, state = EMPTY_OBJECT, stateAttributesMapping, highlightedIndex: highlightedIndexProp, onHighlightedIndexChange: onHighlightedIndexChangeProp, orientation, grid, loopFocus, onLoop, enableHomeAndEndKeys, onMapChange: onMapChangeProp, stopEventPropagation = true, rootRef, disabledIndices, modifierKeys, highlightItemOnHover = false, tag = "div", ...elementProps } = componentProps;
	const { props: defaultProps, highlightedIndex, onHighlightedIndexChange, elementsRef, onMapChange: onMapChangeUnwrapped, relayKeyboardEvent } = useCompositeRoot({
		grid,
		loopFocus,
		onLoop,
		orientation,
		highlightedIndex: highlightedIndexProp,
		onHighlightedIndexChange: onHighlightedIndexChangeProp,
		rootRef,
		stopEventPropagation,
		enableHomeAndEndKeys,
		direction: useDirection(),
		disabledIndices,
		modifierKeys
	});
	const element = useRenderElement(tag, componentProps, {
		state,
		ref: refs,
		props: [
			defaultProps,
			...props,
			elementProps
		],
		stateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({
		highlightedIndex,
		onHighlightedIndexChange,
		highlightItemOnHover,
		relayKeyboardEvent
	}), [
		highlightedIndex,
		onHighlightedIndexChange,
		highlightItemOnHover,
		relayKeyboardEvent
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeRootContext.Provider, {
		value: contextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeList, {
			elementsRef,
			onMapChange: (newMap) => {
				onMapChangeProp?.(newMap);
				onMapChangeUnwrapped(newMap);
			},
			children: element
		})
	});
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/tabs/list/TabsList.mjs
/**
* Groups the individual tab buttons.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
*/
var TabsList = /*#__PURE__*/ import_react.forwardRef(function TabsList(componentProps, forwardedRef) {
	const { activateOnFocus = false, className, loopFocus = true, render, style, ...elementProps } = componentProps;
	const { orientation, setTabMap, tabActivationDirection } = useTabsRootContext();
	const [highlightedTabIndex, setHighlightedTabIndex] = import_react.useState(0);
	const [tabsListElement, setTabsListElement] = import_react.useState(null);
	const indicatorUpdateListenersRef = import_react.useRef(/* @__PURE__ */ new Set());
	const tabResizeObserverElementsRef = import_react.useRef(/* @__PURE__ */ new Set());
	const resizeObserverRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (typeof ResizeObserver === "undefined") return;
		const resizeObserver = new ResizeObserver(() => {
			indicatorUpdateListenersRef.current.forEach((listener) => {
				listener();
			});
		});
		resizeObserverRef.current = resizeObserver;
		if (tabsListElement) resizeObserver.observe(tabsListElement);
		tabResizeObserverElementsRef.current.forEach((element) => {
			resizeObserver.observe(element);
		});
		return () => {
			resizeObserver.disconnect();
			resizeObserverRef.current = null;
		};
	}, [tabsListElement]);
	const registerIndicatorUpdateListener = useStableCallback((listener) => {
		indicatorUpdateListenersRef.current.add(listener);
		return () => {
			indicatorUpdateListenersRef.current.delete(listener);
		};
	});
	const registerTabResizeObserverElement = useStableCallback((element) => {
		tabResizeObserverElementsRef.current.add(element);
		resizeObserverRef.current?.observe(element);
		return () => {
			tabResizeObserverElementsRef.current.delete(element);
			resizeObserverRef.current?.unobserve(element);
		};
	});
	const state = {
		orientation,
		tabActivationDirection
	};
	const defaultProps = {
		"aria-orientation": orientation === "vertical" ? "vertical" : void 0,
		role: "tablist"
	};
	const tabsListContextValue = import_react.useMemo(() => ({
		activateOnFocus,
		registerIndicatorUpdateListener,
		registerTabResizeObserverElement,
		tabsListElement
	}), [
		activateOnFocus,
		registerIndicatorUpdateListener,
		registerTabResizeObserverElement,
		tabsListElement
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TabsListContext.Provider, {
		value: tabsListContextValue,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(CompositeRoot, {
			render,
			className,
			style,
			state,
			refs: [forwardedRef, setTabsListElement],
			props: [defaultProps, elementProps],
			stateAttributesMapping: tabsStateAttributesMapping,
			highlightedIndex: highlightedTabIndex,
			enableHomeAndEndKeys: true,
			loopFocus,
			orientation,
			onHighlightedIndexChange: setHighlightedTabIndex,
			onMapChange: setTabMap,
			disabledIndices: EMPTY_ARRAY
		})
	});
});
export { TabsList, TabsRoot, TabsTab };

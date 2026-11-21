import { __toESM } from "../_runtime.mjs";
import { require_react, require_react_dom } from "./@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "./react.mjs";
import { NOOP, Timeout, formatErrorMessage, isHTMLElement, useButton, useIsoLayoutEffect, useRenderElement, useStableCallback, useTimeout } from "./@base-ui/react+[2...].mjs";
import { CLICK_TRIGGER_IDENTIFIER, COMPOSITE_KEYS, FOCUSABLE_POPUP_PROPS, FloatingFocusManager, FloatingNode, FloatingPortal, FloatingTree, FocusGuard, InternalBackdrop, POPUP_COLLISION_AVOIDANCE, PopupHandleAttachment, PopupTriggerMap, ReactStore, addEventListener, attachPreventUnmountOnClose, contains, createDefaultInitialFocus, createInitialPopupStoreState, createPopupOpenState, fastComponent, fastComponentRef, getDisabledMountTransitionStyles, getFiniteAnimations, getTarget, inertValue, popupStoreSelectors, popupTransitionStateMapping, pressableTriggerOpenStateMapping, safePolygon, transitionStatusMapping, triggerOpenStateMapping, useAnchorPositioning, useAnchoredPopupScrollLock, useClick, useDirection, useDismiss, useFloatingNodeId, useHoverFloatingInteraction, useHoverReferenceInteraction, useImplicitActiveTrigger, useOpenChangeComplete, useOpenMethodTriggerProps, useOpenStateTransitions, usePopupHandleStore, usePopupInteractionProps, usePopupRootStore, usePopupRootSync, usePositioner, useToolbarRootContext, useTransitionStatus, useTriggerDataForwarding, useTriggerFocusGuards, useTriggerSwitchTransition, webkit } from "./@base-ui/react+[3...].mjs";
import { createChangeEventDetails, imperativeAction, triggerHover, useBaseUiId } from "./base-ui__react+base-ui__utils.mjs";
import { clamp } from "./base-ui__utils2.mjs";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/root/PopoverRootContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var PopoverRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function usePopoverRootContext(optional) {
	const context = import_react.useContext(PopoverRootContext);
	if (context === void 0 && !optional) throw new Error(formatErrorMessage(47));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/store/PopoverStore.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var selectors = {
	...popupStoreSelectors,
	disabled: (state) => state.disabled,
	instantType: (state) => state.instantType === "trigger-change" && !popupStoreSelectors.open(state) ? void 0 : state.instantType,
	openMethod: (state) => state.openMethod,
	openChangeReason: (state) => state.openChangeReason,
	isPressOpenedByTrigger: (state, triggerId) => state.openChangeReason === "trigger-press" && popupStoreSelectors.isOpenedByTrigger(state, triggerId),
	isTouchPressOpen: (state, openOnHover) => openOnHover && state.openMethod === "touch" && state.openChangeReason === "trigger-press",
	hasTriggerFocusGuards: (state, triggerId) => popupStoreSelectors.isOpenedByTrigger(state, triggerId) && !state.focusManagerModal,
	modal: (state) => state.modal,
	titleElementId: (state) => state.titleElementId,
	descriptionElementId: (state) => state.descriptionElementId,
	openOnHover: (state) => state.openOnHover,
	closeDelay: (state) => state.closeDelay,
	adaptiveOrigin: (state) => state.adaptiveOrigin
};
/**
* The store view that detached handle-backed triggers read from. Both the real `PopoverStore` and
* the inert fallback store satisfy it, so a trigger can read from whichever store the handle
* currently exposes. Narrowed to the members a trigger actually uses — the trigger-data members plus
* `setOpen` (called by the focus guards) — so the exposed surface can't bypass the open-change
* pipeline; on the detached fallback store every one of these mutations is a no-op.
*/
var PopoverStore = class extends ReactStore {
	constructor(initialState, floatingId, nested) {
		const triggerElements = new PopupTriggerMap();
		super(createInitialState(initialState, triggerElements, floatingId, nested), createInitialContext(triggerElements), selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		const isHover = eventDetails.reason === triggerHover;
		const isKeyboardClick = eventDetails.reason === "trigger-press" && eventDetails.event.detail === 0;
		const isDismissClose = !nextOpen && (eventDetails.reason === "escape-key" || eventDetails.reason == null);
		const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails);
		const activeTriggerId = this.select("activeTriggerId");
		if (!nextOpen && eventDetails.reason === "close-press" && eventDetails.trigger == null && activeTriggerId != null) eventDetails.trigger = this.context.triggerElements.getById(activeTriggerId) ?? this.select("activeTriggerElement") ?? void 0;
		this.context.onOpenChange?.(nextOpen, eventDetails);
		if (eventDetails.isCanceled) return;
		this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
		const changeState = () => {
			const popupOpenState = createPopupOpenState(this.state, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
			popupOpenState.openChangeReason = eventDetails.reason;
			this.update(popupOpenState);
		};
		if (isHover) {
			this.context.stickIfOpen = true;
			this.context.stickIfOpenTimeout.start(500, () => {
				this.context.stickIfOpen = false;
			});
			import_react_dom.flushSync(changeState);
		} else changeState();
		let instantType;
		if (isKeyboardClick) instantType = "click";
		else if (isDismissClose) instantType = "dismiss";
		else if (eventDetails.reason === "focus-out") instantType = "focus";
		this.set("instantType", instantType);
	};
};
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
	const state = {
		...createInitialPopupStoreState(triggerElements, floatingId, nested),
		disabled: false,
		modal: false,
		focusManagerModal: false,
		instantType: void 0,
		openMethod: null,
		openChangeReason: null,
		titleElementId: void 0,
		descriptionElementId: void 0,
		openOnHover: false,
		closeDelay: 0,
		adaptiveOrigin: void 0,
		...initialState
	};
	if (state.open && initialState?.mounted === void 0) state.mounted = true;
	return state;
}
function createInitialContext(triggerElements) {
	return {
		popupRef: /*#__PURE__*/ import_react.createRef(),
		onOpenChange: void 0,
		onOpenChangeComplete: void 0,
		triggerFocusTargetRef: /*#__PURE__*/ import_react.createRef(),
		beforeTriggerFocusGuardRef: /*#__PURE__*/ import_react.createRef(),
		beforeContentFocusGuardRef: /*#__PURE__*/ import_react.createRef(),
		stickIfOpenTimeout: new Timeout(),
		stickIfOpen: true,
		triggerElements
	};
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/root/PopoverRoot.mjs
var import_jsx_runtime = require_jsx_runtime();
var PopoverRootComponent = fastComponent(function PopoverRootComponent({ props }) {
	const { children, open: openProp, defaultOpen = false, onOpenChange, onOpenChangeComplete, modal = false, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null } = props;
	const store = usePopoverRootStore(handle, {
		modal,
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	});
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const payload = store.useState("payload");
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	usePopupRootSync(store, open);
	useImplicitActiveTrigger(store);
	const { forceUnmount } = useOpenStateTransitions(open, store, () => {
		store.context.stickIfOpen = true;
		store.set("openChangeReason", null);
	});
	store.useSyncedValues({ modal });
	import_react.useEffect(() => {
		if (!open) store.context.stickIfOpenTimeout.clear();
	}, [store, open]);
	import_react.useImperativeHandle(props.actionsRef, () => ({
		unmount: forceUnmount,
		close: () => store.setOpen(false, createChangeEventDetails(imperativeAction))
	}), [forceUnmount, store]);
	const shouldRenderInteractions = open || mounted || handle != null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PopoverRootContext.Provider, {
		value: store,
		children: [
			handle && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopupHandleAttachment, {
				handle,
				store
			}),
			shouldRenderInteractions && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverInteractions, {
				store,
				modal
			}),
			typeof children === "function" ? children({ payload }) : children
		]
	});
});
function PopoverRoot(props) {
	if (usePopoverRootContext(true)) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props });
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingTree, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverRootComponent, { props }) });
}
function usePopoverRootStore(handle, initialState) {
	const store = usePopupRootStore((floatingId, nested) => new PopoverStore(initialState, floatingId, nested));
	import_react.useEffect(() => store.context.stickIfOpenTimeout.disposeEffect(), [store]);
	return store;
}
function PopoverInteractions({ store, modal }) {
	const floatingRootContext = store.useState("floatingRootContext");
	const dismiss = useDismiss(floatingRootContext, { outsidePressEvent: {
		mouse: modal === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} });
	const triggerProps = dismiss.reference;
	const popupProps = dismiss.floating;
	usePopupInteractionProps(store, {
		activeTriggerProps: triggerProps,
		inactiveTriggerProps: triggerProps,
		popupProps
	});
	return null;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/trigger/PopoverTrigger.mjs
/**
* A button that opens the popover.
* Renders a `<button>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverTrigger = fastComponentRef(function PopoverTrigger(componentProps, forwardedRef) {
	const { render, className, style, disabled = false, nativeButton = true, handle, payload, openOnHover = false, delay = 300, closeDelay = 0, id: idProp, ...elementProps } = componentProps;
	const rootStore = usePopoverRootContext(true);
	const store = usePopupHandleStore(handle) ?? rootStore;
	if (!store) throw new Error(formatErrorMessage(74));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const floatingContext = store.useState("floatingRootContext");
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const popupId = store.useState("triggerPopupId", thisTriggerId);
	const triggerElementRef = import_react.useRef(null);
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		disabled,
		openOnHover,
		closeDelay
	});
	const isPressOpenedByThisTrigger = store.useState("isPressOpenedByTrigger", thisTriggerId);
	const isTouchPressOpen = store.useState("isTouchPressOpen", openOnHover);
	const hasFocusGuards = store.useState("hasTriggerFocusGuards", thisTriggerId);
	const hoverProps = useHoverReferenceInteraction(floatingContext, {
		enabled: !disabled && openOnHover && !isTouchPressOpen,
		mouseOnly: true,
		move: false,
		handleClose: safePolygon(),
		restMs: delay,
		delay: { close: closeDelay },
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending"
	});
	const getStickIfOpen = useStableCallback(() => store.context.stickIfOpen);
	const click = useClick(floatingContext, { stickIfOpen: getStickIfOpen });
	const interactionTypeProps = useOpenMethodTriggerProps(() => store.select("open"), (interactionType) => {
		store.set("openMethod", interactionType);
	});
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		native: nativeButton
	});
	const stateAttributesMapping = { open(value) {
		if (isPressOpenedByThisTrigger) return pressableTriggerOpenStateMapping.open(value);
		return triggerOpenStateMapping.open(value);
	} };
	const { handlePreFocusGuardFocus, handleFocusTargetFocus } = useTriggerFocusGuards(store, triggerElementRef);
	const element = useRenderElement("button", componentProps, {
		state: {
			disabled,
			open: isOpenedByThisTrigger
		},
		ref: [
			buttonRef,
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			click.reference,
			hoverProps,
			rootTriggerProps,
			interactionTypeProps,
			{
				[CLICK_TRIGGER_IDENTIFIER]: "",
				id: thisTriggerId,
				"aria-haspopup": "dialog",
				"aria-expanded": isOpenedByThisTrigger,
				"aria-controls": popupId
			},
			elementProps,
			getButtonProps
		],
		stateAttributesMapping
	});
	const keyedElement = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: element }, thisTriggerId);
	if (hasFocusGuards) return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: store.context.beforeTriggerFocusGuardRef,
			onFocus: handlePreFocusGuardFocus
		}),
		keyedElement,
		/*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusGuard, {
			ref: store.context.triggerFocusTargetRef,
			onFocus: handleFocusTargetFocus
		})
	] });
	return keyedElement;
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/portal/PopoverPortalContext.mjs
var PopoverPortalContext = /*#__PURE__*/ import_react.createContext(void 0);
function usePopoverPortalContext() {
	const value = import_react.useContext(PopoverPortalContext);
	if (value === void 0) throw new Error(formatErrorMessage(45));
	return value;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/portal/PopoverPortal.mjs
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPortal = /*#__PURE__*/ import_react.forwardRef(function PopoverPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	if (!(usePopoverRootContext().useState("mounted") || keepMounted)) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverPortalContext.Provider, {
		value: keepMounted,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingPortal, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/positioner/PopoverPositionerContext.mjs
var PopoverPositionerContext = /*#__PURE__*/ import_react.createContext(void 0);
function usePopoverPositionerContext() {
	const context = import_react.useContext(PopoverPositionerContext);
	if (!context) throw new Error(formatErrorMessage(46));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/positioner/PopoverPositioner.mjs
/**
* Positions the popover against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPositioner = /*#__PURE__*/ import_react.forwardRef(function PopoverPositioner(componentProps, forwardedRef) {
	const { render, className, style, anchor, positionMethod, side, align, sideOffset, alignOffset, collisionBoundary = "clipping-ancestors", collisionPadding, arrowPadding, sticky, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, ...elementProps } = componentProps;
	const store = usePopoverRootContext();
	const keepMounted = usePopoverPortalContext();
	const nodeId = useFloatingNodeId();
	const floatingRootContext = store.useState("floatingRootContext");
	const mounted = store.useState("mounted");
	const open = store.useState("open");
	const openReason = store.useState("openChangeReason");
	const triggerElement = store.useState("activeTriggerElement");
	const modal = store.useState("modal");
	const openMethod = store.useState("openMethod");
	const positionerElement = store.useState("positionerElement");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const adaptiveOrigin = store.useState("adaptiveOrigin");
	const positioning = useAnchorPositioning({
		anchor,
		floatingRootContext,
		positionMethod,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		arrowPadding,
		collisionBoundary,
		collisionPadding,
		sticky,
		disableAnchorTracking,
		keepMounted,
		nodeId,
		collisionAvoidance,
		adaptiveOrigin
	});
	const domReference = floatingRootContext.useState("domReferenceElement");
	useTriggerSwitchTransition({
		store,
		domReference,
		positionerElement,
		open
	});
	const trueModalNonHover = modal === true && openReason !== "trigger-hover";
	useAnchoredPopupScrollLock(open && trueModalNonHover, openMethod === "touch", positionerElement, triggerElement);
	const setPositionerElement = store.useStateSetter("positionerElement");
	const state = {
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: instantType
	};
	const element = usePositioner(componentProps, state, {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, setPositionerElement],
		hidden: !mounted,
		inert: !open
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(PopoverPositionerContext.Provider, {
		value: positioning,
		children: [mounted && trueModalNonHover && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InternalBackdrop, {
			inert: inertValue(!open),
			cutout: triggerElement
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingNode, {
			id: nodeId,
			children: element
		})]
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/utils/closePart.mjs
var ClosePartContext = /*#__PURE__*/ import_react.createContext(void 0);
function useClosePartCount() {
	const [closePartCount, setClosePartCount] = import_react.useState(0);
	const register = useStableCallback(() => {
		setClosePartCount((count) => count + 1);
		return () => {
			setClosePartCount((count) => Math.max(0, count - 1));
		};
	});
	return {
		context: import_react.useMemo(() => ({ register }), [register]),
		hasClosePart: closePartCount > 0
	};
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/popover/popup/PopoverPopup.mjs
/**
* A container for the popover contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
*/
var PopoverPopup = /*#__PURE__*/ import_react.forwardRef(function PopoverPopup(componentProps, forwardedRef) {
	const { render, className, style, initialFocus, finalFocus, ...elementProps } = componentProps;
	const store = usePopoverRootContext();
	const positioner = usePopoverPositionerContext();
	const insideToolbar = useToolbarRootContext(true) != null;
	const { context: closePartContext, hasClosePart } = useClosePartCount();
	const open = store.useState("open");
	const openMethod = store.useState("openMethod");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const titleId = store.useState("titleElementId");
	const descriptionId = store.useState("descriptionElementId");
	const modal = store.useState("modal");
	const mounted = store.useState("mounted");
	const openReason = store.useState("openChangeReason");
	const activeTriggerElement = store.useState("activeTriggerElement");
	const floatingContext = store.useState("floatingRootContext");
	const floatingId = floatingContext.useState("floatingId");
	const disabled = store.useState("disabled");
	const openOnHover = store.useState("openOnHover");
	const closeDelay = store.useState("closeDelay");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	useHoverFloatingInteraction(floatingContext, {
		enabled: openOnHover && !disabled,
		closeDelay
	});
	const resolvedInitialFocus = initialFocus === void 0 ? createDefaultInitialFocus(store.context.popupRef) : initialFocus;
	const focusManagerModal = modal !== false && hasClosePart;
	store.useSyncedValue("focusManagerModal", focusManagerModal);
	const setPopupElement = store.useStateSetter("popupElement");
	const state = {
		open,
		side: positioner.side,
		align: positioner.align,
		instant: instantType,
		transitionStatus
	};
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		props: [
			popupProps,
			{
				id: floatingId,
				role: "dialog",
				...FOCUSABLE_POPUP_PROPS,
				"aria-labelledby": titleId,
				"aria-describedby": descriptionId,
				onKeyDown(event) {
					if (insideToolbar && COMPOSITE_KEYS.has(event.key)) event.stopPropagation();
				}
			},
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping: popupTransitionStateMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FloatingFocusManager, {
		context: floatingContext,
		openInteractionType: openMethod,
		modal: focusManagerModal,
		disabled: !mounted || openReason === "trigger-hover",
		initialFocus: resolvedInitialFocus,
		returnFocus: finalFocus,
		restoreFocus: "popup",
		getInsideElements: () => [store.context.beforeTriggerFocusGuardRef.current],
		previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : void 0,
		nextFocusableElement: store.context.triggerFocusTargetRef,
		beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClosePartContext.Provider, {
			value: closePartContext,
			children: element
		})
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootContext.mjs
var ScrollAreaRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useScrollAreaRootContext() {
	const context = import_react.useContext(ScrollAreaRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(53));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/utils/getOffset.mjs
function getOffset(element, prop, axis) {
	if (!element) return 0;
	const styles = getComputedStyle(element);
	const key = `${prop}${axis === "x" ? "Inline" : "Block"}`;
	const start = parseFloat(styles[`${key}Start`]);
	if (axis === "x" && prop === "margin") return start * 2;
	return start + parseFloat(styles[`${key}End`]);
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/utils/styles.mjs
var DISABLE_SCROLLBAR_CLASS_NAME = "base-ui-disable-scrollbar";
var styleDisableScrollbar = {
	className: DISABLE_SCROLLBAR_CLASS_NAME,
	getElement(nonce) {
		return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("style", {
			nonce,
			href: DISABLE_SCROLLBAR_CLASS_NAME,
			precedence: "base-ui:low",
			children: `.${DISABLE_SCROLLBAR_CLASS_NAME}{scrollbar-width:none}.${DISABLE_SCROLLBAR_CLASS_NAME}::-webkit-scrollbar{display:none}`
		});
	}
};
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootDataAttributes.mjs
/**
* Present when the scroll area content is wider than the viewport.
*/
var hasOverflowX = "data-has-overflow-x";
/**
* Present when the scroll area content is taller than the viewport.
*/
var hasOverflowY = "data-has-overflow-y";
/**
* Present when there is overflow on the horizontal start side.
*/
var overflowXStart = "data-overflow-x-start";
/**
* Present when there is overflow on the horizontal end side.
*/
var overflowXEnd = "data-overflow-x-end";
/**
* Present when there is overflow on the vertical start side.
*/
var overflowYStart = "data-overflow-y-start";
/**
* Present when there is overflow on the vertical end side.
*/
var overflowYEnd = "data-overflow-y-end";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/root/stateAttributes.mjs
var attr = (name) => (value) => value ? { [name]: "" } : null;
var scrollAreaStateAttributesMapping = {
	hasOverflowX: attr(hasOverflowX),
	hasOverflowY: attr(hasOverflowY),
	overflowXStart: attr(overflowXStart),
	overflowXEnd: attr(overflowXEnd),
	overflowYStart: attr(overflowYStart),
	overflowYEnd: attr(overflowYEnd),
	cornerHidden: () => null
};
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/internals/csp-context/CSPContext.mjs
var CSPContext = /*#__PURE__*/ import_react.createContext(void 0);
var DEFAULT_CSP_CONTEXT_VALUE = { disableStyleElements: false };
function useCSPContext() {
	return import_react.useContext(CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRootCssVars.mjs
/**
* The scroll area's corner height.
* @type {number}
*/
var scrollAreaCornerHeight = "--scroll-area-corner-height";
/**
* The scroll area's corner width.
* @type {number}
*/
var scrollAreaCornerWidth = "--scroll-area-corner-width";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.mjs
/**
* Indicates the orientation of the scrollbar.
* @type {'horizontal' | 'vertical'}
*/
var orientation = "data-orientation";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/root/ScrollAreaRoot.mjs
var DEFAULT_COORDS = {
	x: 0,
	y: 0
};
var DEFAULT_SIZE = {
	width: 0,
	height: 0
};
var DEFAULT_OVERFLOW_EDGES = {
	xStart: false,
	xEnd: false,
	yStart: false,
	yEnd: false
};
var DEFAULT_HIDDEN_STATE = {
	x: true,
	y: true,
	corner: true
};
/**
* Groups all parts of the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaRoot = /*#__PURE__*/ import_react.forwardRef(function ScrollAreaRoot(componentProps, forwardedRef) {
	const { render, className, overflowEdgeThreshold: overflowEdgeThresholdProp, style, ...elementProps } = componentProps;
	const { xStart, xEnd, yStart, yEnd } = normalizeOverflowEdgeThreshold(overflowEdgeThresholdProp);
	const rootId = useBaseUiId();
	const scrollYTimeout = useTimeout();
	const scrollXTimeout = useTimeout();
	const { nonce, disableStyleElements } = useCSPContext();
	const [hovering, setHovering] = import_react.useState(false);
	const [scrollingX, setScrollingX] = import_react.useState(false);
	const [scrollingY, setScrollingY] = import_react.useState(false);
	const [touchModality, setTouchModality] = import_react.useState(false);
	const [hasMeasuredScrollbar, setHasMeasuredScrollbar] = import_react.useState(false);
	const [cornerSize, setCornerSize] = import_react.useState(DEFAULT_SIZE);
	const [thumbSize, setThumbSize] = import_react.useState(DEFAULT_SIZE);
	const [overflowEdges, setOverflowEdges] = import_react.useState(DEFAULT_OVERFLOW_EDGES);
	const [hiddenState, setHiddenState] = import_react.useState(DEFAULT_HIDDEN_STATE);
	const rootRef = import_react.useRef(null);
	const viewportRef = import_react.useRef(null);
	const scrollbarYRef = import_react.useRef(null);
	const scrollbarXRef = import_react.useRef(null);
	const thumbYRef = import_react.useRef(null);
	const thumbXRef = import_react.useRef(null);
	const cornerRef = import_react.useRef(null);
	const activePointerIdRef = import_react.useRef(null);
	const startYRef = import_react.useRef(0);
	const startXRef = import_react.useRef(0);
	const startScrollTopRef = import_react.useRef(0);
	const startScrollLeftRef = import_react.useRef(0);
	const currentOrientationRef = import_react.useRef("vertical");
	const scrollPositionRef = import_react.useRef(DEFAULT_COORDS);
	const savedSnapTypeRef = import_react.useRef(null);
	function startScrolling(vertical) {
		const setScrolling = vertical ? setScrollingY : setScrollingX;
		const timeout = vertical ? scrollYTimeout : scrollXTimeout;
		setScrolling(true);
		timeout.start(500, () => {
			setScrolling(false);
		});
	}
	const handleScroll = useStableCallback((scrollPosition) => {
		const offsetX = scrollPosition.x - scrollPositionRef.current.x;
		const offsetY = scrollPosition.y - scrollPositionRef.current.y;
		scrollPositionRef.current = scrollPosition;
		if (offsetY !== 0) startScrolling(true);
		if (offsetX !== 0) startScrolling(false);
	});
	const disableViewportSnap = useStableCallback(() => {
		const viewportEl = viewportRef.current;
		if (viewportEl && savedSnapTypeRef.current === null) {
			savedSnapTypeRef.current = viewportEl.style.scrollSnapType;
			viewportEl.style.scrollSnapType = "none";
		}
	});
	const handlePointerDown = useStableCallback((event) => {
		if (event.button !== 0) return;
		if (activePointerIdRef.current !== null) {
			if ((currentOrientationRef.current === "vertical" ? thumbYRef.current : thumbXRef.current)?.hasPointerCapture(activePointerIdRef.current)) return;
		}
		activePointerIdRef.current = event.pointerId;
		startYRef.current = event.clientY;
		startXRef.current = event.clientX;
		currentOrientationRef.current = event.currentTarget.getAttribute(orientation);
		const viewportEl = viewportRef.current;
		if (viewportEl) {
			startScrollTopRef.current = viewportEl.scrollTop;
			startScrollLeftRef.current = viewportEl.scrollLeft;
			disableViewportSnap();
		}
		(currentOrientationRef.current === "vertical" ? thumbYRef.current : thumbXRef.current)?.setPointerCapture(event.pointerId);
	});
	const handlePointerUp = useStableCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		activePointerIdRef.current = null;
		(currentOrientationRef.current === "vertical" ? setScrollingY : setScrollingX)(false);
		if (savedSnapTypeRef.current !== null) {
			if (viewportRef.current) viewportRef.current.style.scrollSnapType = savedSnapTypeRef.current;
			savedSnapTypeRef.current = null;
		}
		const thumb = currentOrientationRef.current === "vertical" ? thumbYRef.current : thumbXRef.current;
		if (thumb?.hasPointerCapture(event.pointerId)) thumb.releasePointerCapture(event.pointerId);
	});
	const handlePointerMove = useStableCallback((event) => {
		if (event.pointerId !== activePointerIdRef.current) return;
		if (event.buttons % 2 === 0) {
			handlePointerUp(event);
			return;
		}
		const viewportEl = viewportRef.current;
		if (!viewportEl) return;
		const vertical = currentOrientationRef.current === "vertical";
		const thumbEl = vertical ? thumbYRef.current : thumbXRef.current;
		const scrollbarEl = vertical ? scrollbarYRef.current : scrollbarXRef.current;
		if (!thumbEl || !scrollbarEl) return;
		const axis = vertical ? "y" : "x";
		const scrollbarOffset = getOffset(scrollbarEl, "padding", axis);
		const thumbOffset = getOffset(thumbEl, "margin", axis);
		const thumbSizePx = vertical ? thumbEl.offsetHeight : thumbEl.offsetWidth;
		const maxThumbOffset = (vertical ? scrollbarEl.offsetHeight : scrollbarEl.offsetWidth) - thumbSizePx - scrollbarOffset - thumbOffset;
		const delta = vertical ? event.clientY - startYRef.current : event.clientX - startXRef.current;
		const scrollRatio = maxThumbOffset <= 0 ? 0 : delta / maxThumbOffset;
		const scrollableSize = vertical ? viewportEl.scrollHeight : viewportEl.scrollWidth;
		const viewportSize = vertical ? viewportEl.clientHeight : viewportEl.clientWidth;
		const nextScroll = (vertical ? startScrollTopRef.current : startScrollLeftRef.current) + scrollRatio * (scrollableSize - viewportSize);
		if (vertical) viewportEl.scrollTop = nextScroll;
		else viewportEl.scrollLeft = nextScroll;
		event.preventDefault();
		startScrolling(vertical);
	});
	function handleTouchModalityChange(event) {
		setTouchModality(event.pointerType === "touch");
	}
	function handlePointerEnterOrMove(event) {
		handleTouchModalityChange(event);
		if (event.pointerType !== "touch") {
			const isTargetRootChild = contains(rootRef.current, event.target);
			setHovering(isTargetRootChild);
		}
	}
	const state = import_react.useMemo(() => ({
		scrolling: scrollingX || scrollingY,
		hasOverflowX: !hiddenState.x,
		hasOverflowY: !hiddenState.y,
		overflowXStart: overflowEdges.xStart,
		overflowXEnd: overflowEdges.xEnd,
		overflowYStart: overflowEdges.yStart,
		overflowYEnd: overflowEdges.yEnd,
		cornerHidden: hiddenState.corner
	}), [
		scrollingX,
		scrollingY,
		hiddenState.x,
		hiddenState.y,
		hiddenState.corner,
		overflowEdges
	]);
	const props = {
		role: "presentation",
		onPointerEnter: handlePointerEnterOrMove,
		onPointerMove: handlePointerEnterOrMove,
		onPointerDown: handleTouchModalityChange,
		onPointerLeave() {
			setHovering(false);
		},
		style: {
			position: "relative",
			[scrollAreaCornerHeight]: `${cornerSize.height}px`,
			[scrollAreaCornerWidth]: `${cornerSize.width}px`
		}
	};
	const element = useRenderElement("div", componentProps, {
		state,
		ref: [forwardedRef, rootRef],
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handleScroll,
		disableViewportSnap,
		cornerSize,
		setCornerSize,
		thumbSize,
		setThumbSize,
		hasMeasuredScrollbar,
		setHasMeasuredScrollbar,
		touchModality,
		cornerRef,
		scrollingX,
		scrollingY,
		hovering,
		setHovering,
		viewportRef,
		scrollbarYRef,
		scrollbarXRef,
		thumbYRef,
		thumbXRef,
		rootId,
		hiddenState,
		setHiddenState,
		overflowEdges,
		setOverflowEdges,
		viewportState: state,
		overflowEdgeThreshold: {
			xStart,
			xEnd,
			yStart,
			yEnd
		}
	}), [
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handleScroll,
		disableViewportSnap,
		cornerSize,
		thumbSize,
		hasMeasuredScrollbar,
		touchModality,
		scrollingX,
		scrollingY,
		hovering,
		rootId,
		hiddenState,
		overflowEdges,
		state,
		xStart,
		xEnd,
		yStart,
		yEnd
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ScrollAreaRootContext.Provider, {
		value: contextValue,
		children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), element]
	});
});
function normalizeOverflowEdgeThreshold(threshold) {
	const thresholds = typeof threshold === "number" ? {
		xStart: threshold,
		xEnd: threshold,
		yStart: threshold,
		yEnd: threshold
	} : threshold;
	return {
		xStart: Math.max(0, thresholds?.xStart || 0),
		xEnd: Math.max(0, thresholds?.xEnd || 0),
		yStart: Math.max(0, thresholds?.yStart || 0),
		yEnd: Math.max(0, thresholds?.yEnd || 0)
	};
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewportContext.mjs
var ScrollAreaViewportContext = /*#__PURE__*/ import_react.createContext(void 0);
function normalizeScrollOffset(value, max) {
	if (max <= 0) return 0;
	const clamped = clamp(value, 0, max);
	const startDistance = clamped;
	const endDistance = max - clamped;
	const withinStartTolerance = startDistance <= 1;
	const withinEndTolerance = endDistance <= 1;
	if (withinStartTolerance && withinEndTolerance) return startDistance <= endDistance ? 0 : max;
	if (withinStartTolerance) return 0;
	if (withinEndTolerance) return max;
	return clamped;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewportCssVars.mjs
/**
* The distance from the horizontal start edge in pixels.
* @type {number}
*/
var scrollAreaOverflowXStart = "--scroll-area-overflow-x-start";
/**
* The distance from the horizontal end edge in pixels.
* @type {number}
*/
var scrollAreaOverflowXEnd = "--scroll-area-overflow-x-end";
/**
* The distance from the vertical start edge in pixels.
* @type {number}
*/
var scrollAreaOverflowYStart = "--scroll-area-overflow-y-start";
/**
* The distance from the vertical end edge in pixels.
* @type {number}
*/
var scrollAreaOverflowYEnd = "--scroll-area-overflow-y-end";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.mjs
/**
* The scroll area thumb's height.
* @type {number}
*/
var scrollAreaThumbHeight = "--scroll-area-thumb-height";
/**
* The scroll area thumb's width.
* @type {number}
*/
var scrollAreaThumbWidth = "--scroll-area-thumb-width";
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/viewport/ScrollAreaViewport.mjs
var OVERFLOW_EDGE_VARS = [
	scrollAreaOverflowXStart,
	scrollAreaOverflowXEnd,
	scrollAreaOverflowYStart,
	scrollAreaOverflowYEnd
];
var scrollAreaOverflowVarsRegistered = false;
/**
* Removes inheritance of the scroll area overflow CSS variables, which
* improves rendering performance in complex scroll areas with deep subtrees.
* Instead, each child must manually opt-in to using these properties by
* specifying `inherit`.
* See https://motion.dev/blog/web-animation-performance-tier-list
* under the "Improving CSS variable performance" section.
*/
function removeCSSVariableInheritance() {
	if (scrollAreaOverflowVarsRegistered || webkit) return;
	if (typeof CSS !== "undefined" && "registerProperty" in CSS) OVERFLOW_EDGE_VARS.forEach((name) => {
		try {
			CSS.registerProperty({
				name,
				syntax: "<length>",
				inherits: false,
				initialValue: "0px"
			});
		} catch {}
	});
	scrollAreaOverflowVarsRegistered = true;
}
/**
* The actual scrollable container of the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaViewport = /*#__PURE__*/ import_react.forwardRef(function ScrollAreaViewport(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { viewportRef, scrollbarYRef, scrollbarXRef, thumbYRef, thumbXRef, cornerRef, cornerSize, setCornerSize, setThumbSize, rootId, setHiddenState, hiddenState, setHasMeasuredScrollbar, handleScroll, touchModality, setHovering, setOverflowEdges, overflowEdgeThreshold, viewportState } = useScrollAreaRootContext();
	const direction = useDirection();
	const programmaticScrollRef = import_react.useRef(true);
	const lastMeasuredViewportMetricsRef = import_react.useRef([
		NaN,
		NaN,
		NaN,
		NaN
	]);
	const scrollEndTimeout = useTimeout();
	const waitForAnimationsTimeout = useTimeout();
	const computeThumbPosition = useStableCallback(() => {
		const viewportEl = viewportRef.current;
		const scrollbarYEl = scrollbarYRef.current;
		const scrollbarXEl = scrollbarXRef.current;
		const thumbYEl = thumbYRef.current;
		const thumbXEl = thumbXRef.current;
		const cornerEl = cornerRef.current;
		if (!viewportEl) return;
		const scrollableContentHeight = viewportEl.scrollHeight;
		const scrollableContentWidth = viewportEl.scrollWidth;
		const viewportHeight = viewportEl.clientHeight;
		const viewportWidth = viewportEl.clientWidth;
		const scrollTop = viewportEl.scrollTop;
		const scrollLeft = viewportEl.scrollLeft;
		const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
		const isFirstMeasurement = Number.isNaN(lastMeasuredViewportMetrics[0]);
		lastMeasuredViewportMetrics[0] = viewportHeight;
		lastMeasuredViewportMetrics[1] = scrollableContentHeight;
		lastMeasuredViewportMetrics[2] = viewportWidth;
		lastMeasuredViewportMetrics[3] = scrollableContentWidth;
		if (isFirstMeasurement) setHasMeasuredScrollbar(true);
		if (scrollableContentHeight === 0 || scrollableContentWidth === 0) return;
		const nextHiddenState = getHiddenState(viewportEl);
		const scrollbarYHidden = nextHiddenState.y;
		const scrollbarXHidden = nextHiddenState.x;
		const ratioX = viewportWidth / scrollableContentWidth;
		const ratioY = viewportHeight / scrollableContentHeight;
		const maxScrollLeft = Math.max(0, scrollableContentWidth - viewportWidth);
		const maxScrollTop = Math.max(0, scrollableContentHeight - viewportHeight);
		let scrollLeftFromStart = 0;
		let scrollLeftFromEnd = 0;
		if (!scrollbarXHidden) {
			scrollLeftFromStart = normalizeScrollOffset(direction === "rtl" ? -scrollLeft : scrollLeft, maxScrollLeft);
			scrollLeftFromEnd = maxScrollLeft - scrollLeftFromStart;
		}
		const scrollTopFromStart = scrollbarYHidden ? 0 : normalizeScrollOffset(scrollTop, maxScrollTop);
		const scrollTopFromEnd = scrollbarYHidden ? 0 : maxScrollTop - scrollTopFromStart;
		const nextWidth = scrollbarXHidden ? 0 : viewportWidth;
		const nextHeight = scrollbarYHidden ? 0 : viewportHeight;
		let nextCornerWidth = 0;
		let nextCornerHeight = 0;
		if (!scrollbarXHidden && !scrollbarYHidden) {
			nextCornerWidth = scrollbarYEl?.offsetWidth || 0;
			nextCornerHeight = scrollbarXEl?.offsetHeight || 0;
		}
		const cornerNotYetSized = cornerSize.width === 0 && cornerSize.height === 0;
		const cornerWidthOffset = cornerNotYetSized ? nextCornerWidth : 0;
		const cornerHeightOffset = cornerNotYetSized ? nextCornerHeight : 0;
		const scrollbarXOffset = getOffset(scrollbarXEl, "padding", "x");
		const scrollbarYOffset = getOffset(scrollbarYEl, "padding", "y");
		const thumbXOffset = getOffset(thumbXEl, "margin", "x");
		const thumbYOffset = getOffset(thumbYEl, "margin", "y");
		const idealNextWidth = nextWidth - scrollbarXOffset - thumbXOffset;
		const idealNextHeight = nextHeight - scrollbarYOffset - thumbYOffset;
		const maxNextWidth = scrollbarXEl ? Math.min(scrollbarXEl.offsetWidth - cornerWidthOffset, idealNextWidth) : idealNextWidth;
		const maxNextHeight = scrollbarYEl ? Math.min(scrollbarYEl.offsetHeight - cornerHeightOffset, idealNextHeight) : idealNextHeight;
		const clampedNextWidth = Math.max(16, maxNextWidth * ratioX);
		const clampedNextHeight = Math.max(16, maxNextHeight * ratioY);
		setThumbSize((prevSize) => pickState(prevSize, {
			width: clampedNextWidth,
			height: clampedNextHeight
		}));
		if (scrollbarYEl && thumbYEl) {
			const thumbOffsetY = applyOverscrollThumb(thumbYEl, scrollAreaThumbHeight, scrollTop, maxScrollTop, scrollableContentHeight, clampedNextHeight, scrollbarYEl.offsetHeight - clampedNextHeight - scrollbarYOffset - thumbYOffset);
			thumbYEl.style.transform = `translate3d(0,${thumbOffsetY}px,0)`;
		}
		if (scrollbarXEl && thumbXEl) {
			const maxThumbOffsetX = scrollbarXEl.offsetWidth - clampedNextWidth - scrollbarXOffset - thumbXOffset;
			const offsetX = applyOverscrollThumb(thumbXEl, scrollAreaThumbWidth, direction === "rtl" ? -scrollLeft : scrollLeft, maxScrollLeft, scrollableContentWidth, clampedNextWidth, maxThumbOffsetX);
			thumbXEl.style.transform = `translate3d(${direction === "rtl" ? -offsetX : offsetX}px,0,0)`;
		}
		const overflowMetricsPx = [
			scrollLeftFromStart,
			scrollLeftFromEnd,
			scrollTopFromStart,
			scrollTopFromEnd
		];
		OVERFLOW_EDGE_VARS.forEach((cssVar, index) => {
			viewportEl.style.setProperty(cssVar, `${overflowMetricsPx[index]}px`);
		});
		if (cornerEl) setCornerSize((prevSize) => pickState(prevSize, {
			width: nextCornerWidth,
			height: nextCornerHeight
		}));
		setHiddenState((prevState) => pickState(prevState, nextHiddenState));
		const nextOverflowEdges = {
			xStart: !scrollbarXHidden && scrollLeftFromStart > overflowEdgeThreshold.xStart,
			xEnd: !scrollbarXHidden && scrollLeftFromEnd > overflowEdgeThreshold.xEnd,
			yStart: !scrollbarYHidden && scrollTopFromStart > overflowEdgeThreshold.yStart,
			yEnd: !scrollbarYHidden && scrollTopFromEnd > overflowEdgeThreshold.yEnd
		};
		setOverflowEdges((prev) => pickState(prev, nextOverflowEdges));
	});
	useIsoLayoutEffect(() => {
		removeCSSVariableInheritance();
	}, []);
	useIsoLayoutEffect(() => {
		queueMicrotask(computeThumbPosition);
	}, [
		computeThumbPosition,
		hiddenState,
		direction,
		overflowEdgeThreshold.xStart,
		overflowEdgeThreshold.xEnd,
		overflowEdgeThreshold.yStart,
		overflowEdgeThreshold.yEnd
	]);
	useIsoLayoutEffect(() => {
		if (viewportRef.current?.matches(":hover")) setHovering(true);
	}, [viewportRef, setHovering]);
	useIsoLayoutEffect(() => {
		const viewport = viewportRef.current;
		if (typeof ResizeObserver === "undefined" || !viewport) return;
		let hasInitialized = false;
		const resizeObserver = new ResizeObserver(() => {
			if (!hasInitialized) {
				hasInitialized = true;
				const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
				if (lastMeasuredViewportMetrics[0] === viewport.clientHeight && lastMeasuredViewportMetrics[1] === viewport.scrollHeight && lastMeasuredViewportMetrics[2] === viewport.clientWidth && lastMeasuredViewportMetrics[3] === viewport.scrollWidth) return;
			}
			computeThumbPosition();
		});
		resizeObserver.observe(viewport);
		waitForAnimationsTimeout.start(0, () => {
			const animations = getFiniteAnimations(viewport, { subtree: true });
			if (animations.length === 0) return;
			Promise.allSettled(animations.map((animation) => animation.finished.then(NOOP))).then(computeThumbPosition).catch(() => {});
		});
		return () => {
			resizeObserver.disconnect();
			waitForAnimationsTimeout.clear();
		};
	}, [
		computeThumbPosition,
		viewportRef,
		waitForAnimationsTimeout
	]);
	function handleUserInteraction() {
		programmaticScrollRef.current = false;
	}
	const props = {
		...rootId && { "data-id": `${rootId}-viewport` },
		tabIndex: hiddenState.x && hiddenState.y ? -1 : 0,
		className: styleDisableScrollbar.className,
		style: { overflow: "scroll" },
		onScroll() {
			if (!viewportRef.current) return;
			computeThumbPosition();
			if (touchModality || !programmaticScrollRef.current) handleScroll({
				x: viewportRef.current.scrollLeft,
				y: viewportRef.current.scrollTop
			});
			scrollEndTimeout.start(100, () => {
				programmaticScrollRef.current = true;
			});
		},
		onWheel: handleUserInteraction,
		onPointerMove: handleUserInteraction,
		onPointerEnter: handleUserInteraction,
		onKeyDown: handleUserInteraction
	};
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, viewportRef],
		state: viewportState,
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	const contextValue = import_react.useMemo(() => ({ computeThumbPosition }), [computeThumbPosition]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ScrollAreaViewportContext.Provider, {
		value: contextValue,
		children: element
	});
});
function getHiddenState(viewport) {
	const y = viewport.clientHeight >= viewport.scrollHeight;
	const x = viewport.clientWidth >= viewport.scrollWidth;
	return {
		y,
		x,
		corner: y || x
	};
}
/**
* Returns `prev` when `next` is shallow-equal to it so setState bails out and
* scroll-frame updates don't rebuild the root context.
*/
function pickState(prev, next) {
	for (const key in next) if (prev[key] !== next[key]) return next;
	return prev;
}
/**
* Sizes the thumb and returns its axis offset. On overscroll (Safari rubber-band only) it shrinks
* against the pinned edge, damped by `content / (content + overscroll)` to match native feedback;
* the size flows through the thumb-size variable so the resting `var(...)` still applies.
*/
function applyOverscrollThumb(thumbEl, sizeVar, scrollFromStart, maxScroll, content, size, maxThumbOffset) {
	const clamped = clamp(scrollFromStart, 0, maxScroll);
	const overscroll = scrollFromStart - clamped;
	const nextSize = Math.max(16, size * content / (content + Math.abs(overscroll)));
	thumbEl.style.setProperty(sizeVar, overscroll ? `${nextSize}px` : "");
	return (maxScroll ? clamped / maxScroll * maxThumbOffset : 0) + (overscroll > 0 ? size - nextSize : 0);
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbarContext.mjs
var ScrollAreaScrollbarContext = /*#__PURE__*/ import_react.createContext(void 0);
function useScrollAreaScrollbarContext() {
	const context = import_react.useContext(ScrollAreaScrollbarContext);
	if (context === void 0) throw new Error(formatErrorMessage(54));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/scrollbar/ScrollAreaScrollbar.mjs
/**
* A vertical or horizontal scrollbar for the scroll area.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaScrollbar = /*#__PURE__*/ import_react.forwardRef(function ScrollAreaScrollbar(componentProps, forwardedRef) {
	const { render, className, orientation = "vertical", keepMounted = false, style, ...elementProps } = componentProps;
	const { hovering, scrollingX, scrollingY, hiddenState, scrollbarYRef, scrollbarXRef, viewportRef, thumbYRef, thumbXRef, handlePointerDown, handlePointerUp, handleScroll, disableViewportSnap, rootId, thumbSize, hasMeasuredScrollbar, viewportState } = useScrollAreaRootContext();
	const vertical = orientation === "vertical";
	const state = {
		...viewportState,
		hovering,
		scrolling: vertical ? scrollingY : scrollingX,
		orientation
	};
	const direction = useDirection();
	const hideTrackUntilMeasured = !hasMeasuredScrollbar && !keepMounted;
	const isHidden = vertical ? hiddenState.y : hiddenState.x;
	const shouldRender = keepMounted || !isHidden;
	import_react.useEffect(() => {
		if (!shouldRender) return;
		const viewportEl = viewportRef.current;
		const scrollbarEl = vertical ? scrollbarYRef.current : scrollbarXRef.current;
		if (!scrollbarEl) return;
		function handleWheel(event) {
			if (!viewportEl || event.ctrlKey) return;
			const horizontal = !vertical;
			const scrollProperty = horizontal ? "scrollLeft" : "scrollTop";
			const delta = horizontal ? event.deltaX : event.deltaY;
			if (delta === 0) return;
			const maxScroll = horizontal ? viewportEl.scrollWidth - viewportEl.clientWidth : viewportEl.scrollHeight - viewportEl.clientHeight;
			const minScroll = horizontal && direction === "rtl" ? -maxScroll : 0;
			const maxScrollValue = horizontal && direction === "rtl" ? 0 : maxScroll;
			const scrollValue = viewportEl[scrollProperty];
			if (scrollValue <= minScroll && delta < 0 || scrollValue >= maxScrollValue && delta > 0) return;
			event.preventDefault();
			viewportEl[scrollProperty] = Math.min(maxScrollValue, Math.max(minScroll, scrollValue + delta));
			handleScroll({
				x: viewportEl.scrollLeft,
				y: viewportEl.scrollTop
			});
		}
		return addEventListener(scrollbarEl, "wheel", handleWheel, { passive: false });
	}, [
		direction,
		handleScroll,
		vertical,
		scrollbarXRef,
		scrollbarYRef,
		shouldRender,
		viewportRef
	]);
	const props = {
		...rootId && { "data-id": `${rootId}-scrollbar` },
		"aria-hidden": true,
		onPointerDown(event) {
			if (event.button !== 0) return;
			const target = getTarget(event.nativeEvent);
			const thumbEl = vertical ? thumbYRef.current : thumbXRef.current;
			if (thumbEl && contains(thumbEl, target)) return;
			const viewportEl = viewportRef.current;
			if (!viewportEl) return;
			const scrollbarEl = vertical ? scrollbarYRef.current : scrollbarXRef.current;
			if (!thumbEl || !scrollbarEl) return;
			const axis = vertical ? "y" : "x";
			const thumbOffset = getOffset(thumbEl, "margin", axis);
			const scrollbarOffset = getOffset(scrollbarEl, "padding", axis);
			const thumbSizePx = vertical ? thumbEl.offsetHeight : thumbEl.offsetWidth;
			const trackRect = scrollbarEl.getBoundingClientRect();
			const clickPosition = vertical ? event.clientY - trackRect.top - thumbSizePx / 2 - scrollbarOffset + thumbOffset / 2 : event.clientX - trackRect.left - thumbSizePx / 2 - scrollbarOffset + thumbOffset / 2;
			const scrollableSize = vertical ? viewportEl.scrollHeight : viewportEl.scrollWidth;
			const viewportSize = vertical ? viewportEl.clientHeight : viewportEl.clientWidth;
			const maxThumbOffset = (vertical ? scrollbarEl.offsetHeight : scrollbarEl.offsetWidth) - thumbSizePx - scrollbarOffset - thumbOffset;
			if (maxThumbOffset <= 0) return;
			const scrollRatio = clickPosition / maxThumbOffset;
			const maxScrollDistance = scrollableSize - viewportSize;
			disableViewportSnap();
			if (vertical) viewportEl.scrollTop = scrollRatio * maxScrollDistance;
			else if (direction === "rtl") viewportEl.scrollLeft = -(1 - scrollRatio) * maxScrollDistance;
			else viewportEl.scrollLeft = scrollRatio * maxScrollDistance;
			handleScroll({
				x: viewportEl.scrollLeft,
				y: viewportEl.scrollTop
			});
			handlePointerDown(event);
		},
		onMouseDown(event) {
			event.preventDefault();
		},
		onPointerUp: handlePointerUp,
		onPointerCancel: handlePointerUp,
		style: {
			position: "absolute",
			touchAction: "none",
			WebkitUserSelect: "none",
			userSelect: "none",
			visibility: hideTrackUntilMeasured ? "hidden" : void 0,
			...vertical ? {
				top: 0,
				bottom: `var(${scrollAreaCornerHeight})`,
				insetInlineEnd: 0,
				[scrollAreaThumbHeight]: `${thumbSize.height}px`
			} : {
				insetInlineStart: 0,
				insetInlineEnd: `var(${scrollAreaCornerWidth})`,
				bottom: 0,
				[scrollAreaThumbWidth]: `${thumbSize.width}px`
			}
		}
	};
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, vertical ? scrollbarYRef : scrollbarXRef],
		state,
		props: [props, elementProps],
		stateAttributesMapping: scrollAreaStateAttributesMapping
	});
	if (!shouldRender) return null;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbarContext.Provider, {
		value: orientation,
		children: element
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/thumb/ScrollAreaThumb.mjs
/**
* The draggable part of the scrollbar that indicates the current scroll position.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaThumb = /*#__PURE__*/ import_react.forwardRef(function ScrollAreaThumb(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { thumbYRef, thumbXRef, handlePointerDown, handlePointerMove, handlePointerUp, scrollingX, scrollingY, hasMeasuredScrollbar } = useScrollAreaRootContext();
	const orientation = useScrollAreaScrollbarContext();
	const vertical = orientation === "vertical";
	return useRenderElement("div", componentProps, {
		ref: [forwardedRef, vertical ? thumbYRef : thumbXRef],
		state: {
			scrolling: vertical ? scrollingY : scrollingX,
			orientation
		},
		props: [{
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: handlePointerUp,
			style: {
				visibility: hasMeasuredScrollbar ? void 0 : "hidden",
				...vertical ? { height: "var(--scroll-area-thumb-height)" } : { width: "var(--scroll-area-thumb-width)" }
			}
		}, elementProps]
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/scroll-area/corner/ScrollAreaCorner.mjs
/**
* A small rectangular area that appears at the intersection of horizontal and vertical scrollbars.
* Renders a `<div>` element.
*
* Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
*/
var ScrollAreaCorner = /*#__PURE__*/ import_react.forwardRef(function ScrollAreaCorner(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const { cornerRef, cornerSize, hiddenState } = useScrollAreaRootContext();
	const element = useRenderElement("div", componentProps, {
		ref: [forwardedRef, cornerRef],
		props: [{
			"aria-hidden": true,
			style: {
				position: "absolute",
				bottom: 0,
				insetInlineEnd: 0,
				width: cornerSize.width,
				height: cornerSize.height
			}
		}, elementProps]
	});
	if (hiddenState.corner) return null;
	return element;
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/root/AvatarRootContext.mjs
var AvatarRootContext = /*#__PURE__*/ import_react.createContext(void 0);
function useAvatarRootContext() {
	const context = import_react.useContext(AvatarRootContext);
	if (context === void 0) throw new Error(formatErrorMessage(13));
	return context;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/root/stateAttributesMapping.mjs
var avatarStateAttributesMapping = { imageLoadingStatus: () => null };
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/root/AvatarRoot.mjs
/**
* Displays a user's profile picture, initials, or fallback icon.
* Renders a `<span>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarRoot = /*#__PURE__*/ import_react.forwardRef(function AvatarRoot(componentProps, forwardedRef) {
	const { className, render, style, ...elementProps } = componentProps;
	const [imageLoadingStatus, setImageLoadingStatus] = import_react.useState("idle");
	const state = { imageLoadingStatus };
	const contextValue = import_react.useMemo(() => ({
		imageLoadingStatus,
		setImageLoadingStatus
	}), [imageLoadingStatus, setImageLoadingStatus]);
	const element = useRenderElement("span", componentProps, {
		state,
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: avatarStateAttributesMapping
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(AvatarRootContext.Provider, {
		value: contextValue,
		children: element
	});
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/image/useImageLoadingStatus.mjs
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin, sizes, srcSet }, enabled) {
	const state = import_react.useState("idle");
	const setLoadingStatus = state[1];
	useIsoLayoutEffect(() => {
		if (!enabled) return NOOP;
		if (!src && !srcSet) {
			setLoadingStatus("error");
			return NOOP;
		}
		let isMounted = true;
		const image = new window.Image();
		const updateStatus = (status) => () => {
			if (!isMounted) return;
			setLoadingStatus(status);
		};
		setLoadingStatus("loading");
		image.onload = updateStatus("loaded");
		image.onerror = updateStatus("error");
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		image.crossOrigin = crossOrigin ?? null;
		if (sizes) image.sizes = sizes;
		if (srcSet) image.srcset = srcSet;
		if (src) image.src = src;
		if (image.complete) setLoadingStatus(image.naturalWidth > 0 ? "loaded" : "error");
		return () => {
			isMounted = false;
		};
	}, [
		enabled,
		src,
		srcSet,
		sizes,
		crossOrigin,
		referrerPolicy,
		setLoadingStatus
	]);
	return state;
}
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/image/AvatarImage.mjs
var stateAttributesMapping = {
	...avatarStateAttributesMapping,
	...transitionStatusMapping
};
/**
* The image to be displayed in the avatar.
* Renders an `<img>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarImage = /*#__PURE__*/ import_react.forwardRef(function AvatarImage(componentProps, forwardedRef) {
	const { className, render, onLoadingStatusChange: onLoadingStatusChangeProp, keepMounted = false, style, sizes, srcSet, src, ...elementProps } = componentProps;
	const { setImageLoadingStatus: setRootImageLoadingStatus } = useAvatarRootContext();
	const [imageLoadingStatus, setImageLoadingStatus] = useImageLoadingStatus(src, componentProps, !keepMounted);
	const isVisible = imageLoadingStatus === "loaded";
	const { mounted, transitionStatus, setMounted } = useTransitionStatus(isVisible);
	const imageRef = import_react.useRef(null);
	const initialCommitRef = import_react.useRef(true);
	useIsoLayoutEffect(() => {
		if (!keepMounted) return;
		const isInitialCommit = initialCommitRef.current;
		initialCommitRef.current = false;
		const image = imageRef.current;
		if (!image) return;
		if (!image.complete) {
			setImageLoadingStatus("loading");
			return;
		}
		const status = image.naturalWidth > 0 ? "loaded" : "error";
		setImageLoadingStatus(status);
		if (status === "loaded" && isInitialCommit) setMounted(true);
	}, [
		keepMounted,
		src,
		srcSet,
		sizes,
		elementProps.crossOrigin,
		elementProps.referrerPolicy,
		render,
		setImageLoadingStatus,
		setMounted
	]);
	const renderedStatusProps = keepMounted ? {
		"data-loading": imageLoadingStatus === "loading" ? "" : void 0,
		"data-error": imageLoadingStatus === "error" ? "" : void 0,
		"aria-hidden": imageLoadingStatus !== "loaded" || void 0,
		onLoad() {
			setImageLoadingStatus("loaded");
		},
		onError() {
			setImageLoadingStatus("error");
		}
	} : void 0;
	const handleLoadingStatusChange = useStableCallback((status) => {
		onLoadingStatusChangeProp?.(status);
		setRootImageLoadingStatus(status);
	});
	useIsoLayoutEffect(() => {
		if (imageLoadingStatus !== "idle") handleLoadingStatusChange(imageLoadingStatus);
	}, [imageLoadingStatus, handleLoadingStatusChange]);
	useIsoLayoutEffect(() => {
		return () => setRootImageLoadingStatus("idle");
	}, [setRootImageLoadingStatus]);
	useOpenChangeComplete({
		enabled: !isVisible,
		open: isVisible,
		ref: imageRef,
		onComplete() {
			if (!isVisible) setMounted(false);
		}
	});
	const state = {
		imageLoadingStatus,
		transitionStatus: keepMounted && transitionStatus === "ending" ? void 0 : transitionStatus
	};
	const shouldRender = keepMounted || mounted;
	const sourceProps = {};
	if (sizes !== void 0) sourceProps.sizes = sizes;
	if (srcSet !== void 0) sourceProps.srcSet = srcSet;
	if (src !== void 0) sourceProps.src = src;
	const element = useRenderElement("img", componentProps, {
		state,
		ref: [forwardedRef, imageRef],
		props: [
			renderedStatusProps,
			elementProps,
			sourceProps
		],
		stateAttributesMapping,
		enabled: shouldRender
	});
	if (!shouldRender) return null;
	return element;
});
// ../../node_modules/.pnpm/@base-ui+react@1.9.0_@date-_367596df1f109cf5c4332405308b84ea/node_modules/@base-ui/react/avatar/fallback/AvatarFallback.mjs
/**
* Rendered when the image fails to load or when no image is provided.
* Renders a `<span>` element.
*
* Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
*/
var AvatarFallback = /*#__PURE__*/ import_react.forwardRef(function AvatarFallback(componentProps, forwardedRef) {
	const { className, render, delay = 0, style, ...elementProps } = componentProps;
	const { imageLoadingStatus } = useAvatarRootContext();
	const [delayPassed, setDelayPassed] = import_react.useState(delay === 0);
	const timeout = useTimeout();
	import_react.useEffect(() => {
		if (delay > 0) timeout.start(delay, () => setDelayPassed(true));
		else setDelayPassed(true);
		return timeout.clear;
	}, [timeout, delay]);
	return useRenderElement("span", componentProps, {
		state: { imageLoadingStatus },
		ref: forwardedRef,
		props: elementProps,
		stateAttributesMapping: avatarStateAttributesMapping,
		enabled: imageLoadingStatus !== "loaded" && (delay === 0 || delayPassed)
	});
});
export { AvatarFallback, AvatarImage, AvatarRoot, PopoverPopup, PopoverPortal, PopoverPositioner, PopoverRoot, PopoverTrigger, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport };

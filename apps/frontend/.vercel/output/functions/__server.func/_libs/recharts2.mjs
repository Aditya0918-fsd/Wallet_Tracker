import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { clsx } from "./class-variance-authority+clsx.mjs";
import { AnimatedItems, CartesianChart, CartesianLabelListContextProvider, Curve, DefaultZIndexes, GraphicalItemClipPath, LabelListFromLabelProp, Layer, RegisterGraphicalItemId, SetCartesianGraphicalItem, SetLegendPayload, SetTooltipEntrySettings, Shape, ZIndexLayer, adaptEventHandlers, arrayTooltipSearcher, getBandSizeOfAxis, getCateCoordinateOfLine, getNormalizedStackId, getStackSeriesIdentifier, getTooltipNameProp, getValueByDataKey, interpolate, isCategoricalAxis, isClipDot, isNan, isNotNil, isNullish, isNumber, isWellBehavedNumber, matchAnimationItems, matchByIndex, noop, propsAreEqual, resolveDefaultProps, selectActiveTooltipIndex, selectAxisWithScale, selectChartBaseValue, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectChartLayout, selectStackGroups, selectTicksOfGraphicalItem, selectUnfilteredCartesianItems, selectXAxisIdFromGraphicalItemId, selectYAxisIdFromGraphicalItemId, svgPropertiesAndEvents, svgPropertiesAndEventsFromUnknown, svgPropertiesNoEvents, svgPropertiesNoEventsFromUnknown, useActiveTooltipDataPoints, useAnimationCallbacks, useAnimationStartSnapshot, useAppSelector, useCartesianChartLayout, useChartLayout, useChartName, useId, useIsPanorama, useNeedsClip, usePlotArea } from "./recharts+[...].mjs";
import { createSelector } from "./@reduxjs/toolkit+[...].mjs";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Dot.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
/**
* Renders a dot in the chart.
*
* This component accepts X and Y coordinates in pixels.
* If you need to position the rectangle based on your chart's data,
* consider using the {@link ReferenceDot} component instead.
*
* @param props
* @constructor
*/
var Dot = (props) => {
	var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
	var layerClass = clsx("recharts-dot", className);
	if (isNumber(cx) && isNumber(cy) && isNumber(r)) return /*#__PURE__*/ import_react.createElement("circle", _extends$3({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
		className: layerClass,
		cx,
		cy,
		r
	}));
	return null;
};
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/Dots.js
var _excluded$2 = ["points"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
function _objectWithoutProperties$2(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function DotItem(_ref) {
	var option = _ref.option, dotProps = _ref.dotProps, className = _ref.className;
	if (/*#__PURE__*/ (0, import_react.isValidElement)(option)) return /*#__PURE__*/ (0, import_react.cloneElement)(option, dotProps);
	if (typeof option === "function") return option(dotProps);
	var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : ""), _ref2 = dotProps !== null && dotProps !== void 0 ? dotProps : {};
	_ref2.points;
	var props = _objectWithoutProperties$2(_ref2, _excluded$2);
	return /*#__PURE__*/ import_react.createElement(Dot, _extends$2({}, props, { className: finalClassName }));
}
function shouldRenderDots(points, dot) {
	if (points == null) return false;
	if (dot) return true;
	return points.length === 1;
}
function Dots(_ref3) {
	var points = _ref3.points, dot = _ref3.dot, className = _ref3.className, dotClassName = _ref3.dotClassName, dataKey = _ref3.dataKey, baseProps = _ref3.baseProps, needClip = _ref3.needClip, clipPathId = _ref3.clipPathId, _ref3$zIndex = _ref3.zIndex, zIndex = _ref3$zIndex === void 0 ? DefaultZIndexes.scatter : _ref3$zIndex;
	if (!shouldRenderDots(points, dot)) return null;
	var clipDot = isClipDot(dot);
	var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
	var dots = points.map((entry, i) => {
		var _entry$x, _entry$y;
		var dotProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({ r: 3 }, baseProps), customDotProps), {}, {
			index: i,
			cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
			cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
			dataKey,
			value: entry.value,
			payload: entry.payload,
			points
		});
		return /*#__PURE__*/ import_react.createElement(DotItem, {
			key: "dot-".concat(i),
			option: dot,
			dotProps,
			className: dotClassName
		});
	});
	var layerProps = {};
	if (needClip && clipPathId != null) layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex }, /*#__PURE__*/ import_react.createElement(Layer, _extends$2({ className }, layerProps), dots));
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/component/ActivePoints.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref) => {
	var point = _ref.point, childIndex = _ref.childIndex, mainColor = _ref.mainColor, activeDot = _ref.activeDot, dataKey = _ref.dataKey, clipPath = _ref.clipPath;
	if (activeDot === false || point.x == null || point.y == null) return null;
	var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, {
		index: childIndex,
		dataKey,
		cx: point.x,
		cy: point.y,
		r: 4,
		fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: point.payload,
		value: point.value
	}), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
	var dot;
	if (/*#__PURE__*/ (0, import_react.isValidElement)(activeDot)) dot = /*#__PURE__*/ (0, import_react.cloneElement)(activeDot, dotProps);
	else if (typeof activeDot === "function") dot = activeDot(dotProps);
	else dot = /*#__PURE__*/ import_react.createElement(Dot, dotProps);
	return /*#__PURE__*/ import_react.createElement(Layer, {
		className: "recharts-active-dot",
		clipPath
	}, dot);
};
function ActivePoints(_ref2) {
	var points = _ref2.points, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, itemDataKey = _ref2.itemDataKey, clipPath = _ref2.clipPath, _ref2$zIndex = _ref2.zIndex, zIndex = _ref2$zIndex === void 0 ? DefaultZIndexes.activeDot : _ref2$zIndex;
	var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
	var activeDataPoints = useActiveTooltipDataPoints();
	if (points == null || activeDataPoints == null) return null;
	var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
	if (isNullish(activePoint)) return null;
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex }, /*#__PURE__*/ import_react.createElement(ActivePoint, {
		point: activePoint,
		childIndex: Number(activeTooltipIndex),
		mainColor,
		dataKey: itemDataKey,
		activeDot,
		clipPath
	}));
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function getRadiusAndStrokeWidthFromDot(dot) {
	var props = svgPropertiesNoEventsFromUnknown(dot);
	var defaultR = 3;
	var defaultStrokeWidth = 2;
	if (props != null) {
		var r = props.r, strokeWidth = props.strokeWidth;
		var realR = Number(r);
		var realStrokeWidth = Number(strokeWidth);
		if (Number.isNaN(realR) || realR < 0) realR = defaultR;
		if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) realStrokeWidth = defaultStrokeWidth;
		return {
			r: realR,
			strokeWidth: realStrokeWidth
		};
	}
	return {
		r: defaultR,
		strokeWidth: defaultStrokeWidth
	};
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/areaSelectors.js
var selectXAxisWithScale = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectXAxisTicks = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisWithScale = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisTicks = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectBandSize = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
	if (isCategoricalAxis(layout, "xAxis")) return getBandSizeOfAxis(xAxis, xAxisTicks, false);
	return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectNumericalAxisType = (state) => {
	var layout = selectChartLayout(state);
	return isCategoricalAxis(layout, "xAxis") ? "yAxis" : "xAxis";
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId) => {
	if (selectNumericalAxisType(state) === "yAxis") return selectYAxisIdFromGraphicalItemId(state, graphicalItemId);
	return selectXAxisIdFromGraphicalItemId(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama) => selectStackGroups(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
	var _stackGroups$stackId;
	if (areaSettings == null || stackGroups == null) return;
	var stackId = areaSettings.stackId;
	var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
	if (stackId == null || stackSeriesIdentifier == null) return;
	var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
	var found = groups === null || groups === void 0 ? void 0 : groups.find((v) => v.key === stackSeriesIdentifier);
	if (found == null) return;
	return found.map((item) => [item[0], item[1]]);
});
var selectStackDataKeys = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
	if (areaSettings == null || areaSettings.stackId == null || stackGroups == null) return;
	var group = stackGroups[areaSettings.stackId];
	if (group == null) return;
	return group.graphicalItems.map((item) => item.dataKey).filter(isNotNil);
});
var selectArea = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks,
	selectGraphicalItemStackedData,
	selectChartDataWithIndexesIfNotInPanoramaPosition3,
	selectBandSize,
	selectSynchronisedAreaSettings,
	selectChartBaseValue,
	selectStackDataKeys
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref, bandSize, areaSettings, chartBaseValue, stackDataKeys) => {
	var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
	if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) return;
	var data = areaSettings.data;
	var displayedData;
	if (data && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeArea({
		layout,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		dataStartIndex,
		areaSettings,
		stackedData,
		displayedData,
		chartBaseValue,
		bandSize,
		stackDataKeys
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/AreaRevealShape.js
var _excluded$1 = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"layout",
	"isRange",
	"stroke",
	"connectNulls"
];
var _excluded2$1 = ["id", "baseLine"];
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
function _objectWithoutProperties$1(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Props for the clip-path rect computation.
* @internal
*/
function HorizontalClipRect(_ref) {
	var _points$, _points;
	var alpha = _ref.alpha, baseLine = _ref.baseLine, points = _ref.points, strokeWidth = _ref.strokeWidth;
	var startX = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.x;
	var endX = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.x;
	if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) return null;
	var width = alpha * Math.abs(startX - endX);
	var maxY = Math.max(...points.map((entry) => entry.y || 0));
	if (isNumber(baseLine)) maxY = Math.max(baseLine, maxY);
	else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
	if (isNumber(maxY)) return /*#__PURE__*/ import_react.createElement("rect", {
		x: startX < endX ? startX : startX - width,
		y: 0,
		width,
		height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
	});
	return null;
}
function VerticalClipRect(_ref2) {
	var _points$2, _points2;
	var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
	var startY = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.y;
	var endY = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.y;
	if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) return null;
	var height = alpha * Math.abs(startY - endY);
	var maxX = Math.max(...points.map((entry) => entry.x || 0));
	if (isNumber(baseLine)) maxX = Math.max(baseLine, maxX);
	else if (baseLine && Array.isArray(baseLine) && baseLine.length) maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
	if (isNumber(maxX)) return /*#__PURE__*/ import_react.createElement("rect", {
		x: 0,
		y: startY < endY ? startY : startY - height,
		width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
		height: Math.floor(height)
	});
	return null;
}
function RevealClipRect(_ref3) {
	var alpha = _ref3.alpha, layout = _ref3.layout, points = _ref3.points, baseLine = _ref3.baseLine, strokeWidth = _ref3.strokeWidth;
	if (layout === "vertical") return /*#__PURE__*/ import_react.createElement(VerticalClipRect, {
		alpha,
		points,
		baseLine,
		strokeWidth
	});
	return /*#__PURE__*/ import_react.createElement(HorizontalClipRect, {
		alpha,
		points,
		baseLine,
		strokeWidth
	});
}
/**
* The default shape for Area that reveals the chart with a left-to-right (or top-to-bottom)
* clip-path animation on entrance, and renders the plain curve otherwise.
*
* This component renders the complete Area visual: the filled area curve, the stroke curve,
* and (for range areas) the baseline stroke curve. During entrance animation, all curves are
* wrapped in a clip-path that progressively reveals the area.
*
* This is the built-in entrance animation for Area. It is automatically used when no custom
* `shape` prop is provided. You can import and reuse it as a starting point for custom shapes.
*
* @example
* ```tsx
* import { Area, AreaRevealShape } from 'recharts';
*
* // Use the default shape explicitly (same as providing no shape prop)
* <Area dataKey="value" shape={AreaRevealShape} />
* ```
*
* @see {@link https://recharts.github.io/en-US/guide/animations Animation guide}
*
* @since 3.9
*/
function AreaRevealShape(props) {
	var _props$animationElaps = props.animationElapsedTime, animationElapsedTime = _props$animationElaps === void 0 ? 1 : _props$animationElaps, _props$isAnimating = props.isAnimating, isAnimating = _props$isAnimating === void 0 ? false : _props$isAnimating, _props$isEntrance = props.isEntrance, isEntrance = _props$isEntrance === void 0 ? false : _props$isEntrance, layoutProp = props.layout, isRange = props.isRange, stroke = props.stroke, connectNulls = props.connectNulls, restProps = _objectWithoutProperties$1(props, _excluded$1);
	var layout = layoutProp === "vertical" ? "vertical" : "horizontal";
	var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
	var clipId = useId();
	var id = restProps.id, baseLine = restProps.baseLine, propsWithoutIdBaseline = _objectWithoutProperties$1(restProps, _excluded2$1);
	var strokeSvgProps = svgPropertiesNoEvents(propsWithoutIdBaseline);
	var fillCurve = /*#__PURE__*/ import_react.createElement(Curve, _extends$1({}, restProps, {
		id,
		baseLine,
		connectNulls: finalConnectNulls,
		stroke: "none",
		className: "recharts-area-area",
		layout
	}));
	var strokeCurve = stroke !== "none" && /*#__PURE__*/ import_react.createElement(Curve, _extends$1({}, strokeSvgProps, {
		className: "recharts-area-curve",
		layout,
		type: restProps.type,
		connectNulls: finalConnectNulls,
		fill: "none",
		stroke,
		points: restProps.points
	}));
	var baselineCurve = stroke !== "none" && isRange && Array.isArray(baseLine) && /*#__PURE__*/ import_react.createElement(Curve, _extends$1({}, strokeSvgProps, {
		className: "recharts-area-curve",
		layout,
		type: restProps.type,
		connectNulls: finalConnectNulls,
		fill: "none",
		stroke,
		points: baseLine
	}));
	if (isEntrance && (isAnimating || animationElapsedTime < 1)) {
		var _restProps$points;
		return /*#__PURE__*/ import_react.createElement(Layer, null, /*#__PURE__*/ import_react.createElement("defs", null, /*#__PURE__*/ import_react.createElement("clipPath", { id: clipId }, /*#__PURE__*/ import_react.createElement(RevealClipRect, {
			alpha: animationElapsedTime,
			points: (_restProps$points = restProps.points) !== null && _restProps$points !== void 0 ? _restProps$points : [],
			baseLine,
			layout,
			strokeWidth: restProps.strokeWidth
		}))), /*#__PURE__*/ import_react.createElement(Layer, { clipPath: "url(#".concat(clipId, ")") }, fillCurve, strokeCurve, baselineCurve));
	}
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, fillCurve, strokeCurve, baselineCurve);
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/Area.js
var _excluded = ["id"];
var _excluded2 = [
	"activeDot",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"fill",
	"fillOpacity",
	"hide",
	"isAnimationActive",
	"legendType",
	"stroke",
	"xAxisId",
	"yAxisId"
];
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* @inline
*/
/**
* Our base value array has payload in it, and we expose it externally too.
*/
/**
* Internal props, combination of external props + defaultProps + private Recharts state
*/
/**
* External props, intended for end users to fill in
*/
var defaultAreaAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	return items.flatMap((item) => {
		if (item.status === "matched") return [_objectSpread(_objectSpread({}, item.next), {}, {
			x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
			y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
		})];
		if (item.status === "added") return [item.next];
		return [];
	});
};
var defaultAreaProps = {
	activeDot: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: matchByIndex,
	animationInterpolateFn: defaultAreaAnimateItems,
	connectNulls: false,
	dot: false,
	fill: "#3182bd",
	fillOpacity: .6,
	hide: false,
	isAnimationActive: "auto",
	legendType: "line",
	stroke: "#3182bd",
	strokeWidth: 1,
	type: "linear",
	label: false,
	shape: AreaRevealShape,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.area
};
/**
* Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
*/
function getLegendItemColor(stroke, fill) {
	return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
	var dataKey = props.dataKey, name = props.name, stroke = props.stroke, fill = props.fill, legendType = props.legendType;
	return [{
		inactive: props.hide,
		dataKey,
		type: legendType,
		color: getLegendItemColor(stroke, fill),
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetAreaTooltipEntrySettings = /*#__PURE__*/ import_react.memo((_ref) => {
	var dataKey = _ref.dataKey, data = _ref.data, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, unit = _ref.unit, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: data,
		getPosition: noop,
		settings: {
			stroke,
			strokeWidth,
			fill,
			dataKey,
			nameKey: void 0,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: getLegendItemColor(stroke, fill),
			unit,
			formatter,
			graphicalItemId: id
		}
	};
	return /*#__PURE__*/ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function AreaDotsWrapper(_ref2) {
	var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
	var needClip = props.needClip, dot = props.dot, dataKey = props.dataKey;
	var areaProps = svgPropertiesNoEvents(props);
	return /*#__PURE__*/ import_react.createElement(Dots, {
		points,
		dot,
		className: "recharts-area-dots",
		dotClassName: "recharts-area-dot",
		dataKey,
		baseProps: areaProps,
		needClip,
		clipPathId
	});
}
function AreaLabelListProvider(_ref3) {
	var showLabels = _ref3.showLabels, children = _ref3.children;
	var labelListEntries = _ref3.points.map((point) => {
		var _point$x, _point$y;
		var viewBox = {
			x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
			y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return _objectSpread(_objectSpread({}, viewBox), {}, {
			value: point.value,
			payload: point.payload,
			parentViewBox: void 0,
			viewBox,
			fill: void 0
		});
	});
	return /*#__PURE__*/ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function StaticArea(_ref4) {
	var points = _ref4.points, baseLine = _ref4.baseLine, needClip = _ref4.needClip, clipPathId = _ref4.clipPathId, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance;
	var layout = props.layout, type = props.type, stroke = props.stroke, connectNulls = props.connectNulls, isRange = props.isRange, shape = props.shape;
	var id = props.id, propsWithoutId = _objectWithoutProperties(props, _excluded);
	var curveProps = _objectSpread(_objectSpread({}, svgPropertiesAndEvents(propsWithoutId)), {}, {
		id,
		points,
		connectNulls,
		type,
		baseLine,
		layout,
		stroke,
		isRange,
		animationElapsedTime,
		isAnimating,
		isEntrance
	});
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /*#__PURE__*/ import_react.createElement(Layer, { clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0 }, /*#__PURE__*/ import_react.createElement(Shape, {
		option: shape,
		DefaultShape: defaultAreaProps.shape,
		shapeProps: curveProps
	})), /*#__PURE__*/ import_react.createElement(AreaDotsWrapper, {
		points,
		props: propsWithoutId,
		clipPathId
	}));
}
function interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime) {
	if (isNumber(baseLine)) {
		var previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
		return interpolate(previousNumberBaseLine, baseLine, animationElapsedTime);
	}
	if (isNullish(baseLine) || isNan(baseLine)) {
		var _previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
		return interpolate(_previousNumberBaseLine, 0, animationElapsedTime);
	}
	return baseLine;
}
function AreaWithAnimation(_ref5) {
	var needClip = _ref5.needClip, clipPathId = _ref5.clipPathId, props = _ref5.props, previousPointsRef = _ref5.previousPointsRef, previousBaselineRef = _ref5.previousBaselineRef;
	var points = props.points, baseLine = props.baseLine, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn;
	var animationInput = (0, import_react.useMemo)(() => ({
		points,
		baseLine
	}), [points, baseLine]);
	var baseLineAnimationState = useAnimationStartSnapshot(animationInput, previousBaselineRef);
	var layout = useCartesianChartLayout();
	var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var prevBaseLine = baseLineAnimationState.startValue;
	if (layout == null) return null;
	var baseLineAnimationItems;
	if (Array.isArray(baseLine) && Array.isArray(prevBaseLine)) baseLineAnimationItems = matchAnimationItems(prevBaseLine, baseLine, animationMatchBy);
	else if (Array.isArray(baseLine)) baseLineAnimationItems = matchAnimationItems(null, baseLine, animationMatchBy);
	else baseLineAnimationItems = null;
	return /*#__PURE__*/ import_react.createElement(AnimatedItems, {
		animationInput,
		animationIdPrefix: "recharts-area-",
		items: points,
		previousItemsRef: previousPointsRef,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		onAnimationStart: handleAnimationStart,
		onAnimationEnd: handleAnimationEnd,
		animationInterpolateFn,
		animationMatchBy,
		layout
	}, (stepPoints, animationElapsedTime, isEntrance) => {
		var stepBaseLine;
		if (animationElapsedTime === 1) stepBaseLine = baseLine;
		else if (Array.isArray(baseLine)) stepBaseLine = animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
		else stepBaseLine = isEntrance ? baseLine : interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime);
		baseLineAnimationState.syncStepValue(stepBaseLine, animationElapsedTime);
		return /*#__PURE__*/ import_react.createElement(AreaLabelListProvider, {
			showLabels: !isAnimating,
			points
		}, props.children, /*#__PURE__*/ import_react.createElement(StaticArea, {
			points: stepPoints,
			baseLine: stepBaseLine,
			needClip,
			clipPathId,
			props,
			animationElapsedTime,
			isAnimating: isAnimating || animationElapsedTime < 1,
			isEntrance
		}), /*#__PURE__*/ import_react.createElement(LabelListFromLabelProp, { label: props.label }));
	});
}
function RenderArea(_ref6) {
	var needClip = _ref6.needClip, clipPathId = _ref6.clipPathId, props = _ref6.props;
	var previousPointsRef = (0, import_react.useRef)(null);
	var previousBaselineRef = (0, import_react.useRef)();
	return /*#__PURE__*/ import_react.createElement(AreaWithAnimation, {
		needClip,
		clipPathId,
		props,
		previousPointsRef,
		previousBaselineRef
	});
}
var AreaWithState = class extends import_react.PureComponent {
	render() {
		var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, top = _this$props.top, left = _this$props.left, needClip = _this$props.needClip, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, width = _this$props.width, height = _this$props.height, id = _this$props.id, baseLine = _this$props.baseLine, zIndex = _this$props.zIndex;
		if (hide) return null;
		var layerClass = clsx("recharts-area", className);
		var clipPathId = id;
		var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
		var clipDot = isClipDot(dot);
		var dotSize = r * 2 + strokeWidth;
		var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
		return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: layerClass }, needClip && /*#__PURE__*/ import_react.createElement("defs", null, /*#__PURE__*/ import_react.createElement(GraphicalItemClipPath, {
			clipPathId,
			xAxisId,
			yAxisId
		}), !clipDot && /*#__PURE__*/ import_react.createElement("clipPath", { id: "clipPath-dots-".concat(clipPathId) }, /*#__PURE__*/ import_react.createElement("rect", {
			x: left - dotSize / 2,
			y: top - dotSize / 2,
			width: width + dotSize,
			height: height + dotSize
		}))), /*#__PURE__*/ import_react.createElement(RenderArea, {
			needClip,
			clipPathId,
			props: this.props
		})), /*#__PURE__*/ import_react.createElement(ActivePoints, {
			points,
			mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: activePointsClipPath
		}), this.props.isRange && Array.isArray(baseLine) && /*#__PURE__*/ import_react.createElement(ActivePoints, {
			points: baseLine,
			mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
			itemDataKey: this.props.dataKey,
			activeDot: this.props.activeDot,
			clipPath: activePointsClipPath
		}));
	}
};
function AreaImpl(props) {
	var _useAppSelector;
	var activeDot = props.activeDot, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, connectNulls = props.connectNulls, dot = props.dot, fill = props.fill, fillOpacity = props.fillOpacity, hide = props.hide, isAnimationActive = props.isAnimationActive, legendType = props.legendType, stroke = props.stroke, xAxisId = props.xAxisId, yAxisId = props.yAxisId, everythingElse = _objectWithoutProperties(props, _excluded2);
	var layout = useChartLayout();
	var chartName = useChartName();
	var needClip = useNeedsClip(xAxisId, yAxisId).needClip;
	var isPanorama = useIsPanorama();
	var _ref7 = (_useAppSelector = useAppSelector((state) => selectArea(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, points = _ref7.points, isRange = _ref7.isRange, baseLine = _ref7.baseLine;
	var plotArea = usePlotArea();
	if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) return null;
	if (chartName !== "AreaChart" && chartName !== "ComposedChart") return null;
	var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
	if (!points || !points.length) return null;
	return /*#__PURE__*/ import_react.createElement(AreaWithState, _extends({}, everythingElse, {
		activeDot,
		animationBegin,
		animationDuration,
		animationEasing,
		baseLine,
		connectNulls,
		dot,
		fill,
		fillOpacity,
		height,
		hide,
		layout,
		isAnimationActive,
		isRange,
		legendType,
		needClip,
		points,
		stroke,
		width,
		left,
		top,
		xAxisId,
		yAxisId
	}));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
	var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
	if (isNumber(baseValue)) return baseValue;
	var numericAxis = layout === "horizontal" ? yAxis : xAxis;
	var domain = numericAxis.scale.domain();
	if (numericAxis.type === "number") {
		var domainMax = Math.max(domain[0], domain[1]);
		var domainMin = Math.min(domain[0], domain[1]);
		if (baseValue === "dataMin") return domainMin;
		if (baseValue === "dataMax") return domainMax;
		return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
	}
	if (baseValue === "dataMin") return domain[0];
	if (baseValue === "dataMax") return domain[1];
	return domain[0];
};
function computeArea(_ref8) {
	var _ref8$areaSettings = _ref8.areaSettings, connectNulls = _ref8$areaSettings.connectNulls, itemBaseValue = _ref8$areaSettings.baseValue, dataKey = _ref8$areaSettings.dataKey, stackedData = _ref8.stackedData, layout = _ref8.layout, chartBaseValue = _ref8.chartBaseValue, xAxis = _ref8.xAxis, yAxis = _ref8.yAxis, displayedData = _ref8.displayedData, dataStartIndex = _ref8.dataStartIndex, xAxisTicks = _ref8.xAxisTicks, yAxisTicks = _ref8.yAxisTicks, bandSize = _ref8.bandSize, stackDataKeys = _ref8.stackDataKeys;
	var hasStack = stackedData && stackedData.length;
	var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
	var isHorizontalLayout = layout === "horizontal";
	var isRange = false;
	var points = displayedData.map((entry, index) => {
		var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
		var valueAsArray;
		if (hasStack) valueAsArray = stackedData[dataStartIndex + index];
		else {
			var _rawValue = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(_rawValue)) valueAsArray = [baseValue, _rawValue];
			else {
				valueAsArray = _rawValue;
				isRange = true;
			}
		}
		var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
		var rawValue = getValueByDataKey(entry, dataKey);
		var wholeStackIsNull = hasStack && rawValue == null && stackDataKeys != null && stackDataKeys.length > 0 && stackDataKeys.every((key) => getValueByDataKey(entry, key) == null);
		var isBreakPoint = value1 == null || hasStack && !connectNulls && rawValue == null || wholeStackIsNull;
		if (isHorizontalLayout) {
			var _yAxis$scale$map;
			return {
				x: getCateCoordinateOfLine({
					axis: xAxis,
					ticks: xAxisTicks,
					bandSize,
					entry,
					index
				}),
				y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
				value: valueAsArray,
				payload: entry
			};
		}
		return {
			x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
			y: getCateCoordinateOfLine({
				axis: yAxis,
				ticks: yAxisTicks,
				bandSize,
				entry,
				index
			}),
			value: valueAsArray,
			payload: entry
		};
	});
	var baseLine;
	if (hasStack || isRange) baseLine = points.map((entry) => {
		var _xAxis$scale$map2;
		var x = Array.isArray(entry.value) ? entry.value[0] : null;
		if (isHorizontalLayout) {
			var _yAxis$scale$map2;
			return {
				x: entry.x,
				y: x != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
				payload: entry.payload
			};
		}
		return {
			x: x != null ? (_xAxis$scale$map2 = xAxis.scale.map(x)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
			y: entry.y,
			payload: entry.payload
		};
	});
	else baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
	return {
		points,
		baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
		isRange
	};
}
function AreaFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultAreaProps);
	var isPanorama = useIsPanorama();
	return /*#__PURE__*/ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "area"
	}, (id) => /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromAreaData(props) }), /*#__PURE__*/ import_react.createElement(SetAreaTooltipEntrySettings, {
		dataKey: props.dataKey,
		data: props.data,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		unit: props.unit,
		formatter: props.formatter,
		tooltipType: props.tooltipType,
		id
	}), /*#__PURE__*/ import_react.createElement(SetCartesianGraphicalItem, {
		type: "area",
		id,
		data: props.data,
		dataKey: props.dataKey,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		stackId: getNormalizedStackId(props.stackId),
		hide: props.hide,
		barSize: void 0,
		baseValue: props.baseValue,
		isPanorama,
		connectNulls: props.connectNulls
	}), /*#__PURE__*/ import_react.createElement(AreaImpl, _extends({}, props, { id }))));
}
/**
* @provides LabelListContext
* @consumes CartesianChartContext
*/
var Area = /*#__PURE__*/ import_react.memo(AreaFn, propsAreEqual);
Area.displayName = "Area";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/AreaChart.js
var allowedTooltipTypes = ["axis"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var AreaChart = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	return /*#__PURE__*/ import_react.createElement(CartesianChart, {
		chartName: "AreaChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
export { ActivePoints, Area, AreaChart, Dot, Dots, getRadiusAndStrokeWidthFromDot };

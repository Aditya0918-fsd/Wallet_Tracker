import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
import { clsx } from "./class-variance-authority+clsx.mjs";
import { AnimatedItems, CartesianChart, CartesianLabelContextProvider, CartesianLabelFromLabelProp, CartesianLabelListContextProvider, Cell, Curve, DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME, DefaultZIndexes, GraphicalItemClipPath, LabelListFromLabelProp, Layer, PolarChart, PolarLabelContextProvider, PolarLabelFromLabelProp, PolarLabelListContextProvider, RegisterGraphicalItemId, Sector, SetCartesianGraphicalItem, SetErrorBarContext, SetLegendPayload, SetPolarGraphicalItem, SetPolarLegendPayload, SetTooltipEntrySettings, Shape, Text, ZIndexLayer, adaptEventsOfChild, addAngleAxis, addLine, addRadiusAxis, addZAxis, arrayTooltipSearcher, combineAllBarPositions, combineAxisTicks, combineBarPosition, combineBarSizeList, combineCategoricalDomain, combineConfiguredScale, combineDisplayedStackedData, combineGraphicalItemTicks, combineStackGroups, combineStackedData, defaultPolarAngleAxisProps, defaultPolarChartProps, defaultPolarRadiusAxisProps, degreeToRadian, findAllByType, getAxisTypeBasedOnLayout, getBandSizeOfAxis, getBaseValueOfBar, getCateCoordinateOfBar, getCateCoordinateOfLine, getClassNameFromUnknown, getLinearRegression, getNormalizedStackId, getTooltipNameProp, getValueByDataKey, getZIndexFromUnknown, implicitZAxis, interpolate, isCategoricalAxis, isClipDot, isNonEmptyArray, isNullish, isNumOrStr, isNumber, isStacked, isWellBehavedNumber, matchAnimationItems, matchAppend, matchByIndex, mathSign, noop, pickAxisType, polarToCartesian, propsAreEqual, rechartsScaleFactory, rectWithCoords, removeAngleAxis, removeLine, removeRadiusAxis, removeZAxis, replaceZAxis, resolveDefaultProps, round, roundTemplateLiteral, selectActiveTooltipIndex, selectAngleAxis, selectAngleAxisRangeWithReversed, selectAxisScale, selectAxisWithScale, selectBarCategoryGap, selectBarGap, selectChartDataAndAlwaysIgnoreIndexes, selectChartDataWithIndexes, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectChartLayout, selectDuplicateDomain, selectPolarAppliedValues, selectPolarAxisCheckedDomain, selectPolarItemsSettings, selectPolarNiceTicks, selectPolarViewBox, selectRadiusAxis, selectRadiusAxisRangeWithReversed, selectRealScaleType, selectRenderableAxisSettings, selectReverseStackOrder, selectRootBarSize, selectRootMaxBarSize, selectStackOffsetType, selectTicksOfGraphicalItem, selectTooltipAxis, selectUnfilteredCartesianItems, selectUnfilteredPolarItems, selectXAxisSettings, selectYAxisSettings, selectZAxisWithScale, svgPropertiesAndEvents, svgPropertiesNoEvents, svgPropertiesNoEventsFromUnknown, truncateByDomain, upperFirst, useAnimationCallbacks, useAnimationStartSnapshot, useAppDispatch, useAppSelector, useCartesianChartLayout, useChartLayout, useClipPathId, useIsPanorama, useMouseClickItemDispatch, useMouseEnterItemDispatch, useMouseLeaveItemDispatch, useNeedsClip, usePlotArea, usePolarChartLayout, useViewBox } from "./recharts+[...].mjs";
import { Symbol as Symbol$1, circle, cross, diamond, square, star, triangle, wye } from "./d3-shape.mjs";
import { createSelector } from "./@reduxjs/toolkit+[...].mjs";
import { ActivePoints, Dot, Dots, getRadiusAndStrokeWidthFromDot } from "./recharts2.mjs";
import { last, maxBy, minBy } from "./es-toolkit2.mjs";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Symbols.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$11 = [
	"type",
	"size",
	"sizeType"
];
function _extends$11() {
	return _extends$11 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$11.apply(null, arguments);
}
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r) {
			_defineProperty$12(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$12(e, r, t) {
	return (r = _toPropertyKey$12(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$12(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$11(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$11(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$11(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var symbolFactories = {
	symbolCircle: circle,
	symbolCross: cross,
	symbolDiamond: diamond,
	symbolSquare: square,
	symbolStar: star,
	symbolTriangle: triangle,
	symbolWye: wye
};
var RADIAN = Math.PI / 180;
var getSymbolFactory = (type) => {
	return symbolFactories["symbol".concat(upperFirst(type))] || circle;
};
var calculateAreaSize = (size, sizeType, type) => {
	if (sizeType === "area") return size;
	switch (type) {
		case "cross": return 5 * size * size / 9;
		case "diamond": return .5 * size * size / Math.sqrt(3);
		case "square": return size * size;
		case "star":
			var angle = 18 * RADIAN;
			return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
		case "triangle": return Math.sqrt(3) * size * size / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * size * size / 8;
		default: return Math.PI * size * size / 4;
	}
};
var registerSymbol = (key, factory) => {
	symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
/**
* Renders a symbol from a set of predefined shapes.
*/
var Symbols = (_ref) => {
	var _ref$type = _ref.type, type = _ref$type === void 0 ? "circle" : _ref$type, _ref$size = _ref.size, size = _ref$size === void 0 ? 64 : _ref$size, _ref$sizeType = _ref.sizeType, sizeType = _ref$sizeType === void 0 ? "area" : _ref$sizeType;
	var props = _objectSpread$12(_objectSpread$12({}, _objectWithoutProperties$11(_ref, _excluded$11)), {}, {
		type,
		size,
		sizeType
	});
	var realType = "circle";
	if (typeof type === "string") realType = type;
	/**
	* Calculate the path of curve
	* @return {String} path
	*/
	var getPath = () => {
		var symbolFactory = getSymbolFactory(realType);
		var s = Symbol$1().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType))();
		if (s === null) return;
		return s;
	};
	var className = props.className, cx = props.cx, cy = props.cy;
	var filteredProps = svgPropertiesAndEvents(props);
	if (isNumber(cx) && isNumber(cy) && isNumber(size)) return /*#__PURE__*/ import_react.createElement("path", _extends$11({}, filteredProps, {
		className: clsx("recharts-symbols", className),
		transform: "translate(".concat(cx, ", ").concat(cy, ")"),
		d: getPath()
	}));
	return null;
};
Symbols.registerSymbol = registerSymbol;
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/shape/Polygon.js
/**
* @fileOverview Polygon
*/
var _excluded$10 = [
	"points",
	"className",
	"baseLinePoints",
	"connectNulls"
];
var _templateObject;
function _extends$10() {
	return _extends$10 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$10.apply(null, arguments);
}
function _objectWithoutProperties$10(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$10(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$10(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var isValidatePoint = (point) => {
	return point != null && point.x === +point.x && point.y === +point.y;
};
var getParsedPoints = function getParsedPoints() {
	var points = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var segmentPoints = [[]];
	points.forEach((entry) => {
		var lastLink = segmentPoints[segmentPoints.length - 1];
		if (isValidatePoint(entry)) {
			if (lastLink) lastLink.push(entry);
		} else if (lastLink && lastLink.length > 0) segmentPoints.push([]);
	});
	var firstPoint = points[0];
	var lastLink = segmentPoints[segmentPoints.length - 1];
	if (isValidatePoint(firstPoint) && lastLink) lastLink.push(firstPoint);
	var finalLink = segmentPoints[segmentPoints.length - 1];
	if (finalLink && finalLink.length <= 0) segmentPoints = segmentPoints.slice(0, -1);
	return segmentPoints;
};
var getSinglePolygonPath = (points, connectNulls) => {
	var segmentPoints = getParsedPoints(points);
	if (connectNulls) segmentPoints = [segmentPoints.reduce((res, segPoints) => {
		return [...res, ...segPoints];
	}, [])];
	var polygonPath = segmentPoints.map((segPoints) => {
		return segPoints.reduce((path, point, index) => {
			return roundTemplateLiteral(_templateObject || (_templateObject = _taggedTemplateLiteral([
				"",
				"",
				"",
				",",
				""
			])), path, index === 0 ? "M" : "L", point.x, point.y);
		}, "");
	}).join("");
	return segmentPoints.length === 1 ? "".concat(polygonPath, "Z") : polygonPath;
};
var getRanglePath = (points, baseLinePoints, connectNulls) => {
	var outerPath = getSinglePolygonPath(points, connectNulls);
	return "".concat(outerPath.slice(-1) === "Z" ? outerPath.slice(0, -1) : outerPath, "L").concat(getSinglePolygonPath(Array.from(baseLinePoints).reverse(), connectNulls).slice(1));
};
var Polygon = (props) => {
	var points = props.points, className = props.className, baseLinePoints = props.baseLinePoints, connectNulls = props.connectNulls, others = _objectWithoutProperties$10(props, _excluded$10);
	if (!points || !points.length) return null;
	var layerClass = clsx("recharts-polygon", className);
	if (baseLinePoints && baseLinePoints.length) {
		var hasStroke = others.stroke && others.stroke !== "none";
		var rangePath = getRanglePath(points, baseLinePoints, connectNulls);
		return /*#__PURE__*/ import_react.createElement("g", { className: layerClass }, /*#__PURE__*/ import_react.createElement("path", _extends$10({}, svgPropertiesAndEvents(others), {
			fill: rangePath.slice(-1) === "Z" ? others.fill : "none",
			stroke: "none",
			d: rangePath
		})), hasStroke ? /*#__PURE__*/ import_react.createElement("path", _extends$10({}, svgPropertiesAndEvents(others), {
			fill: "none",
			d: getSinglePolygonPath(points, connectNulls)
		})) : null, hasStroke ? /*#__PURE__*/ import_react.createElement("path", _extends$10({}, svgPropertiesAndEvents(others), {
			fill: "none",
			d: getSinglePolygonPath(baseLinePoints, connectNulls)
		})) : null);
	}
	var singlePath = getSinglePolygonPath(points, connectNulls);
	return /*#__PURE__*/ import_react.createElement("path", _extends$10({}, svgPropertiesAndEvents(others), {
		fill: singlePath.slice(-1) === "Z" ? others.fill : "none",
		className: layerClass,
		d: singlePath
	}));
};
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/polarScaleSelectors.js
var selectPolarAxis = (state, axisType, axisId) => {
	switch (axisType) {
		case "angleAxis": return selectAngleAxis(state, axisId);
		case "radiusAxis": return selectRadiusAxis(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectPolarAxisRangeWithReversed = (state, axisType, axisId) => {
	switch (axisType) {
		case "angleAxis": return selectAngleAxisRangeWithReversed(state, axisId);
		case "radiusAxis": return selectRadiusAxisRangeWithReversed(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectPolarConfiguredScale = createSelector([
	selectPolarAxis,
	selectRealScaleType,
	selectPolarAxisCheckedDomain,
	selectPolarAxisRangeWithReversed
], combineConfiguredScale);
var selectPolarAxisScale = createSelector([selectPolarConfiguredScale], rechartsScaleFactory);
var selectPolarCategoricalDomain = createSelector([
	selectChartLayout,
	selectPolarAppliedValues,
	selectRenderableAxisSettings,
	pickAxisType
], combineCategoricalDomain);
var selectPolarAxisTicks = createSelector([
	selectChartLayout,
	selectPolarAxis,
	selectRealScaleType,
	selectPolarAxisScale,
	selectPolarNiceTicks,
	selectPolarAxisRangeWithReversed,
	selectDuplicateDomain,
	selectPolarCategoricalDomain,
	pickAxisType
], combineAxisTicks);
var selectPolarAngleAxisTicks = createSelector([selectPolarAxisTicks], (ticks) => {
	if (!ticks) return;
	var uniqueTicksMap = /* @__PURE__ */ new Map();
	ticks.forEach((tick) => {
		var normalizedCoordinate = (tick.coordinate + 360) % 360;
		if (!uniqueTicksMap.has(normalizedCoordinate)) uniqueTicksMap.set(normalizedCoordinate, tick);
	});
	return Array.from(uniqueTicksMap.values());
});
var selectPolarGraphicalItemAxisTicks = createSelector([
	selectChartLayout,
	selectPolarAxis,
	selectPolarAxisScale,
	selectPolarAxisRangeWithReversed,
	selectDuplicateDomain,
	selectPolarCategoricalDomain,
	pickAxisType
], combineGraphicalItemTicks);
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/polarGridSelectors.js
var selectAngleAxisTicks$2 = (state, anglexisId) => selectPolarAxisTicks(state, "angleAxis", anglexisId, false);
var selectPolarGridAngles = createSelector([selectAngleAxisTicks$2], (ticks) => {
	if (!ticks) return;
	return ticks.map((tick) => tick.coordinate);
});
var selectRadiusAxisTicks$2 = (state, radiusAxisId) => selectPolarAxisTicks(state, "radiusAxis", radiusAxisId, false);
var selectPolarGridRadii = createSelector([selectRadiusAxisTicks$2], (ticks) => {
	if (!ticks) return;
	return ticks.map((tick) => tick.coordinate);
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/polar/PolarGrid.js
var _excluded$9 = [
	"gridType",
	"radialLines",
	"angleAxisId",
	"radiusAxisId",
	"cx",
	"cy",
	"innerRadius",
	"outerRadius",
	"polarAngles",
	"polarRadius",
	"zIndex"
];
function _objectWithoutProperties$9(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends$9() {
	return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$9.apply(null, arguments);
}
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r) {
			_defineProperty$11(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$11(e, r, t) {
	return (r = _toPropertyKey$11(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$11(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getPolygonPath = (radius, cx, cy, polarAngles) => {
	var path = "";
	polarAngles.forEach((angle, i) => {
		var point = polarToCartesian(cx, cy, radius, angle);
		if (i) path += "L ".concat(point.x, ",").concat(point.y);
		else path += "M ".concat(point.x, ",").concat(point.y);
	});
	path += "Z";
	return path;
};
var PolarAngles = (props) => {
	var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, polarAngles = props.polarAngles, radialLines = props.radialLines;
	if (!polarAngles || !polarAngles.length || !radialLines) return null;
	var polarAnglesProps = _objectSpread$11({}, svgPropertiesNoEvents(props));
	return /*#__PURE__*/ import_react.createElement("g", { className: "recharts-polar-grid-angle" }, polarAngles.map((entry) => {
		var start = polarToCartesian(cx, cy, innerRadius, entry);
		var end = polarToCartesian(cx, cy, outerRadius, entry);
		return /*#__PURE__*/ import_react.createElement("line", _extends$9({ key: "line-".concat(entry) }, polarAnglesProps, {
			x1: start.x,
			y1: start.y,
			x2: end.x,
			y2: end.y
		}));
	}));
};
var ConcentricCircle = (props) => {
	var cx = props.cx, cy = props.cy, radius = props.radius;
	var concentricCircleProps = _objectSpread$11({}, svgPropertiesNoEvents(props));
	return /*#__PURE__*/ import_react.createElement("circle", _extends$9({}, concentricCircleProps, {
		className: clsx("recharts-polar-grid-concentric-circle", props.className),
		cx,
		cy,
		r: radius
	}));
};
var ConcentricPolygon = (props) => {
	var radius = props.radius;
	var concentricPolygonProps = _objectSpread$11({}, svgPropertiesNoEvents(props));
	return /*#__PURE__*/ import_react.createElement("path", _extends$9({}, concentricPolygonProps, {
		className: clsx("recharts-polar-grid-concentric-polygon", props.className),
		d: getPolygonPath(radius, props.cx, props.cy, props.polarAngles)
	}));
};
var ConcentricGridPath = (props) => {
	var polarRadius = props.polarRadius, gridType = props.gridType;
	if (!polarRadius || !polarRadius.length) return null;
	var maxPolarRadius = Math.max(...polarRadius);
	var renderBackground = props.fill && props.fill !== "none";
	return /*#__PURE__*/ import_react.createElement("g", { className: "recharts-polar-grid-concentric" }, renderBackground && gridType === "circle" && /*#__PURE__*/ import_react.createElement(ConcentricCircle, _extends$9({}, props, { radius: maxPolarRadius })), renderBackground && gridType !== "circle" && /*#__PURE__*/ import_react.createElement(ConcentricPolygon, _extends$9({}, props, { radius: maxPolarRadius })), polarRadius.map((entry, i) => {
		var key = i;
		if (gridType === "circle") return /*#__PURE__*/ import_react.createElement(ConcentricCircle, _extends$9({ key }, props, {
			fill: "none",
			radius: entry
		}));
		return /*#__PURE__*/ import_react.createElement(ConcentricPolygon, _extends$9({ key }, props, {
			fill: "none",
			radius: entry
		}));
	}));
};
var defaultPolarGridProps = {
	angleAxisId: 0,
	radiusAxisId: 0,
	gridType: "polygon",
	radialLines: true,
	zIndex: DefaultZIndexes.grid,
	stroke: "#ccc",
	strokeWidth: 1,
	fill: "none"
};
/**
* @consumes PolarViewBoxContext
*/
var PolarGrid = (outsideProps) => {
	var _ref, _polarViewBox$cx, _ref2, _polarViewBox$cy, _ref3, _polarViewBox$innerRa, _ref4, _polarViewBox$outerRa;
	var _resolveDefaultProps = resolveDefaultProps(outsideProps, defaultPolarGridProps), gridType = _resolveDefaultProps.gridType, radialLines = _resolveDefaultProps.radialLines, angleAxisId = _resolveDefaultProps.angleAxisId, radiusAxisId = _resolveDefaultProps.radiusAxisId, cxFromOutside = _resolveDefaultProps.cx, cyFromOutside = _resolveDefaultProps.cy, innerRadiusFromOutside = _resolveDefaultProps.innerRadius, outerRadiusFromOutside = _resolveDefaultProps.outerRadius, polarAnglesInput = _resolveDefaultProps.polarAngles, polarRadiusInput = _resolveDefaultProps.polarRadius, zIndex = _resolveDefaultProps.zIndex, inputs = _objectWithoutProperties$9(_resolveDefaultProps, _excluded$9);
	var polarViewBox = useAppSelector(selectPolarViewBox);
	var polarAnglesFromRedux = useAppSelector((state) => selectPolarGridAngles(state, angleAxisId));
	var polarRadiiFromRedux = useAppSelector((state) => selectPolarGridRadii(state, radiusAxisId));
	var polarAngles = Array.isArray(polarAnglesInput) ? polarAnglesInput : polarAnglesFromRedux;
	var polarRadius = Array.isArray(polarRadiusInput) ? polarRadiusInput : polarRadiiFromRedux;
	if (polarAngles == null || polarRadius == null) return null;
	var props = _objectSpread$11({
		cx: (_ref = (_polarViewBox$cx = polarViewBox === null || polarViewBox === void 0 ? void 0 : polarViewBox.cx) !== null && _polarViewBox$cx !== void 0 ? _polarViewBox$cx : cxFromOutside) !== null && _ref !== void 0 ? _ref : 0,
		cy: (_ref2 = (_polarViewBox$cy = polarViewBox === null || polarViewBox === void 0 ? void 0 : polarViewBox.cy) !== null && _polarViewBox$cy !== void 0 ? _polarViewBox$cy : cyFromOutside) !== null && _ref2 !== void 0 ? _ref2 : 0,
		innerRadius: (_ref3 = (_polarViewBox$innerRa = polarViewBox === null || polarViewBox === void 0 ? void 0 : polarViewBox.innerRadius) !== null && _polarViewBox$innerRa !== void 0 ? _polarViewBox$innerRa : innerRadiusFromOutside) !== null && _ref3 !== void 0 ? _ref3 : 0,
		outerRadius: (_ref4 = (_polarViewBox$outerRa = polarViewBox === null || polarViewBox === void 0 ? void 0 : polarViewBox.outerRadius) !== null && _polarViewBox$outerRa !== void 0 ? _polarViewBox$outerRa : outerRadiusFromOutside) !== null && _ref4 !== void 0 ? _ref4 : 0,
		polarAngles,
		polarRadius,
		zIndex
	}, inputs);
	if (props.outerRadius <= 0) return null;
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement("g", { className: "recharts-polar-grid" }, /*#__PURE__*/ import_react.createElement(ConcentricGridPath, _extends$9({
		gridType,
		radialLines
	}, props, {
		polarAngles,
		polarRadius
	})), /*#__PURE__*/ import_react.createElement(PolarAngles, _extends$9({
		gridType,
		radialLines
	}, props, {
		polarAngles,
		polarRadius
	}))));
};
PolarGrid.displayName = "PolarGrid";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/polar/PolarRadiusAxis.js
var _excluded$8 = ["type"];
var _excluded2$4 = [
	"cx",
	"cy",
	"angle",
	"axisLine"
];
var _excluded3$3 = [
	"angle",
	"tickFormatter",
	"stroke",
	"tick"
];
function _extends$8() {
	return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$8.apply(null, arguments);
}
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r) {
			_defineProperty$10(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$10(e, r, t) {
	return (r = _toPropertyKey$10(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$10(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$8(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var AXIS_TYPE$1 = "radiusAxis";
function SetRadiusAxisSettings(props) {
	var dispatch = useAppDispatch();
	var layout = usePolarChartLayout();
	var settings = (0, import_react.useMemo)(() => {
		var typeFromProps = props.type, rest = _objectWithoutProperties$8(props, _excluded$8);
		var evaluatedType = getAxisTypeBasedOnLayout(layout, "radiusAxis", typeFromProps);
		if (evaluatedType == null) return;
		return _objectSpread$10(_objectSpread$10({}, rest), {}, { type: evaluatedType });
	}, [props, layout]);
	(0, import_react.useEffect)(() => {
		if (settings == null) return noop;
		dispatch(addRadiusAxis(settings));
		return () => {
			dispatch(removeRadiusAxis(settings));
		};
	}, [dispatch, settings]);
	return null;
}
/**
* Calculate the coordinate of tick
* @param coordinate The radius of tick
* @param angle from props
* @param cx from chart
* @param cy from chart
* @return (x, y)
*/
var getTickValueCoord = (_ref, angle, cx, cy) => {
	var coordinate = _ref.coordinate;
	return polarToCartesian(cx, cy, coordinate, angle);
};
var getTickTextAnchor$1 = (orientation) => {
	var textAnchor;
	switch (orientation) {
		case "left":
			textAnchor = "end";
			break;
		case "right":
			textAnchor = "start";
			break;
		default: textAnchor = "middle";
	}
	return textAnchor;
};
var getViewBox = (angle, cx, cy, ticks) => {
	var maxRadiusTick = maxBy(ticks, (entry) => entry.coordinate || 0);
	var minRadiusTick = minBy(ticks, (entry) => entry.coordinate || 0);
	return {
		cx,
		cy,
		startAngle: angle,
		endAngle: angle,
		innerRadius: (minRadiusTick === null || minRadiusTick === void 0 ? void 0 : minRadiusTick.coordinate) || 0,
		outerRadius: (maxRadiusTick === null || maxRadiusTick === void 0 ? void 0 : maxRadiusTick.coordinate) || 0,
		clockWise: false
	};
};
var renderAxisLine = (props, ticks) => {
	var cx = props.cx, cy = props.cy, angle = props.angle, axisLine = props.axisLine, others = _objectWithoutProperties$8(props, _excluded2$4);
	var extent = ticks.reduce((result, entry) => [Math.min(result[0], entry.coordinate), Math.max(result[1], entry.coordinate)], [Infinity, -Infinity]);
	var point0 = polarToCartesian(cx, cy, extent[0], angle);
	var point1 = polarToCartesian(cx, cy, extent[1], angle);
	var axisLineProps = _objectSpread$10(_objectSpread$10(_objectSpread$10({}, svgPropertiesNoEvents(others)), {}, { fill: "none" }, svgPropertiesNoEvents(axisLine)), {}, {
		x1: point0.x,
		y1: point0.y,
		x2: point1.x,
		y2: point1.y
	});
	return /*#__PURE__*/ import_react.createElement("line", _extends$8({ className: "recharts-polar-radius-axis-line" }, axisLineProps));
};
var renderTickItem = (option, tickProps, value) => {
	var tickItem;
	if (/*#__PURE__*/ import_react.isValidElement(option)) tickItem = /*#__PURE__*/ import_react.cloneElement(option, tickProps);
	else if (typeof option === "function") tickItem = option(tickProps);
	else tickItem = /*#__PURE__*/ import_react.createElement(Text, _extends$8({}, tickProps, { className: "recharts-polar-radius-axis-tick-value" }), value);
	return tickItem;
};
var renderTicks = (props, ticks) => {
	var angle = props.angle, tickFormatter = props.tickFormatter, stroke = props.stroke, tick = props.tick, others = _objectWithoutProperties$8(props, _excluded3$3);
	var textAnchor = getTickTextAnchor$1(props.orientation);
	var axisProps = svgPropertiesNoEvents(others);
	var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
	var items = ticks.map((entry, i) => {
		var coord = getTickValueCoord(entry, props.angle, props.cx, props.cy);
		var tickProps = _objectSpread$10(_objectSpread$10(_objectSpread$10(_objectSpread$10({
			textAnchor,
			transform: "rotate(".concat(90 - angle, ", ").concat(coord.x, ", ").concat(coord.y, ")")
		}, axisProps), {}, {
			stroke: "none",
			fill: stroke
		}, customTickProps), {}, { index: i }, coord), {}, { payload: entry });
		return /*#__PURE__*/ import_react.createElement(Layer, _extends$8({
			className: clsx("recharts-polar-radius-axis-tick", getClassNameFromUnknown(tick)),
			key: "tick-".concat(entry.coordinate)
		}, adaptEventsOfChild(props, entry, i)), renderTickItem(tick, tickProps, tickFormatter ? tickFormatter(entry.value, i) : entry.value));
	});
	return /*#__PURE__*/ import_react.createElement(Layer, { className: "recharts-polar-radius-axis-ticks" }, items);
};
var PolarRadiusAxisWrapper = (defaultsAndInputs) => {
	var radiusAxisId = defaultsAndInputs.radiusAxisId;
	var viewBox = useAppSelector(selectPolarViewBox);
	var scale = useAppSelector((state) => selectPolarAxisScale(state, "radiusAxis", radiusAxisId));
	var ticks = useAppSelector((state) => selectPolarAxisTicks(state, "radiusAxis", radiusAxisId, false));
	if (viewBox == null || !ticks || !ticks.length || scale == null) return null;
	var props = _objectSpread$10(_objectSpread$10({}, defaultsAndInputs), {}, { scale }, viewBox);
	var tick = props.tick, axisLine = props.axisLine;
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: clsx("recharts-polar-radius-axis", AXIS_TYPE$1, props.className) }, axisLine && renderAxisLine(props, ticks), tick && renderTicks(props, ticks), /*#__PURE__*/ import_react.createElement(PolarLabelContextProvider, getViewBox(props.angle, props.cx, props.cy, ticks), /*#__PURE__*/ import_react.createElement(PolarLabelFromLabelProp, { label: props.label }), props.children)));
};
/**
* @provides PolarLabelContext
* @consumes PolarViewBoxContext
*/
function PolarRadiusAxis(outsideProps) {
	var _props$niceTicks;
	var props = resolveDefaultProps(outsideProps, defaultPolarRadiusAxisProps);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetRadiusAxisSettings, {
		domain: props.domain,
		id: props.radiusAxisId,
		scale: props.scale,
		type: props.type,
		dataKey: props.dataKey,
		unit: void 0,
		name: props.name,
		allowDuplicatedCategory: props.allowDuplicatedCategory,
		allowDataOverflow: props.allowDataOverflow,
		reversed: props.reversed,
		includeHidden: props.includeHidden,
		allowDecimals: props.allowDecimals,
		niceTicks: (_props$niceTicks = props.niceTicks) !== null && _props$niceTicks !== void 0 ? _props$niceTicks : "auto",
		ticks: props.ticks,
		tickCount: props.tickCount,
		tick: props.tick
	}), /*#__PURE__*/ import_react.createElement(PolarRadiusAxisWrapper, props));
}
PolarRadiusAxis.displayName = "PolarRadiusAxis";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/polar/PolarAngleAxis.js
var _excluded$7 = ["children", "type"];
var _excluded2$3 = ["ref"];
function _extends$7() {
	return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$7.apply(null, arguments);
}
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r) {
			_defineProperty$9(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$9(e, r, t) {
	return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$7(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var eps = 1e-5;
var COS_45 = Math.cos(degreeToRadian(45));
var AXIS_TYPE = "angleAxis";
function SetAngleAxisSettings(props) {
	var dispatch = useAppDispatch();
	var layout = usePolarChartLayout();
	var settings = (0, import_react.useMemo)(() => {
		props.children;
		var typeFromProps = props.type, rest = _objectWithoutProperties$7(props, _excluded$7);
		var evaluatedType = getAxisTypeBasedOnLayout(layout, "angleAxis", typeFromProps);
		if (evaluatedType == null) return;
		return _objectSpread$9(_objectSpread$9({}, rest), {}, { type: evaluatedType });
	}, [props, layout]);
	var settingsAreSynchronized = settings === useAppSelector((state) => selectAngleAxis(state, settings === null || settings === void 0 ? void 0 : settings.id));
	(0, import_react.useEffect)(() => {
		if (settings == null) return noop;
		dispatch(addAngleAxis(settings));
		return () => {
			dispatch(removeAngleAxis(settings));
		};
	}, [dispatch, settings]);
	if (settingsAreSynchronized) return props.children;
	return null;
}
/**
* Calculate the coordinate of line endpoint
* @param data The data if there are ticks
* @param props axis settings
* @return (x1, y1): The point close to text,
*         (x2, y2): The point close to axis
*/
var getTickLineCoord = (data, props) => {
	var cx = props.cx, cy = props.cy, radius = props.radius, orientation = props.orientation;
	var tickLineSize = props.tickSize || 8;
	var p1 = polarToCartesian(cx, cy, radius, data.coordinate);
	var p2 = polarToCartesian(cx, cy, radius + (orientation === "inner" ? -1 : 1) * tickLineSize, data.coordinate);
	return {
		x1: p1.x,
		y1: p1.y,
		x2: p2.x,
		y2: p2.y
	};
};
/**
* Get the text-anchor of each tick
* @param data Data of ticks
* @param orientation of the axis ticks
* @return text-anchor
*/
var getTickTextAnchor = (data, orientation) => {
	var cos = Math.cos(degreeToRadian(-data.coordinate));
	if (cos > eps) return orientation === "outer" ? "start" : "end";
	if (cos < -eps) return orientation === "outer" ? "end" : "start";
	return "middle";
};
/**
* Get the text vertical anchor of each tick
* @param data Data of a tick
* @return text vertical anchor
*/
var getTickTextVerticalAnchor = (data) => {
	var cos = Math.cos(degreeToRadian(-data.coordinate));
	var sin = Math.sin(degreeToRadian(-data.coordinate));
	if (Math.abs(cos) <= COS_45) return sin > 0 ? "start" : "end";
	return "middle";
};
var AxisLine = (props) => {
	var cx = props.cx, cy = props.cy, radius = props.radius, axisLineType = props.axisLineType, axisLine = props.axisLine, ticks = props.ticks;
	if (!axisLine) return null;
	var axisLineProps = _objectSpread$9(_objectSpread$9({}, svgPropertiesNoEvents(props)), {}, { fill: "none" }, svgPropertiesNoEvents(axisLine));
	if (axisLineType === "circle") return /*#__PURE__*/ import_react.createElement(Dot, _extends$7({ className: "recharts-polar-angle-axis-line" }, axisLineProps, {
		cx,
		cy,
		r: radius
	}));
	var points = ticks.map((entry) => polarToCartesian(cx, cy, radius, entry.coordinate));
	return /*#__PURE__*/ import_react.createElement(Polygon, _extends$7({ className: "recharts-polar-angle-axis-line" }, axisLineProps, { points }));
};
var TickItemText = (_ref) => {
	var tick = _ref.tick, tickProps = _ref.tickProps, value = _ref.value;
	if (!tick) return null;
	if (/*#__PURE__*/ import_react.isValidElement(tick)) return /*#__PURE__*/ import_react.cloneElement(tick, tickProps);
	if (typeof tick === "function") return tick(tickProps);
	return /*#__PURE__*/ import_react.createElement(Text, _extends$7({}, tickProps, { className: "recharts-polar-angle-axis-tick-value" }), value);
};
var Ticks = (props) => {
	var tick = props.tick, tickLine = props.tickLine, tickFormatter = props.tickFormatter, stroke = props.stroke, ticks = props.ticks, _svgPropertiesNoEvent = svgPropertiesNoEvents(props);
	_svgPropertiesNoEvent.ref;
	var axisProps = _objectWithoutProperties$7(_svgPropertiesNoEvent, _excluded2$3);
	var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
	var tickLineProps = _objectSpread$9(_objectSpread$9({}, axisProps), {}, { fill: "none" }, svgPropertiesNoEvents(tickLine));
	var items = ticks.map((entry, i) => {
		var lineCoord = getTickLineCoord(entry, props);
		var textAnchor = getTickTextAnchor(entry, props.orientation);
		var verticalAnchor = getTickTextVerticalAnchor(entry);
		var tickProps = _objectSpread$9(_objectSpread$9(_objectSpread$9({}, axisProps), {}, {
			textAnchor,
			verticalAnchor,
			stroke: "none",
			fill: stroke
		}, customTickProps), {}, {
			index: i,
			payload: entry,
			x: lineCoord.x2,
			y: lineCoord.y2
		});
		return /*#__PURE__*/ import_react.createElement(Layer, _extends$7({
			className: clsx("recharts-polar-angle-axis-tick", getClassNameFromUnknown(tick)),
			key: "tick-".concat(entry.coordinate)
		}, adaptEventsOfChild(props, entry, i)), tickLine && /*#__PURE__*/ import_react.createElement("line", _extends$7({ className: "recharts-polar-angle-axis-tick-line" }, tickLineProps, lineCoord)), /*#__PURE__*/ import_react.createElement(TickItemText, {
			tick,
			tickProps,
			value: tickFormatter ? tickFormatter(entry.value, i) : entry.value
		}));
	});
	return /*#__PURE__*/ import_react.createElement(Layer, { className: "recharts-polar-angle-axis-ticks" }, items);
};
var PolarAngleAxisWrapper = (defaultsAndInputs) => {
	var angleAxisId = defaultsAndInputs.angleAxisId;
	var viewBox = useAppSelector(selectPolarViewBox);
	var scale = useAppSelector((state) => selectPolarAxisScale(state, "angleAxis", angleAxisId));
	var isPanorama = useIsPanorama();
	var ticks = useAppSelector((state) => selectPolarAngleAxisTicks(state, "angleAxis", angleAxisId, isPanorama));
	if (viewBox == null || !ticks || !ticks.length || scale == null) return null;
	var props = _objectSpread$9(_objectSpread$9(_objectSpread$9({}, defaultsAndInputs), {}, { scale }, viewBox), {}, {
		radius: viewBox.outerRadius,
		ticks
	});
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: clsx("recharts-polar-angle-axis", AXIS_TYPE, props.className) }, /*#__PURE__*/ import_react.createElement(AxisLine, props), /*#__PURE__*/ import_react.createElement(Ticks, props)));
};
/**
* @provides PolarLabelContext
* @consumes PolarViewBoxContext
*/
function PolarAngleAxis(outsideProps) {
	var _props$niceTicks;
	var props = resolveDefaultProps(outsideProps, defaultPolarAngleAxisProps);
	return /*#__PURE__*/ import_react.createElement(SetAngleAxisSettings, {
		id: props.angleAxisId,
		scale: props.scale,
		type: props.type,
		dataKey: props.dataKey,
		unit: void 0,
		name: props.name,
		allowDuplicatedCategory: false,
		allowDataOverflow: false,
		reversed: props.reversed,
		includeHidden: false,
		allowDecimals: props.allowDecimals,
		tickCount: props.tickCount,
		niceTicks: (_props$niceTicks = props.niceTicks) !== null && _props$niceTicks !== void 0 ? _props$niceTicks : "auto",
		ticks: props.ticks,
		tick: props.tick,
		domain: props.domain
	}, /*#__PURE__*/ import_react.createElement(PolarAngleAxisWrapper, props));
}
PolarAngleAxis.displayName = "PolarAngleAxis";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/radarSelectors.js
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r) {
			_defineProperty$8(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$8(e, r, t) {
	return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var selectRadiusAxisScale = (state, radiusAxisId) => selectPolarAxisScale(state, "radiusAxis", radiusAxisId);
var selectRadiusAxisForRadar = createSelector([selectRadiusAxisScale], (scale) => {
	if (scale == null) return;
	return { scale };
});
var selectRadiusAxisForBandSize = createSelector([selectRadiusAxis, selectRadiusAxisScale], (axisSettings, scale) => {
	if (axisSettings == null || scale == null) return;
	return _objectSpread$8(_objectSpread$8({}, axisSettings), {}, { scale });
});
var selectRadiusAxisTicks$1 = (state, radiusAxisId, _angleAxisId, isPanorama) => {
	return selectPolarAxisTicks(state, "radiusAxis", radiusAxisId, isPanorama);
};
var selectAngleAxisForRadar = (state, _radiusAxisId, angleAxisId) => selectAngleAxis(state, angleAxisId);
var selectPolarAxisScaleForRadar = (state, _radiusAxisId, angleAxisId) => selectPolarAxisScale(state, "angleAxis", angleAxisId);
var selectAngleAxisForBandSize = createSelector([selectAngleAxisForRadar, selectPolarAxisScaleForRadar], (axisSettings, scale) => {
	if (axisSettings == null || scale == null) return;
	return _objectSpread$8(_objectSpread$8({}, axisSettings), {}, { scale });
});
var selectAngleAxisTicks$1 = (state, _radiusAxisId, angleAxisId, isPanorama) => {
	return selectPolarAxisTicks(state, "angleAxis", angleAxisId, isPanorama);
};
var selectAngleAxisWithScaleAndViewport = createSelector([
	selectAngleAxisForRadar,
	selectPolarAxisScaleForRadar,
	selectPolarViewBox
], (axisOptions, scale, polarViewBox) => {
	if (polarViewBox == null || scale == null) return;
	return {
		scale,
		type: axisOptions.type,
		dataKey: axisOptions.dataKey,
		cx: polarViewBox.cx,
		cy: polarViewBox.cy
	};
});
var pickId = (_state, _radiusAxisId, _angleAxisId, _isPanorama, radarId) => radarId;
var selectBandSizeOfAxis = createSelector([
	selectChartLayout,
	selectRadiusAxisForBandSize,
	selectRadiusAxisTicks$1,
	selectAngleAxisForBandSize,
	selectAngleAxisTicks$1
], (layout, radiusAxis, radiusAxisTicks, angleAxis, angleAxisTicks) => {
	if (isCategoricalAxis(layout, "radiusAxis")) return getBandSizeOfAxis(radiusAxis, radiusAxisTicks, false);
	return getBandSizeOfAxis(angleAxis, angleAxisTicks, false);
});
var selectSynchronisedRadarDataKey = createSelector([selectUnfilteredPolarItems, pickId], (graphicalItems, radarId) => {
	if (graphicalItems == null) return;
	var pgis = graphicalItems.find((item) => item.type === "radar" && radarId === item.id);
	return pgis === null || pgis === void 0 ? void 0 : pgis.dataKey;
});
var selectRadarPoints = createSelector([
	selectRadiusAxisForRadar,
	selectAngleAxisWithScaleAndViewport,
	selectChartDataAndAlwaysIgnoreIndexes,
	selectSynchronisedRadarDataKey,
	selectBandSizeOfAxis
], (radiusAxis, angleAxis, _ref, dataKey, bandSize) => {
	var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
	if (radiusAxis == null || angleAxis == null || chartData == null || bandSize == null || dataKey == null) return;
	return computeRadarPoints({
		radiusAxis,
		angleAxis,
		displayedData: chartData.slice(dataStartIndex, dataEndIndex + 1),
		dataKey,
		bandSize
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/polar/Radar.js
var _excluded$6 = ["id"];
function _extends$6() {
	return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$6.apply(null, arguments);
}
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty$7(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$7(e, r, t) {
	return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function getLegendItemColor(stroke, fill) {
	return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromRadarSectors = (props) => {
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
var SetRadarTooltipEntrySettings = /*#__PURE__*/ import_react.memo((_ref) => {
	var dataKey = _ref.dataKey, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, tooltipType = _ref.tooltipType, id = _ref.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: void 0,
		getPosition: noop,
		settings: {
			stroke,
			strokeWidth,
			fill,
			nameKey: void 0,
			dataKey,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: getLegendItemColor(stroke, fill),
			unit: "",
			graphicalItemId: id
		}
	};
	return /*#__PURE__*/ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function RadarDotsWrapper(_ref2) {
	var points = _ref2.points, props = _ref2.props;
	var dot = props.dot, dataKey = props.dataKey;
	props.id;
	var propsWithoutId = _objectWithoutProperties$6(props, _excluded$6);
	var baseProps = svgPropertiesNoEvents(propsWithoutId);
	return /*#__PURE__*/ import_react.createElement(Dots, {
		points,
		dot,
		className: "recharts-radar-dots",
		dotClassName: "recharts-radar-dot",
		dataKey,
		baseProps
	});
}
function computeRadarPoints(_ref3) {
	var radiusAxis = _ref3.radiusAxis, angleAxis = _ref3.angleAxis, displayedData = _ref3.displayedData, dataKey = _ref3.dataKey, bandSize = _ref3.bandSize;
	var cx = angleAxis.cx, cy = angleAxis.cy;
	var isRange = false;
	var points = [];
	var angleBandSize = angleAxis.type !== "number" ? bandSize !== null && bandSize !== void 0 ? bandSize : 0 : 0;
	displayedData.forEach((entry, i) => {
		var _angleAxis$scale$map, _radiusAxis$scale$map;
		var name = getValueByDataKey(entry, angleAxis.dataKey, i);
		var value = getValueByDataKey(entry, dataKey);
		var angle = ((_angleAxis$scale$map = angleAxis.scale.map(name)) !== null && _angleAxis$scale$map !== void 0 ? _angleAxis$scale$map : 0) + angleBandSize;
		var pointValue = Array.isArray(value) ? last(value) : value;
		var radius = isNullish(pointValue) ? 0 : (_radiusAxis$scale$map = radiusAxis.scale.map(pointValue)) !== null && _radiusAxis$scale$map !== void 0 ? _radiusAxis$scale$map : 0;
		if (Array.isArray(value) && value.length >= 2) isRange = true;
		points.push(_objectSpread$7(_objectSpread$7({}, polarToCartesian(cx, cy, radius, angle)), {}, {
			name,
			value,
			cx,
			cy,
			radius,
			angle,
			payload: entry
		}));
	});
	var baseLinePoints = [];
	if (isRange) points.forEach((point) => {
		if (Array.isArray(point.value)) {
			var _radiusAxis$scale$map2;
			var baseValue = point.value[0];
			var radius = isNullish(baseValue) ? 0 : (_radiusAxis$scale$map2 = radiusAxis.scale.map(baseValue)) !== null && _radiusAxis$scale$map2 !== void 0 ? _radiusAxis$scale$map2 : 0;
			baseLinePoints.push(_objectSpread$7(_objectSpread$7({}, point), {}, { radius }, polarToCartesian(cx, cy, radius, point.angle)));
		} else baseLinePoints.push(point);
	});
	return {
		points,
		isRange,
		baseLinePoints
	};
}
function RadarLabelListProvider(_ref4) {
	var showLabels = _ref4.showLabels, points = _ref4.points, children = _ref4.children;
	var labelListEntries = points.map((point) => {
		var _point$value;
		var viewBox = {
			x: point.x,
			y: point.y,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return _objectSpread$7(_objectSpread$7({}, viewBox), {}, {
			value: (_point$value = point.value) !== null && _point$value !== void 0 ? _point$value : "",
			payload: point.payload,
			parentViewBox: void 0,
			viewBox,
			fill: void 0
		});
	});
	return /*#__PURE__*/ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function StaticPolygon(_ref5) {
	var points = _ref5.points, baseLinePoints = _ref5.baseLinePoints, props = _ref5.props;
	if (points == null) return null;
	var shape = props.shape, isRange = props.isRange, connectNulls = props.connectNulls;
	var handleMouseEnter = (e) => {
		var onMouseEnter = props.onMouseEnter;
		if (onMouseEnter) onMouseEnter(props, e);
	};
	var handleMouseLeave = (e) => {
		var onMouseLeave = props.onMouseLeave;
		if (onMouseLeave) onMouseLeave(props, e);
	};
	var radar;
	if (/*#__PURE__*/ import_react.isValidElement(shape)) radar = /*#__PURE__*/ import_react.cloneElement(shape, _objectSpread$7(_objectSpread$7({}, props), {}, { points }));
	else if (typeof shape === "function") radar = shape(_objectSpread$7(_objectSpread$7({}, props), {}, { points }));
	else radar = /*#__PURE__*/ import_react.createElement(Polygon, _extends$6({}, svgPropertiesAndEvents(props), {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		points,
		baseLinePoints: isRange ? baseLinePoints : void 0,
		connectNulls
	}));
	return /*#__PURE__*/ import_react.createElement(Layer, { className: "recharts-radar-polygon" }, radar, /*#__PURE__*/ import_react.createElement(RadarDotsWrapper, {
		props,
		points
	}));
}
var defaultRadarAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	return items.flatMap((item) => {
		if (item.status === "removed") return [];
		if (item.status === "matched") return [_objectSpread$7(_objectSpread$7({}, item.next), {}, {
			x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
			y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
		})];
		return [_objectSpread$7(_objectSpread$7({}, item.next), {}, {
			x: interpolate(item.next.cx, item.next.x, animationElapsedTime),
			y: interpolate(item.next.cy, item.next.y, animationElapsedTime)
		})];
	});
};
function PolygonWithAnimation(_ref6) {
	var props = _ref6.props, previousPointsRef = _ref6.previousPointsRef, previousBaseLinePointsRef = _ref6.previousBaseLinePointsRef;
	var points = props.points, baseLinePoints = props.baseLinePoints, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd;
	var baseLineAnimationState = useAnimationStartSnapshot(props, previousBaseLinePointsRef);
	var prevBaseLinePoints = baseLineAnimationState.startValue;
	var baseLineAnimationItems = matchAnimationItems(prevBaseLinePoints !== null && prevBaseLinePoints !== void 0 ? prevBaseLinePoints : null, baseLinePoints, animationMatchBy);
	var _useAnimationCallback = useAnimationCallbacks(onAnimationStart, onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var layout = usePolarChartLayout();
	if (layout == null) return null;
	return /*#__PURE__*/ import_react.createElement(RadarLabelListProvider, {
		showLabels: !isAnimating,
		points
	}, /*#__PURE__*/ import_react.createElement(AnimatedItems, {
		animationInput: props,
		animationIdPrefix: "recharts-radar-",
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
	}, (stepData, animationElapsedTime) => {
		var stepBaseLinePoints = animationElapsedTime === 1 ? baseLinePoints : animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
		baseLineAnimationState.syncStepValue(stepBaseLinePoints, animationElapsedTime);
		return /*#__PURE__*/ import_react.createElement(StaticPolygon, {
			points: stepData,
			baseLinePoints: stepBaseLinePoints,
			props
		});
	}), /*#__PURE__*/ import_react.createElement(LabelListFromLabelProp, { label: props.label }), props.children);
}
function RenderPolygon(props) {
	var previousPointsRef = (0, import_react.useRef)(void 0);
	var previousBaseLinePointsRef = (0, import_react.useRef)(void 0);
	return /*#__PURE__*/ import_react.createElement(PolygonWithAnimation, {
		props,
		previousPointsRef,
		previousBaseLinePointsRef
	});
}
var defaultRadarProps = {
	activeDot: true,
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: matchByIndex,
	animationInterpolateFn: defaultRadarAnimateItems,
	dot: false,
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "rect",
	radiusAxisId: 0,
	zIndex: DefaultZIndexes.area
};
function RadarWithState(props) {
	var hide = props.hide, className = props.className, points = props.points;
	if (hide) return null;
	var layerClass = clsx("recharts-radar", className);
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: layerClass }, /*#__PURE__*/ import_react.createElement(RenderPolygon, props)), /*#__PURE__*/ import_react.createElement(ActivePoints, {
		points,
		mainColor: getLegendItemColor(props.stroke, props.fill),
		itemDataKey: props.dataKey,
		activeDot: props.activeDot
	}));
}
function RadarImpl(props) {
	var isPanorama = useIsPanorama();
	var radarPoints = useAppSelector((state) => selectRadarPoints(state, props.radiusAxisId, props.angleAxisId, isPanorama, props.id));
	if ((radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.points) == null) return null;
	return /*#__PURE__*/ import_react.createElement(RadarWithState, _extends$6({}, props, {
		points: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.points,
		baseLinePoints: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.baseLinePoints,
		isRange: radarPoints === null || radarPoints === void 0 ? void 0 : radarPoints.isRange
	}));
}
/**
* @consumes PolarChartContext
* @provides LabelListContext
*/
function Radar(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultRadarProps);
	return /*#__PURE__*/ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "radar"
	}, (id) => /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetPolarGraphicalItem, {
		type: "radar",
		id,
		data: void 0,
		dataKey: props.dataKey,
		hide: props.hide,
		angleAxisId: props.angleAxisId,
		radiusAxisId: props.radiusAxisId
	}), /*#__PURE__*/ import_react.createElement(SetPolarLegendPayload, { legendPayload: computeLegendPayloadFromRadarSectors(props) }), /*#__PURE__*/ import_react.createElement(SetRadarTooltipEntrySettings, {
		dataKey: props.dataKey,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		tooltipType: props.tooltipType,
		id
	}), /*#__PURE__*/ import_react.createElement(RadarImpl, _extends$6({}, props, { id }))));
}
Radar.displayName = "Radar";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/RadialBarUtils.js
var _excluded$5 = ["option"];
function _objectWithoutProperties$5(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var defaultRadialBarShape = Sector;
function parseCornerRadius(cornerRadius) {
	if (typeof cornerRadius === "string") return parseInt(cornerRadius, 10);
	return cornerRadius;
}
function RadialBarSector(_ref) {
	var option = _ref.option, shapeProps = _objectWithoutProperties$5(_ref, _excluded$5);
	return /*#__PURE__*/ import_react.createElement(Shape, {
		option,
		DefaultShape: defaultRadialBarShape,
		shapeProps
	});
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/radialBarSelectors.js
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty$6(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$6(e, r, t) {
	return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var selectRadiusAxisForRadialBar = (state, radiusAxisId) => selectRadiusAxis(state, radiusAxisId);
var selectRadiusAxisScaleForRadar = (state, radiusAxisId) => selectPolarAxisScale(state, "radiusAxis", radiusAxisId);
var selectRadiusAxisWithScale = createSelector([selectRadiusAxisForRadialBar, selectRadiusAxisScaleForRadar], (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$6(_objectSpread$6({}, axis), {}, { scale });
});
var selectRadiusAxisTicks = (state, radiusAxisId) => {
	return selectPolarGraphicalItemAxisTicks(state, "radiusAxis", radiusAxisId, false);
};
var selectAngleAxisForRadialBar = (state, _radiusAxisId, angleAxisId) => selectAngleAxis(state, angleAxisId);
var selectAngleAxisScaleForRadialBar = (state, _radiusAxisId, angleAxisId) => selectPolarAxisScale(state, "angleAxis", angleAxisId);
var selectAngleAxisWithScale = createSelector([selectAngleAxisForRadialBar, selectAngleAxisScaleForRadialBar], (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$6(_objectSpread$6({}, axis), {}, { scale });
});
var selectAngleAxisTicks = (state, _radiusAxisId, angleAxisId) => {
	return selectPolarAxisTicks(state, "angleAxis", angleAxisId, false);
};
var pickRadialBarSettings = (_state, _radiusAxisId, _angleAxisId, radialBarSettings) => radialBarSettings;
var selectSynchronisedRadialBarSettings = createSelector([selectUnfilteredPolarItems, pickRadialBarSettings], (graphicalItems, radialBarSettingsFromProps) => {
	if (graphicalItems.some((pgis) => pgis.type === "radialBar" && radialBarSettingsFromProps.dataKey === pgis.dataKey && radialBarSettingsFromProps.stackId === pgis.stackId)) return radialBarSettingsFromProps;
});
var selectBandSizeOfPolarAxis = createSelector([
	selectChartLayout,
	selectRadiusAxisWithScale,
	selectRadiusAxisTicks,
	selectAngleAxisWithScale,
	selectAngleAxisTicks
], (layout, radiusAxis, radiusAxisTicks, angleAxis, angleAxisTicks) => {
	if (isCategoricalAxis(layout, "radiusAxis")) return getBandSizeOfAxis(radiusAxis, radiusAxisTicks, false);
	return getBandSizeOfAxis(angleAxis, angleAxisTicks, false);
});
var selectBaseValue = createSelector([
	selectAngleAxisWithScale,
	selectRadiusAxisWithScale,
	selectChartLayout
], (angleAxis, radiusAxis, layout) => {
	var numericAxis = layout === "radial" ? angleAxis : radiusAxis;
	if (numericAxis == null || numericAxis.scale == null) return;
	return getBaseValueOfBar({ numericAxis });
});
var pickCells$1 = (_state, _radiusAxisId, _angleAxisId, _radialBarSettings, cells) => cells;
var pickAngleAxisId = (_state, _radiusAxisId, angleAxisId, _radialBarSettings, _cells) => angleAxisId;
var pickRadiusAxisId = (_state, radiusAxisId, _angleAxisId, _radialBarSettings, _cells) => radiusAxisId;
var pickMaxBarSize = (_state, _radiusAxisId, _angleAxisId, radialBarSettings, _cells) => radialBarSettings.maxBarSize;
var isRadialBar = (item) => item.type === "radialBar";
var selectAllVisibleRadialBars = createSelector([
	selectChartLayout,
	selectUnfilteredPolarItems,
	pickAngleAxisId,
	pickRadiusAxisId
], (layout, allItems, angleAxisId, radiusAxisId) => {
	return allItems.filter((i) => {
		if (layout === "centric") return i.angleAxisId === angleAxisId;
		return i.radiusAxisId === radiusAxisId;
	}).filter((i) => i.hide === false).filter(isRadialBar);
});
/**
* The generator never returned the totalSize which means that barSize in polar chart can not support percent values.
* We can add that if we want to I suppose.
* @returns undefined - but it should be a total size of numerical axis in polar chart
*/
var selectPolarBarAxisSize = () => void 0;
var selectPolarBarSizeList = createSelector([
	selectAllVisibleRadialBars,
	selectRootBarSize,
	selectPolarBarAxisSize
], combineBarSizeList);
var selectPolarBarBandSize = createSelector([
	selectChartLayout,
	selectRootMaxBarSize,
	selectAngleAxisWithScale,
	selectAngleAxisTicks,
	selectRadiusAxisWithScale,
	selectRadiusAxisTicks,
	pickMaxBarSize
], (layout, globalMaxBarSize, angleAxis, angleAxisTicks, radiusAxis, radiusAxisTicks, childMaxBarSize) => {
	var _ref2, _getBandSizeOfAxis2;
	var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
	if (layout === "centric") {
		var _ref, _getBandSizeOfAxis;
		return (_ref = (_getBandSizeOfAxis = getBandSizeOfAxis(angleAxis, angleAxisTicks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref !== void 0 ? _ref : 0;
	}
	return (_ref2 = (_getBandSizeOfAxis2 = getBandSizeOfAxis(radiusAxis, radiusAxisTicks, true)) !== null && _getBandSizeOfAxis2 !== void 0 ? _getBandSizeOfAxis2 : maxBarSize) !== null && _ref2 !== void 0 ? _ref2 : 0;
});
var selectAllPolarBarPositions = createSelector([
	selectPolarBarSizeList,
	selectRootMaxBarSize,
	selectBarGap,
	selectBarCategoryGap,
	selectPolarBarBandSize,
	selectBandSizeOfPolarAxis,
	pickMaxBarSize
], combineAllBarPositions);
var selectPolarBarPosition = createSelector([selectAllPolarBarPositions, selectSynchronisedRadialBarSettings], combineBarPosition);
var selectStackedRadialBars = createSelector([selectPolarItemsSettings], (allPolarItems) => allPolarItems.filter(isRadialBar).filter(isStacked));
var selectPolarCombinedStackedData = createSelector([
	selectStackedRadialBars,
	selectChartDataAndAlwaysIgnoreIndexes,
	selectTooltipAxis
], combineDisplayedStackedData);
var selectStackGroups = createSelector([
	selectPolarCombinedStackedData,
	selectStackedRadialBars,
	selectStackOffsetType,
	selectReverseStackOrder
], combineStackGroups);
var selectRadialBarStackGroups = (state, radiusAxisId, angleAxisId) => {
	if (selectChartLayout(state) === "centric") return selectStackGroups(state, "radiusAxis", radiusAxisId);
	return selectStackGroups(state, "angleAxis", angleAxisId);
};
var selectPolarStackedData = createSelector([selectRadialBarStackGroups, selectSynchronisedRadialBarSettings], combineStackedData);
var selectRadialBarSectors = createSelector([
	selectAngleAxisWithScale,
	selectAngleAxisTicks,
	selectRadiusAxisWithScale,
	selectRadiusAxisTicks,
	selectChartDataWithIndexes,
	selectSynchronisedRadialBarSettings,
	selectBandSizeOfPolarAxis,
	selectChartLayout,
	selectBaseValue,
	selectPolarViewBox,
	pickCells$1,
	selectPolarBarPosition,
	selectPolarStackedData
], (angleAxis, angleAxisTicks, radiusAxis, radiusAxisTicks, _ref3, radialBarSettings, bandSize, layout, baseValue, polarViewBox, cells, pos, stackedData) => {
	var chartData = _ref3.chartData, dataStartIndex = _ref3.dataStartIndex, dataEndIndex = _ref3.dataEndIndex;
	if (radialBarSettings == null || radiusAxis == null || angleAxis == null || chartData == null || bandSize == null || pos == null || layout !== "centric" && layout !== "radial" || radiusAxisTicks == null || polarViewBox == null) return [];
	var dataKey = radialBarSettings.dataKey, minPointSize = radialBarSettings.minPointSize;
	var cx = polarViewBox.cx, cy = polarViewBox.cy, startAngle = polarViewBox.startAngle, endAngle = polarViewBox.endAngle;
	return computeRadialBarDataItems({
		angleAxis,
		angleAxisTicks,
		bandSize,
		baseValue,
		cells,
		cx,
		cy,
		dataKey,
		dataStartIndex,
		displayedData: chartData.slice(dataStartIndex, dataEndIndex + 1),
		endAngle,
		layout,
		minPointSize,
		pos,
		radiusAxis,
		radiusAxisTicks,
		stackedData,
		stackedDomain: stackedData ? (layout === "centric" ? radiusAxis : angleAxis).scale.domain() : null,
		startAngle
	});
});
var selectRadialBarLegendPayload = createSelector([selectChartDataAndAlwaysIgnoreIndexes, (_s, l) => l], (_ref4, legendType) => {
	var chartData = _ref4.chartData, dataStartIndex = _ref4.dataStartIndex, dataEndIndex = _ref4.dataEndIndex;
	if (chartData == null) return [];
	var displayedData = chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData.length === 0) return [];
	return displayedData.map((entry) => {
		return {
			type: legendType,
			value: entry.name,
			color: entry.fill,
			payload: entry
		};
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/polar/RadialBar.js
var _excluded$4 = [
	"shape",
	"activeShape",
	"cornerRadius",
	"id"
];
var _excluded2$2 = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
var _excluded3$2 = ["value", "background"];
function _extends$5() {
	return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$5.apply(null, arguments);
}
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty$5(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$5(e, r, t) {
	return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$4(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var STABLE_EMPTY_ARRAY = [];
function RadialBarLabelListProvider(_ref) {
	var showLabels = _ref.showLabels, sectors = _ref.sectors, children = _ref.children;
	var labelListEntries = sectors.map((sector) => ({
		value: sector.value,
		payload: sector.payload,
		parentViewBox: void 0,
		clockWise: false,
		viewBox: {
			cx: sector.cx,
			cy: sector.cy,
			innerRadius: sector.innerRadius,
			outerRadius: sector.outerRadius,
			startAngle: sector.startAngle,
			endAngle: sector.endAngle,
			clockWise: false
		},
		fill: sector.fill
	}));
	return /*#__PURE__*/ import_react.createElement(PolarLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function RadialBarSectors(_ref2) {
	var sectors = _ref2.sectors, allOtherRadialBarProps = _ref2.allOtherRadialBarProps, showLabels = _ref2.showLabels, animationElapsedTime = _ref2.animationElapsedTime, isAnimating = _ref2.isAnimating, isEntrance = _ref2.isEntrance;
	var shape = allOtherRadialBarProps.shape, activeShape = allOtherRadialBarProps.activeShape, cornerRadius = allOtherRadialBarProps.cornerRadius, id = allOtherRadialBarProps.id, others = _objectWithoutProperties$4(allOtherRadialBarProps, _excluded$4);
	var baseProps = svgPropertiesNoEvents(others);
	var activeIndex = useAppSelector(selectActiveTooltipIndex);
	var onMouseEnterFromProps = allOtherRadialBarProps.onMouseEnter, onItemClickFromProps = allOtherRadialBarProps.onClick, onMouseLeaveFromProps = allOtherRadialBarProps.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties$4(allOtherRadialBarProps, _excluded2$2);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, allOtherRadialBarProps.dataKey, id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, allOtherRadialBarProps.dataKey, id);
	if (sectors == null) return null;
	return /*#__PURE__*/ import_react.createElement(RadialBarLabelListProvider, {
		showLabels,
		sectors
	}, sectors.map((entry, i) => {
		var isActive = Boolean(activeShape && activeIndex === String(i));
		var onMouseEnter = onMouseEnterFromContext(entry, i);
		var onMouseLeave = onMouseLeaveFromContext(entry, i);
		var onClick = onClickFromContext(entry, i);
		var radialBarSectorProps = _objectSpread$5(_objectSpread$5(_objectSpread$5(_objectSpread$5({}, baseProps), {}, { cornerRadius: parseCornerRadius(cornerRadius) }, entry), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
			onMouseEnter,
			onMouseLeave,
			onClick,
			className: "recharts-radial-bar-sector ".concat(entry.className),
			forceCornerRadius: others.forceCornerRadius,
			cornerIsExternal: others.cornerIsExternal,
			animationElapsedTime,
			isAnimating,
			isEntrance,
			isActive,
			option: isActive && activeShape != null ? activeShape : shape,
			index: i
		});
		if (isActive) return /*#__PURE__*/ import_react.createElement(ZIndexLayer, {
			zIndex: DefaultZIndexes.activeBar,
			key: "sector-".concat(entry.cx, "-").concat(entry.cy, "-").concat(entry.innerRadius, "-").concat(entry.outerRadius, "-").concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(i)
		}, /*#__PURE__*/ import_react.createElement(RadialBarSector, radialBarSectorProps));
		return /*#__PURE__*/ import_react.createElement(RadialBarSector, _extends$5({ key: "sector-".concat(entry.cx, "-").concat(entry.cy, "-").concat(entry.innerRadius, "-").concat(entry.outerRadius, "-").concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(i) }, radialBarSectorProps));
	}), /*#__PURE__*/ import_react.createElement(LabelListFromLabelProp, { label: allOtherRadialBarProps.label }), allOtherRadialBarProps.children);
}
var defaultRadialBarAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	return items.flatMap((item) => {
		if (item.status === "removed") return [];
		if (item.status === "matched") return [_objectSpread$5(_objectSpread$5({}, item.next), {}, {
			startAngle: interpolate(item.prev.startAngle, item.next.startAngle, animationElapsedTime),
			endAngle: interpolate(item.prev.endAngle, item.next.endAngle, animationElapsedTime)
		})];
		return [_objectSpread$5(_objectSpread$5({}, item.next), {}, { endAngle: interpolate(item.next.startAngle, item.next.endAngle, animationElapsedTime) })];
	});
};
function SectorsWithAnimation(_ref3) {
	var props = _ref3.props, previousSectorsRef = _ref3.previousSectorsRef;
	var sectors = props.sectors, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd;
	var _useAnimationCallback = useAnimationCallbacks(onAnimationStart, onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var layout = usePolarChartLayout();
	if (layout == null) return null;
	return /*#__PURE__*/ import_react.createElement(AnimatedItems, {
		animationInput: props,
		animationIdPrefix: "recharts-radialbar-",
		items: sectors,
		previousItemsRef: previousSectorsRef,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		onAnimationStart: handleAnimationStart,
		onAnimationEnd: handleAnimationEnd,
		animationInterpolateFn: props.animationInterpolateFn,
		animationMatchBy: props.animationMatchBy,
		layout
	}, (stepData, animationElapsedTime, isEntrance) => /*#__PURE__*/ import_react.createElement(RadialBarSectors, {
		sectors: stepData,
		allOtherRadialBarProps: props,
		showLabels: !isAnimating,
		animationElapsedTime,
		isAnimating: isAnimating || animationElapsedTime < 1,
		isEntrance
	}));
}
function RenderSectors(props) {
	var previousSectorsRef = (0, import_react.useRef)(null);
	return /*#__PURE__*/ import_react.createElement(SectorsWithAnimation, {
		props,
		previousSectorsRef
	});
}
function SetRadialBarPayloadLegend(props) {
	var legendPayload = useAppSelector((state) => selectRadialBarLegendPayload(state, props.legendType));
	return /*#__PURE__*/ import_react.createElement(SetPolarLegendPayload, { legendPayload: legendPayload !== null && legendPayload !== void 0 ? legendPayload : [] });
}
var SetRadialBarTooltipEntrySettings = /*#__PURE__*/ import_react.memo((_ref4) => {
	var dataKey = _ref4.dataKey, sectors = _ref4.sectors, stroke = _ref4.stroke, strokeWidth = _ref4.strokeWidth, name = _ref4.name, hide = _ref4.hide, fill = _ref4.fill, tooltipType = _ref4.tooltipType, formatter = _ref4.formatter, id = _ref4.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: sectors,
		getPosition: noop,
		settings: {
			graphicalItemId: id,
			stroke,
			strokeWidth,
			fill,
			nameKey: void 0,
			dataKey,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: fill,
			unit: "",
			formatter
		}
	};
	return /*#__PURE__*/ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
var RadialBarWithState = class extends import_react.PureComponent {
	renderBackground(sectors) {
		if (sectors == null) return null;
		var cornerRadius = this.props.cornerRadius;
		var backgroundProps = svgPropertiesNoEventsFromUnknown(this.props.background);
		return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: getZIndexFromUnknown(this.props.background, DefaultZIndexes.barBackground) }, sectors.map((entry, i) => {
			entry.value;
			var background = entry.background, rest = _objectWithoutProperties$4(entry, _excluded3$2);
			if (!background) return null;
			var props = _objectSpread$5(_objectSpread$5(_objectSpread$5(_objectSpread$5(_objectSpread$5({ cornerRadius: parseCornerRadius(cornerRadius) }, rest), {}, { fill: "#eee" }, background), backgroundProps), adaptEventsOfChild(this.props, entry, i)), {}, {
				index: i,
				className: clsx("recharts-radial-bar-background-sector", String(backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.className)),
				option: background,
				isActive: false
			});
			return /*#__PURE__*/ import_react.createElement(RadialBarSector, _extends$5({ key: "background-".concat(rest.cx, "-").concat(rest.cy, "-").concat(rest.innerRadius, "-").concat(rest.outerRadius, "-").concat(rest.startAngle, "-").concat(rest.endAngle, "-").concat(i) }, props));
		}));
	}
	render() {
		var _this$props = this.props, hide = _this$props.hide, sectors = _this$props.sectors, className = _this$props.className, background = _this$props.background;
		if (hide) return null;
		var layerClass = clsx("recharts-area", className);
		return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: this.props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: layerClass }, background && /*#__PURE__*/ import_react.createElement(Layer, { className: "recharts-radial-bar-background" }, this.renderBackground(sectors)), /*#__PURE__*/ import_react.createElement(Layer, { className: "recharts-radial-bar-sectors" }, /*#__PURE__*/ import_react.createElement(RenderSectors, this.props))));
	}
};
function RadialBarImpl(props) {
	var _useAppSelector;
	var cells = import_react.useMemo(() => findAllByType(props.children, Cell), [props.children]);
	var radialBarSettings = import_react.useMemo(() => ({
		data: void 0,
		hide: false,
		id: props.id,
		dataKey: props.dataKey,
		minPointSize: props.minPointSize,
		stackId: getNormalizedStackId(props.stackId),
		maxBarSize: props.maxBarSize,
		barSize: props.barSize,
		type: "radialBar",
		angleAxisId: props.angleAxisId,
		radiusAxisId: props.radiusAxisId
	}), [
		props.id,
		props.dataKey,
		props.minPointSize,
		props.stackId,
		props.maxBarSize,
		props.barSize,
		props.angleAxisId,
		props.radiusAxisId
	]);
	var sectors = (_useAppSelector = useAppSelector((state) => selectRadialBarSectors(state, props.radiusAxisId, props.angleAxisId, radialBarSettings, cells))) !== null && _useAppSelector !== void 0 ? _useAppSelector : STABLE_EMPTY_ARRAY;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetRadialBarTooltipEntrySettings, {
		dataKey: props.dataKey,
		sectors,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		name: props.name,
		hide: props.hide,
		fill: props.fill,
		tooltipType: props.tooltipType,
		formatter: props.formatter,
		id: props.id
	}), /*#__PURE__*/ import_react.createElement(RadialBarWithState, _extends$5({}, props, { sectors })));
}
var defaultRadialBarProps = {
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: matchAppend,
	animationInterpolateFn: defaultRadialBarAnimateItems,
	background: false,
	cornerIsExternal: false,
	cornerRadius: 0,
	forceCornerRadius: false,
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "rect",
	minPointSize: 0,
	radiusAxisId: 0,
	shape: defaultRadialBarShape,
	zIndex: DefaultZIndexes.bar
};
function computeRadialBarDataItems(_ref5) {
	var displayedData = _ref5.displayedData, stackedData = _ref5.stackedData, dataStartIndex = _ref5.dataStartIndex, stackedDomain = _ref5.stackedDomain, dataKey = _ref5.dataKey, baseValue = _ref5.baseValue, layout = _ref5.layout, radiusAxis = _ref5.radiusAxis, radiusAxisTicks = _ref5.radiusAxisTicks, bandSize = _ref5.bandSize, pos = _ref5.pos, angleAxis = _ref5.angleAxis, minPointSize = _ref5.minPointSize, cx = _ref5.cx, cy = _ref5.cy, angleAxisTicks = _ref5.angleAxisTicks, cells = _ref5.cells, rootStartAngle = _ref5.startAngle, rootEndAngle = _ref5.endAngle;
	if (angleAxisTicks == null || radiusAxisTicks == null) return STABLE_EMPTY_ARRAY;
	return (displayedData !== null && displayedData !== void 0 ? displayedData : []).map((entry, index) => {
		var value, innerRadius, outerRadius, startAngle, endAngle, backgroundSector;
		if (stackedData) value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
		else {
			value = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(value)) value = [baseValue, value];
		}
		if (layout === "radial") {
			var _angleAxis$scale$map, _angleAxis$scale$map2;
			startAngle = (_angleAxis$scale$map = angleAxis.scale.map(value[0])) !== null && _angleAxis$scale$map !== void 0 ? _angleAxis$scale$map : rootStartAngle;
			endAngle = (_angleAxis$scale$map2 = angleAxis.scale.map(value[1])) !== null && _angleAxis$scale$map2 !== void 0 ? _angleAxis$scale$map2 : rootEndAngle;
			innerRadius = getCateCoordinateOfBar({
				axis: radiusAxis,
				ticks: radiusAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			if (innerRadius != null && endAngle != null && startAngle != null) {
				outerRadius = innerRadius + pos.size;
				var deltaAngle = endAngle - startAngle;
				if (Math.abs(minPointSize) > 0 && Math.abs(deltaAngle) < Math.abs(minPointSize)) {
					var delta = mathSign(deltaAngle || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaAngle));
					endAngle += delta;
				}
				backgroundSector = { background: {
					cx,
					cy,
					innerRadius,
					outerRadius,
					startAngle: rootStartAngle,
					endAngle: rootEndAngle
				} };
			}
		} else {
			innerRadius = radiusAxis.scale.map(value[0]);
			outerRadius = radiusAxis.scale.map(value[1]);
			startAngle = getCateCoordinateOfBar({
				axis: angleAxis,
				ticks: angleAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			if (innerRadius != null && outerRadius != null && startAngle != null) {
				endAngle = startAngle + pos.size;
				var deltaRadius = outerRadius - innerRadius;
				if (Math.abs(minPointSize) > 0 && Math.abs(deltaRadius) < Math.abs(minPointSize)) {
					var _delta = mathSign(deltaRadius || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaRadius));
					outerRadius += _delta;
				}
			}
		}
		return _objectSpread$5(_objectSpread$5(_objectSpread$5({}, entry), backgroundSector), {}, {
			payload: entry,
			value: stackedData ? value : value[1],
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle
		}, cells && cells[index] && cells[index].props);
	});
}
/**
* @consumes PolarChartContext
* @provides LabelListContext
* @provides CellReader
*/
function RadialBar(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultRadialBarProps);
	return /*#__PURE__*/ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "radialBar"
	}, (id) => {
		var _props$hide, _props$angleAxisId, _props$radiusAxisId;
		return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetPolarGraphicalItem, {
			type: "radialBar",
			id,
			data: void 0,
			dataKey: props.dataKey,
			hide: (_props$hide = props.hide) !== null && _props$hide !== void 0 ? _props$hide : defaultRadialBarProps.hide,
			angleAxisId: (_props$angleAxisId = props.angleAxisId) !== null && _props$angleAxisId !== void 0 ? _props$angleAxisId : defaultRadialBarProps.angleAxisId,
			radiusAxisId: (_props$radiusAxisId = props.radiusAxisId) !== null && _props$radiusAxisId !== void 0 ? _props$radiusAxisId : defaultRadialBarProps.radiusAxisId,
			stackId: getNormalizedStackId(props.stackId),
			barSize: props.barSize,
			minPointSize: props.minPointSize,
			maxBarSize: props.maxBarSize
		}), /*#__PURE__*/ import_react.createElement(SetRadialBarPayloadLegend, props), /*#__PURE__*/ import_react.createElement(RadialBarImpl, _extends$5({}, props, { id })));
	});
}
RadialBar.displayName = "RadialBar";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/scale/CartesianScaleHelper.js
/**
* Groups X and Y scale functions together and provides helper methods.
*/
var CartesianScaleHelperImpl = class {
	constructor(_ref) {
		var x = _ref.x, y = _ref.y;
		this.xAxisScale = x;
		this.yAxisScale = y;
	}
	map(value, _ref2) {
		var _this$xAxisScale$map, _this$yAxisScale$map;
		var position = _ref2.position;
		return {
			x: (_this$xAxisScale$map = this.xAxisScale.map(value.x, { position })) !== null && _this$xAxisScale$map !== void 0 ? _this$xAxisScale$map : 0,
			y: (_this$yAxisScale$map = this.yAxisScale.map(value.y, { position })) !== null && _this$yAxisScale$map !== void 0 ? _this$yAxisScale$map : 0
		};
	}
	mapWithFallback(value, _ref3) {
		var _this$xAxisScale$map2, _this$yAxisScale$map2;
		var position = _ref3.position, fallback = _ref3.fallback;
		var fallbackY, fallbackX;
		if (fallback === "rangeMin") fallbackY = this.yAxisScale.rangeMin();
		else if (fallback === "rangeMax") fallbackY = this.yAxisScale.rangeMax();
		else fallbackY = 0;
		if (fallback === "rangeMin") fallbackX = this.xAxisScale.rangeMin();
		else if (fallback === "rangeMax") fallbackX = this.xAxisScale.rangeMax();
		else fallbackX = 0;
		return {
			x: (_this$xAxisScale$map2 = this.xAxisScale.map(value.x, { position })) !== null && _this$xAxisScale$map2 !== void 0 ? _this$xAxisScale$map2 : fallbackX,
			y: (_this$yAxisScale$map2 = this.yAxisScale.map(value.y, { position })) !== null && _this$yAxisScale$map2 !== void 0 ? _this$yAxisScale$map2 : fallbackY
		};
	}
	isInRange(_ref4) {
		var x = _ref4.x, y = _ref4.y;
		var xInRange = x == null || this.xAxisScale.isInRange(x);
		var yInRange = y == null || this.yAxisScale.isInRange(y);
		return xInRange && yInRange;
	}
};
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/ReferenceLine.js
/**
* @fileOverview Reference Line
*/
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty$4(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$4(e, r, t) {
	return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$4() {
	return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$4.apply(null, arguments);
}
/**
* Single point that defines one end of a segment.
* These coordinates are in data space, meaning that you should provide
* values that correspond to the data domain of the axes.
* So you would provide a value of `Page A` to indicate the data value `Page A`
* and then recharts will convert that to pixels.
*
* Likewise for numbers. If your x-axis goes from 0 to 100,
* and you want the line to end at 50, you would provide `50` here.
*
* @inline
*/
/**
* This excludes `viewBox` prop from svg for two reasons:
* 1. The components wants viewBox of object type, and svg wants string
*    - so there's a conflict, and the component will throw if it gets string
* 2. Internally the component calls `svgPropertiesNoEvents` which filters the viewBox away anyway
*/
var renderLine = (option, props) => {
	var line;
	if (/*#__PURE__*/ import_react.isValidElement(option)) line = /*#__PURE__*/ import_react.cloneElement(option, props);
	else if (typeof option === "function") line = option(props);
	else {
		if (!isWellBehavedNumber(props.x1) || !isWellBehavedNumber(props.y1) || !isWellBehavedNumber(props.x2) || !isWellBehavedNumber(props.y2)) return null;
		line = /*#__PURE__*/ import_react.createElement("line", _extends$4({}, props, { className: "recharts-reference-line-line" }));
	}
	return line;
};
var getHorizontalLineEndPoints = (yCoord, ifOverflow, position, yAxisOrientation, yAxisScale, viewBox) => {
	var x = viewBox.x, width = viewBox.width;
	var coord = yAxisScale.map(yCoord, { position });
	if (!isWellBehavedNumber(coord)) return null;
	if (ifOverflow === "discard" && !yAxisScale.isInRange(coord)) return null;
	var points = [{
		x: x + width,
		y: coord
	}, {
		x,
		y: coord
	}];
	return yAxisOrientation === "left" ? points.reverse() : points;
};
var getVerticalLineEndPoints = (xCoord, ifOverflow, position, xAxisOrientation, xAxisScale, viewBox) => {
	var y = viewBox.y, height = viewBox.height;
	var coord = xAxisScale.map(xCoord, { position });
	if (!isWellBehavedNumber(coord)) return null;
	if (ifOverflow === "discard" && !xAxisScale.isInRange(coord)) return null;
	var points = [{
		x: coord,
		y: y + height
	}, {
		x: coord,
		y
	}];
	return xAxisOrientation === "top" ? points.reverse() : points;
};
var getSegmentLineEndPoints = (segment, ifOverflow, position, scales) => {
	var points = [scales.mapWithFallback(segment[0], {
		position,
		fallback: "rangeMin"
	}), scales.mapWithFallback(segment[1], {
		position,
		fallback: "rangeMax"
	})];
	if (ifOverflow === "discard" && points.some((p) => !scales.isInRange(p))) return null;
	return points;
};
var getEndPoints = (xAxisScale, yAxisScale, viewBox, position, xAxisOrientation, yAxisOrientation, props) => {
	var xCoord = props.x, yCoord = props.y, segment = props.segment, ifOverflow = props.ifOverflow;
	var isFixedX = isNumOrStr(xCoord);
	if (isNumOrStr(yCoord)) return getHorizontalLineEndPoints(yCoord, ifOverflow, position, yAxisOrientation, yAxisScale, viewBox);
	if (isFixedX) return getVerticalLineEndPoints(xCoord, ifOverflow, position, xAxisOrientation, xAxisScale, viewBox);
	if (segment != null && segment.length === 2) return getSegmentLineEndPoints(segment, ifOverflow, position, new CartesianScaleHelperImpl({
		x: xAxisScale,
		y: yAxisScale
	}));
	return null;
};
function ReportReferenceLine(props) {
	var dispatch = useAppDispatch();
	(0, import_react.useEffect)(() => {
		dispatch(addLine(props));
		return () => {
			dispatch(removeLine(props));
		};
	});
	return null;
}
function ReferenceLineImpl(props) {
	var xAxisId = props.xAxisId, yAxisId = props.yAxisId, shape = props.shape, className = props.className, ifOverflow = props.ifOverflow;
	var isPanorama = useIsPanorama();
	var clipPathId = useClipPathId();
	var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
	var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
	var xAxisScale = useAppSelector((state) => selectAxisScale(state, "xAxis", xAxisId, isPanorama));
	var yAxisScale = useAppSelector((state) => selectAxisScale(state, "yAxis", yAxisId, isPanorama));
	var viewBox = useViewBox();
	if (!clipPathId || !viewBox || xAxis == null || yAxis == null || xAxisScale == null || yAxisScale == null) return null;
	var endPoints = getEndPoints(xAxisScale, yAxisScale, viewBox, props.position, xAxis.orientation, yAxis.orientation, props);
	if (!endPoints) return null;
	var point1 = endPoints[0];
	var point2 = endPoints[1];
	if (point1 == null || point2 == null) return null;
	var x1 = point1.x, y1 = point1.y;
	var x2 = point2.x, y2 = point2.y;
	var lineProps = _objectSpread$4(_objectSpread$4({ clipPath: ifOverflow === "hidden" ? "url(#".concat(clipPathId, ")") : void 0 }, svgPropertiesAndEvents(props)), {}, {
		x1,
		y1,
		x2,
		y2
	});
	var rect = rectWithCoords({
		x1,
		y1,
		x2,
		y2
	});
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, { className: clsx("recharts-reference-line", className) }, renderLine(shape, lineProps), /*#__PURE__*/ import_react.createElement(CartesianLabelContextProvider, _extends$4({}, rect, {
		lowerWidth: rect.width,
		upperWidth: rect.width
	}), /*#__PURE__*/ import_react.createElement(CartesianLabelFromLabelProp, { label: props.label }), props.children)));
}
var referenceLineDefaultProps = {
	ifOverflow: "discard",
	xAxisId: 0,
	yAxisId: 0,
	fill: "none",
	label: false,
	stroke: "#ccc",
	fillOpacity: 1,
	strokeWidth: 1,
	position: "middle",
	zIndex: DefaultZIndexes.line
};
/**
* Draws a line on the chart connecting two points.
*
* This component, unlike {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/line line}, is aware of the cartesian coordinate system,
* so you specify the dimensions by using data coordinates instead of pixels.
*
* ReferenceLine will calculate the pixels based on the provided data coordinates.
*
* If you prefer to render using pixels rather than data coordinates,
* consider using the {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/line line SVG element} instead.
*
* @provides CartesianLabelContext
* @consumes CartesianChartContext
*/
function ReferenceLine(outsideProps) {
	var props = resolveDefaultProps(outsideProps, referenceLineDefaultProps);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(ReportReferenceLine, {
		yAxisId: props.yAxisId,
		xAxisId: props.xAxisId,
		ifOverflow: props.ifOverflow,
		x: props.x,
		y: props.y,
		segment: props.segment
	}), /*#__PURE__*/ import_react.createElement(ReferenceLineImpl, props));
}
ReferenceLine.displayName = "ReferenceLine";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/LineDrawShape.js
var _excluded$3 = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$3(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Reads the total length of an SVG path element, returning 0 if the element
* is null or the measurement fails (e.g. in JSDOM).
*/
function getTotalLength$1(path) {
	try {
		return path && path.getTotalLength && path.getTotalLength() || 0;
	} catch (_unused) {
		return 0;
	}
}
/**
* Generates a simple stroke-dasharray string for animating a line draw effect.
*
* Uses `totalLength` as the gap (instead of `totalLength - length`) to prevent a floating-point
* precision artifact: when fractional dash and gap values are serialized to a string attribute
* and reparsed by the SVG renderer, their sum can differ from the actual path length by a ULP,
* causing the dasharray pattern to repeat and render a phantom dot at the path endpoint
* with round or square strokeLinecap.
*
* @param totalLength The total length of the SVG path
* @param length The currently visible portion of the path
* @returns A stroke-dasharray string like "50px 200px"
*/
function generateSimpleStrokeDasharray(totalLength, length) {
	return "".concat(length, "px ").concat(totalLength, "px");
}
/**
* Normalizes a dash pattern to the even-length sequence used by SVG renderers.
* Odd-length stroke-dasharray values repeat once, so "5" behaves like "5 5".
*
* @param lines Array of dash/gap lengths to repeat
* @returns An even-length dash pattern
*/
function normalizeDashPattern(lines) {
	return lines.length % 2 !== 0 ? [...lines, ...lines] : lines;
}
/**
* Repeats a dash pattern array a given number of times.
*
* @param lines Array of dash/gap lengths to repeat
* @param count Number of times to repeat the pattern
* @returns A new array with the pattern repeated `count` times
*/
function repeat(lines, count) {
	var result = [];
	for (var i = 0; i < count; ++i) result.push(...lines);
	return result;
}
/**
* Computes a stroke-dasharray string for animating a custom-dashed line draw effect.
*
* Given a user-specified dash pattern (e.g. `"7,3"`), this function builds a dasharray
* that reveals exactly `length` pixels of that pattern, followed by a gap of `totalLength`
* to hide the remainder of the path.
*
* Like {@link generateSimpleStrokeDasharray}, the trailing gap uses `totalLength` rather than
* `totalLength - length` to avoid floating-point precision artifacts with round/square strokeLinecap.
*
* @param length The currently visible portion of the path
* @param totalLength The total length of the SVG path
* @param lines The user-specified dash pattern as an array of numbers (e.g. [7, 3])
* @returns A stroke-dasharray string incorporating the custom dash pattern
*/
function getStrokeDasharray(length, totalLength, lines) {
	var normalizedLines = normalizeDashPattern(lines);
	var lineLength = normalizedLines.reduce((pre, next) => pre + next, 0);
	if (!lineLength) return generateSimpleStrokeDasharray(totalLength, length);
	var count = Math.floor(length / lineLength);
	var remainLength = length % lineLength;
	var remainLines = [];
	for (var i = 0, sum = 0; i < normalizedLines.length; sum += (_normalizedLines$i = normalizedLines[i]) !== null && _normalizedLines$i !== void 0 ? _normalizedLines$i : 0, ++i) {
		var _normalizedLines$i;
		var lineValue = normalizedLines[i];
		if (lineValue != null && sum + lineValue > remainLength) {
			remainLines = [...normalizedLines.slice(0, i), remainLength - sum];
			break;
		}
	}
	var emptyLines = remainLines.length % 2 === 0 ? [0, totalLength] : [totalLength];
	return [
		...repeat(normalizedLines, count),
		...remainLines,
		...emptyLines
	].map((line) => "".concat(line, "px")).join(", ");
}
/**
* Computes the animated stroke-dasharray for a line's entrance animation.
*
* @param userStrokeDasharray The user-specified stroke-dasharray (e.g. "5,3"), if any
* @param totalLength Total SVG path length
* @param visibleLength How much of the path should be visible
* @returns A stroke-dasharray string for the current animation frame
*/
function computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength) {
	if (userStrokeDasharray) return getStrokeDasharray(visibleLength, totalLength, "".concat(userStrokeDasharray).split(/[,\s]+/gim).map((num) => parseFloat(num)));
	return generateSimpleStrokeDasharray(totalLength, visibleLength);
}
/**
* The default shape for Line. During the entrance animation, the line is progressively
* revealed using the `strokeDasharray` SVG attribute: the visible portion grows from
* 0 to the full path length as `animationElapsedTime` progresses from 0 to 1.
*
* This is the built-in shape for Line. It is automatically used when no custom `shape` prop
* is provided. You can import and reuse it as a starting point for custom shapes,
* or use it as a reference for building your own.
*
* The animation progress props (`animationElapsedTime`, `isAnimating`, `isEntrance`) are available
* for custom shapes that want to add their own effects on top.
*
* @example
* ```tsx
* import { Line, LineDrawShape } from 'recharts';
*
* // Use the default shape explicitly (same as providing no shape prop)
* <Line dataKey="value" shape={LineDrawShape} />
* ```
*
* @see {@link https://recharts.github.io/en-US/guide/animations Animation guide}
*
* @since 3.9
*/
function LineDrawShape(props) {
	props.animationElapsedTime;
	props.isAnimating;
	props.isEntrance;
	var visibleLength = props.visibleLength, userStrokeDasharray = props.strokeDasharray, connectNulls = props.connectNulls, curveProps = _objectWithoutProperties$3(props, _excluded$3);
	var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
	var strokeDasharray;
	if (visibleLength != null) {
		var _pathRef$current;
		var pathRef = curveProps.pathRef;
		strokeDasharray = computeAnimatedStrokeDasharray(userStrokeDasharray, getTotalLength$1((_pathRef$current = pathRef === null || pathRef === void 0 ? void 0 : pathRef.current) !== null && _pathRef$current !== void 0 ? _pathRef$current : null), visibleLength);
	} else if (userStrokeDasharray != null) strokeDasharray = String(userStrokeDasharray);
	return /*#__PURE__*/ import_react.createElement(Curve, _extends$3({}, curveProps, {
		connectNulls: finalConnectNulls,
		strokeDasharray
	}));
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
/**
* Tracks the animated visible length of a Line's SVG path across data changes.
*
* Invariants:
* 1. The visible length only grows (monotonically non-decreasing with animationElapsedTime).
* 2. The visible length changes continuously — no jumps when data changes mid-animation.
*    This is achieved by tracking the maximum animated length in pixels and using it
*    as the starting point for the next animation.
* 3. Once the line reaches 100% visibility, it never becomes partially visible again.
*    In that case the hook returns `null`, meaning no animation stroke-dasharray is needed.
*
* @param points The current set of points for the line. When this reference changes,
*   the hook detects a data change and starts a new animation from the current visible length.
* @returns A stable callback `(animationElapsedTime, totalLength) => number | null` where:
*   - `animationElapsedTime` is the animation progress (0 to 1)
*   - `totalLength` is the current total length of the SVG path in pixels
*   - returns the visible length in pixels, or `null` if the line is fully visible
*/
function useAnimatedLineLength(points) {
	var startingLengthRef = (0, import_react.useRef)(0);
	var maxAnimatedLengthRef = (0, import_react.useRef)(0);
	var reachedFullRef = (0, import_react.useRef)(false);
	var prevPointsRef = (0, import_react.useRef)(points);
	if (prevPointsRef.current !== points) {
		startingLengthRef.current = maxAnimatedLengthRef.current;
		prevPointsRef.current = points;
	}
	return (0, import_react.useCallback)((animationElapsedTime, totalLength) => {
		if (reachedFullRef.current) return null;
		var visibleLength = Math.min(round(startingLengthRef.current + animationElapsedTime * totalLength), totalLength);
		if (animationElapsedTime > 0 && totalLength > 0) {
			maxAnimatedLengthRef.current = Math.max(maxAnimatedLengthRef.current, visibleLength);
			if (visibleLength >= totalLength) {
				reachedFullRef.current = true;
				return null;
			}
		}
		return visibleLength;
	}, []);
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/lineSelectors.js
var selectXAxisWithScale$1 = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks$1 = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale$1 = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks$1 = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize = createSelector([
	selectChartLayout,
	selectXAxisWithScale$1,
	selectYAxisWithScale$1,
	selectXAxisTicks$1,
	selectYAxisTicks$1
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
	if (isCategoricalAxis(layout, "xAxis")) return getBandSizeOfAxis(xAxis, xAxisTicks, false);
	return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickLineId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
function isLineSettings(item) {
	return item.type === "line";
}
var selectSynchronisedLineSettings = createSelector([selectUnfilteredCartesianItems, pickLineId], (graphicalItems, id) => graphicalItems.filter(isLineSettings).find((x) => x.id === id));
var selectLinePoints = createSelector([
	selectChartLayout,
	selectXAxisWithScale$1,
	selectYAxisWithScale$1,
	selectXAxisTicks$1,
	selectYAxisTicks$1,
	selectSynchronisedLineSettings,
	selectBandSize,
	selectChartDataWithIndexesIfNotInPanoramaPosition4
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, lineSettings, bandSize, _ref) => {
	var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
	if (lineSettings == null || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null || layout !== "horizontal" && layout !== "vertical") return;
	var dataKey = lineSettings.dataKey, data = lineSettings.data;
	var displayedData;
	if (data != null && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeLinePoints({
		layout,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		dataKey,
		bandSize,
		displayedData
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/Line.js
var _excluded$2 = ["id"];
var _excluded2$1 = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
];
var _excluded3$1 = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
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
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty$3(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$3(e, r, t) {
	return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
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
* Internal props, combination of external props + defaultProps + private Recharts state
*/
/**
* External props, intended for end users to fill in
*/
function getTotalLength(mainCurve) {
	try {
		return mainCurve && mainCurve.getTotalLength && mainCurve.getTotalLength() || 0;
	} catch (_unused) {
		return 0;
	}
}
/**
* Compute the average x-shift between matched pairs (prev → next).
* This tells us the overall direction and magnitude of the data movement.
*/
function averageShift(items) {
	var total = 0;
	var count = 0;
	for (var item of items) if (item.status === "matched" && item.prev.x != null && item.next.x != null) {
		total += item.next.x - item.prev.x;
		count++;
	}
	return count > 0 ? total / count : 0;
}
var defaultLineAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	var shift = averageShift(items);
	var result = [];
	for (var item of items) if (item.status === "matched") result.push(_objectSpread$3(_objectSpread$3({}, item.next), {}, {
		x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
		y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
	}));
	else if (item.status === "added") {
		if (item.next.x != null) {
			var entryX = item.next.x - shift;
			result.push(_objectSpread$3(_objectSpread$3({}, item.next), {}, {
				x: interpolate(entryX, item.next.x, animationElapsedTime),
				y: item.next.y
			}));
		} else result.push(item.next);
	} else if (item.status === "removed") {
		if (item.prev.x != null) {
			var exitX = item.prev.x + shift;
			result.push(_objectSpread$3(_objectSpread$3({}, item.prev), {}, {
				x: interpolate(item.prev.x, exitX, animationElapsedTime),
				y: item.prev.y
			}));
		}
	}
	return result;
};
var defaultLineProps = {
	activeDot: true,
	animateNewValues: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: defaultLineAnimateItems,
	animationMatchBy: matchByIndex,
	connectNulls: false,
	dot: true,
	fill: "#fff",
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "line",
	shape: LineDrawShape,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.line,
	type: "linear"
};
/**
* Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
*/
var computeLegendPayloadFromAreaData = (props) => {
	var dataKey = props.dataKey, name = props.name, stroke = props.stroke, legendType = props.legendType;
	return [{
		inactive: props.hide,
		dataKey,
		type: legendType,
		color: stroke,
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetLineTooltipEntrySettings = /*#__PURE__*/ import_react.memo((_ref) => {
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
			color: stroke,
			unit,
			formatter,
			graphicalItemId: id
		}
	};
	return /*#__PURE__*/ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function LineDotsWrapper(_ref2) {
	var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
	var dot = props.dot, dataKey = props.dataKey, needClip = props.needClip;
	props.id;
	var propsWithoutId = _objectWithoutProperties$2(props, _excluded$2);
	var lineProps = svgPropertiesNoEvents(propsWithoutId);
	return /*#__PURE__*/ import_react.createElement(Dots, {
		points,
		dot,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey,
		baseProps: lineProps,
		needClip,
		clipPathId
	});
}
function LineLabelListProvider(_ref3) {
	var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
	var labelListEntries = (0, import_react.useMemo)(() => {
		return points === null || points === void 0 ? void 0 : points.map((point) => {
			var _point$x, _point$y;
			var viewBox = {
				x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
				y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
				width: 0,
				lowerWidth: 0,
				upperWidth: 0,
				height: 0
			};
			return _objectSpread$3(_objectSpread$3({}, viewBox), {}, {
				value: point.value,
				payload: point.payload,
				viewBox,
				parentViewBox: void 0,
				fill: void 0
			});
		});
	}, [points]);
	return /*#__PURE__*/ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function StaticCurve(_ref4) {
	var clipPathId = _ref4.clipPathId, pathRef = _ref4.pathRef, points = _ref4.points, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance, visibleLength = _ref4.visibleLength;
	var type = props.type, layout = props.layout, connectNulls = props.connectNulls, needClip = props.needClip, shape = props.shape, strokeDasharray = props.strokeDasharray, others = _objectWithoutProperties$2(props, _excluded2$1);
	var curveProps = _objectSpread$3(_objectSpread$3({}, svgPropertiesAndEvents(others)), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0,
		points,
		type,
		layout,
		connectNulls,
		strokeDasharray: strokeDasharray !== null && strokeDasharray !== void 0 ? strokeDasharray : props.strokeDasharray,
		pathRef,
		animationElapsedTime,
		isAnimating,
		isEntrance: props.animateNewValues ? isEntrance : false,
		visibleLength
	});
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /*#__PURE__*/ import_react.createElement(Shape, {
		option: shape,
		DefaultShape: defaultLineProps.shape,
		shapeProps: curveProps
	}), /*#__PURE__*/ import_react.createElement(LineDotsWrapper, {
		points,
		clipPathId,
		props
	}));
}
function CurveWithAnimation(_ref5) {
	var clipPathId = _ref5.clipPathId, props = _ref5.props, pathRef = _ref5.pathRef, previousPointsRef = _ref5.previousPointsRef;
	var points = props.points, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
	var totalLength = getTotalLength(pathRef.current);
	var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var showLabels = !isAnimating;
	var getVisibleLength = useAnimatedLineLength(points);
	var shouldUpdatePreviousRef = (0, import_react.useCallback)((animationElapsedTime) => animationElapsedTime > 0 && totalLength > 0, [totalLength]);
	return /*#__PURE__*/ import_react.createElement(LineLabelListProvider, {
		points,
		showLabels
	}, props.children, /*#__PURE__*/ import_react.createElement(AnimatedItems, {
		animationInput: points,
		animationIdPrefix: "recharts-line-",
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
		shouldUpdatePreviousRef,
		layout
	}, (stepData, animationElapsedTime, isEntrance) => {
		var animationActive = isAnimating || animationElapsedTime < 1;
		var visibleLength = animationActive ? getVisibleLength(animationElapsedTime, totalLength) : null;
		return /*#__PURE__*/ import_react.createElement(StaticCurve, {
			props,
			points: stepData,
			clipPathId,
			pathRef,
			animationElapsedTime,
			isAnimating: animationActive,
			isEntrance,
			visibleLength
		});
	}), /*#__PURE__*/ import_react.createElement(LabelListFromLabelProp, { label: props.label }));
}
function RenderCurve(_ref6) {
	var clipPathId = _ref6.clipPathId, props = _ref6.props;
	var previousPointsRef = (0, import_react.useRef)(null);
	var pathRef = (0, import_react.useRef)(null);
	return /*#__PURE__*/ import_react.createElement(CurveWithAnimation, {
		props,
		clipPathId,
		previousPointsRef,
		pathRef
	});
}
var errorBarDataPointFormatter$1 = (dataPoint, dataKey) => {
	var _dataPoint$x, _dataPoint$y;
	return {
		x: (_dataPoint$x = dataPoint.x) !== null && _dataPoint$x !== void 0 ? _dataPoint$x : void 0,
		y: (_dataPoint$y = dataPoint.y) !== null && _dataPoint$y !== void 0 ? _dataPoint$y : void 0,
		value: dataPoint.value,
		errorVal: getValueByDataKey(dataPoint.payload, dataKey)
	};
};
var LineWithState = class extends import_react.Component {
	render() {
		var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, top = _this$props.top, left = _this$props.left, width = _this$props.width, height = _this$props.height, id = _this$props.id, needClip = _this$props.needClip, zIndex = _this$props.zIndex;
		if (hide) return null;
		var layerClass = clsx("recharts-line", className);
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
		}))), /*#__PURE__*/ import_react.createElement(SetErrorBarContext, {
			xAxisId,
			yAxisId,
			data: points,
			dataPointFormatter: errorBarDataPointFormatter$1,
			errorBarOffset: 0
		}, /*#__PURE__*/ import_react.createElement(RenderCurve, {
			props: this.props,
			clipPathId
		}))), /*#__PURE__*/ import_react.createElement(ActivePoints, {
			activeDot: this.props.activeDot,
			points,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: activePointsClipPath
		}));
	}
};
function LineImpl(props) {
	var _resolveDefaultProps = resolveDefaultProps(props, defaultLineProps), activeDot = _resolveDefaultProps.activeDot, animateNewValues = _resolveDefaultProps.animateNewValues, animationBegin = _resolveDefaultProps.animationBegin, animationDuration = _resolveDefaultProps.animationDuration, animationEasing = _resolveDefaultProps.animationEasing, connectNulls = _resolveDefaultProps.connectNulls, dot = _resolveDefaultProps.dot, hide = _resolveDefaultProps.hide, isAnimationActive = _resolveDefaultProps.isAnimationActive, label = _resolveDefaultProps.label, legendType = _resolveDefaultProps.legendType, xAxisId = _resolveDefaultProps.xAxisId, yAxisId = _resolveDefaultProps.yAxisId, id = _resolveDefaultProps.id, everythingElse = _objectWithoutProperties$2(_resolveDefaultProps, _excluded3$1);
	var needClip = useNeedsClip(xAxisId, yAxisId).needClip;
	var plotArea = usePlotArea();
	var layout = useChartLayout();
	var isPanorama = useIsPanorama();
	var points = useAppSelector((state) => selectLinePoints(state, xAxisId, yAxisId, isPanorama, id));
	if (layout !== "horizontal" && layout !== "vertical" || points == null || plotArea == null) return null;
	var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
	return /*#__PURE__*/ import_react.createElement(LineWithState, _extends$2({}, everythingElse, {
		id,
		connectNulls,
		dot,
		activeDot,
		animateNewValues,
		animationBegin,
		animationDuration,
		animationEasing,
		isAnimationActive,
		hide,
		label,
		legendType,
		xAxisId,
		yAxisId,
		points,
		layout,
		height,
		width,
		left,
		top,
		needClip
	}));
}
function computeLinePoints(_ref7) {
	var layout = _ref7.layout, xAxis = _ref7.xAxis, yAxis = _ref7.yAxis, xAxisTicks = _ref7.xAxisTicks, yAxisTicks = _ref7.yAxisTicks, dataKey = _ref7.dataKey, bandSize = _ref7.bandSize;
	return _ref7.displayedData.map((entry, index) => {
		var value = getValueByDataKey(entry, dataKey);
		if (layout === "horizontal") {
			var _x = getCateCoordinateOfLine({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				entry,
				index
			});
			var _y = isNullish(value) ? null : yAxis.scale.map(value);
			return {
				x: _x,
				y: _y !== null && _y !== void 0 ? _y : null,
				value,
				payload: entry
			};
		}
		var x = isNullish(value) ? null : xAxis.scale.map(value);
		var y = getCateCoordinateOfLine({
			axis: yAxis,
			ticks: yAxisTicks,
			bandSize,
			entry,
			index
		});
		if (x == null || y == null) return null;
		return {
			x,
			y,
			value,
			payload: entry
		};
	}).filter(Boolean);
}
function LineFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultLineProps);
	var isPanorama = useIsPanorama();
	return /*#__PURE__*/ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "line"
	}, (id) => /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromAreaData(props) }), /*#__PURE__*/ import_react.createElement(SetLineTooltipEntrySettings, {
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
		type: "line",
		id,
		data: props.data,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		dataKey: props.dataKey,
		hide: props.hide,
		isPanorama
	}), /*#__PURE__*/ import_react.createElement(LineImpl, _extends$2({}, props, { id }))));
}
/**
* @provides LabelListContext
* @provides ErrorBarContext
* @consumes CartesianChartContext
*/
var Line = /*#__PURE__*/ import_react.memo(LineFn, propsAreEqual);
Line.displayName = "Line";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/util/ScatterUtils.js
var _excluded$1 = ["option"];
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
function renderSymbols(props) {
	return /*#__PURE__*/ import_react.createElement(Symbols, props);
}
function ScatterSymbol(_ref) {
	var option = _ref.option, props = _objectWithoutProperties$1(_ref, _excluded$1);
	if (typeof option === "string") return /*#__PURE__*/ import_react.createElement(Shape, {
		option: /*#__PURE__*/ import_react.createElement(Symbols, _extends$1({ type: option }, props)),
		DefaultShape: renderSymbols,
		shapeProps: props
	});
	return /*#__PURE__*/ import_react.createElement(Shape, {
		option,
		DefaultShape: renderSymbols,
		shapeProps: props
	});
}
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/state/selectors/scatterSelectors.js
var selectXAxisWithScale = (state, xAxisId, _yAxisId, _zAxisId, _id, _cells, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks = (state, xAxisId, _yAxisId, _zAxisId, _id, _cells, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale = (state, _xAxisId, yAxisId, _zAxisId, _id, _cells, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks = (state, _xAxisId, yAxisId, _zAxisId, _id, _cells, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectZAxis = (state, _xAxisId, _yAxisId, zAxisId) => selectZAxisWithScale(state, "zAxis", zAxisId, false);
var pickScatterId = (_state, _xAxisId, _yAxisId, _zAxisId, id) => id;
var pickCells = (_state, _xAxisId, _yAxisId, _zAxisId, _id, cells) => cells;
var scatterChartDataSelector = (state, _xAxisId, _yAxisId, _zAxisId, _id, _cells, isPanorama) => selectChartDataWithIndexesIfNotInPanoramaPosition4(state, void 0, void 0, isPanorama);
var selectSynchronisedScatterSettings = createSelector([selectUnfilteredCartesianItems, pickScatterId], (graphicalItems, id) => {
	return graphicalItems.filter((item) => item.type === "scatter").find((item) => item.id === id);
});
var selectScatterPoints = createSelector([
	scatterChartDataSelector,
	selectXAxisWithScale,
	selectXAxisTicks,
	selectYAxisWithScale,
	selectYAxisTicks,
	selectZAxis,
	selectSynchronisedScatterSettings,
	pickCells
], (_ref, xAxis, xAxisTicks, yAxis, yAxisTicks, zAxis, scatterSettings, cells) => {
	var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
	if (scatterSettings == null) return;
	var displayedData;
	if ((scatterSettings === null || scatterSettings === void 0 ? void 0 : scatterSettings.data) != null && scatterSettings.data.length > 0) displayedData = scatterSettings.data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || (xAxisTicks === null || xAxisTicks === void 0 ? void 0 : xAxisTicks.length) === 0 || (yAxisTicks === null || yAxisTicks === void 0 ? void 0 : yAxisTicks.length) === 0) return;
	return computeScatterPoints({
		displayedData,
		xAxis,
		yAxis,
		zAxis,
		scatterSettings,
		xAxisTicks,
		yAxisTicks,
		cells
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/Scatter.js
var _excluded = ["id"];
var _excluded2 = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
var _excluded3 = [
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"hide",
	"isAnimationActive",
	"legendType",
	"lineJointType",
	"lineType",
	"shape",
	"xAxisId",
	"yAxisId",
	"zAxisId"
];
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
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
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
/**
* Scatter coordinates are nullable because sometimes the point value is out of the domain,
* and we can't compute a valid coordinate for it.
*
* Scatter -> Symbol ignores points with null cx or cy so those won't render if using the default shapes.
* However: the points are exposed via various props and can be used in custom shapes so we keep them around.
*/
/**
* Internal props, combination of external props + defaultProps + private Recharts state
*/
/**
* External props, intended for end users to fill in
*/
/**
* Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
*/
var computeLegendPayloadFromScatterProps = (props) => {
	var dataKey = props.dataKey, name = props.name, fill = props.fill, legendType = props.legendType;
	return [{
		inactive: props.hide,
		dataKey,
		type: legendType,
		color: fill,
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetScatterTooltipEntrySettings = /*#__PURE__*/ import_react.memo((_ref) => {
	var dataKey = _ref.dataKey, points = _ref.points, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: points === null || points === void 0 ? void 0 : points.map((p) => p.tooltipPayload),
		getPosition: (index) => {
			var _points$Number;
			return points === null || points === void 0 || (_points$Number = points[Number(index)]) === null || _points$Number === void 0 ? void 0 : _points$Number.tooltipPosition;
		},
		settings: {
			stroke,
			strokeWidth,
			fill,
			nameKey: void 0,
			dataKey,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: fill,
			unit: "",
			formatter,
			graphicalItemId: id
		}
	};
	return /*#__PURE__*/ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function ScatterLine(_ref2) {
	var points = _ref2.points, props = _ref2.props;
	var line = props.line, lineType = props.lineType, lineJointType = props.lineJointType;
	if (!line) return null;
	var scatterProps = svgPropertiesNoEvents(props);
	var customLineProps = svgPropertiesNoEventsFromUnknown(line);
	var linePoints, lineItem;
	if (lineType === "joint") linePoints = points.map((entry) => {
		var _entry$cx, _entry$cy;
		return {
			x: (_entry$cx = entry.cx) !== null && _entry$cx !== void 0 ? _entry$cx : null,
			y: (_entry$cy = entry.cy) !== null && _entry$cy !== void 0 ? _entry$cy : null
		};
	});
	else if (lineType === "fitting") {
		var _getLinearRegression = getLinearRegression(points), xmin = _getLinearRegression.xmin, xmax = _getLinearRegression.xmax, a = _getLinearRegression.a, b = _getLinearRegression.b;
		var linearExp = (x) => a * x + b;
		linePoints = [{
			x: xmin,
			y: linearExp(xmin)
		}, {
			x: xmax,
			y: linearExp(xmax)
		}];
	}
	var lineProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, scatterProps), {}, {
		fill: "none",
		stroke: scatterProps && scatterProps.fill
	}, customLineProps), {}, { points: linePoints });
	if (/*#__PURE__*/ import_react.isValidElement(line)) lineItem = /*#__PURE__*/ import_react.cloneElement(line, lineProps);
	else if (typeof line === "function") lineItem = line(lineProps);
	else lineItem = /*#__PURE__*/ import_react.createElement(Curve, _extends({}, lineProps, { type: lineJointType }));
	return /*#__PURE__*/ import_react.createElement(Layer, {
		className: "recharts-scatter-line",
		key: "recharts-scatter-line"
	}, lineItem);
}
function ScatterLabelListProvider(_ref3) {
	var showLabels = _ref3.showLabels, points = _ref3.points, children = _ref3.children;
	var chartViewBox = useViewBox();
	var labelListEntries = (0, import_react.useMemo)(() => {
		return points === null || points === void 0 ? void 0 : points.map((point) => {
			var _point$x, _point$y;
			var viewBox = {
				x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
				y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
				width: point.width,
				height: point.height,
				lowerWidth: point.width,
				upperWidth: point.width
			};
			return _objectSpread$2(_objectSpread$2({}, viewBox), {}, {
				value: void 0,
				payload: point.payload,
				viewBox,
				parentViewBox: chartViewBox,
				fill: void 0
			});
		});
	}, [chartViewBox, points]);
	return /*#__PURE__*/ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
/**
* Individual scatter point component that subscribes to its own isActive state.
* This avoids re-rendering all points when the active index changes —
* only the point becoming active and the point becoming inactive re-render.
*
* @param entry The scatter point data including coordinates, size, and tooltip payload
* @param index The index of this point in the points array
* @param shape The default shape to render for inactive points
* @param activeShape The shape to render when this point is active, or undefined if no active shape
* @param baseProps SVG presentation attributes (fill, stroke, etc.) shared across all points
* @param id The graphical item ID of the parent Scatter component
* @param restOfAllOtherProps Remaining Scatter props for user-provided event handlers via adaptEventsOfChild
* @param onMouseEnterFromContext Curried mouse enter handler that dispatches tooltip activation
* @param onMouseLeaveFromContext Curried mouse leave handler that dispatches tooltip deactivation
* @param onClickFromContext Curried click handler that dispatches tooltip click activation
*/
function ScatterPoint(_ref4) {
	var _useAppSelector;
	var entry = _ref4.entry, index = _ref4.index, shape = _ref4.shape, activeShape = _ref4.activeShape, baseProps = _ref4.baseProps, id = _ref4.id, restOfAllOtherProps = _ref4.restOfAllOtherProps, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance, onMouseEnterFromContext = _ref4.onMouseEnterFromContext, onMouseLeaveFromContext = _ref4.onMouseLeaveFromContext, onClickFromContext = _ref4.onClickFromContext;
	var hasActiveShape = activeShape != null && activeShape !== false;
	var selectIsActive = (0, import_react.useMemo)(() => {
		var strIndex = String(index);
		return (state) => hasActiveShape && selectActiveTooltipIndex(state) === strIndex;
	}, [hasActiveShape, index]);
	var isActive = (_useAppSelector = useAppSelector(selectIsActive)) !== null && _useAppSelector !== void 0 ? _useAppSelector : false;
	var option = isActive && activeShape != null && activeShape !== false ? activeShape : shape;
	var symbolProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, baseProps), entry), {}, {
		isActive,
		index,
		animationElapsedTime,
		isAnimating,
		isEntrance,
		[DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME]: String(id)
	});
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: isActive ? DefaultZIndexes.activeDot : void 0 }, /*#__PURE__*/ import_react.createElement(Layer, _extends({ className: "recharts-scatter-symbol" }, adaptEventsOfChild(restOfAllOtherProps, entry, index), {
		onMouseEnter: onMouseEnterFromContext(entry, index),
		onMouseLeave: onMouseLeaveFromContext(entry, index),
		onClick: onClickFromContext(entry, index)
	}), /*#__PURE__*/ import_react.createElement(ScatterSymbol, _extends({ option }, symbolProps))));
}
function ScatterSymbols(props) {
	var points = props.points, allOtherScatterProps = props.allOtherScatterProps, animationElapsedTime = props.animationElapsedTime, isAnimating = props.isAnimating, isEntrance = props.isEntrance;
	var shape = allOtherScatterProps.shape, activeShape = allOtherScatterProps.activeShape, dataKey = allOtherScatterProps.dataKey;
	var id = allOtherScatterProps.id, allOtherPropsWithoutId = _objectWithoutProperties(allOtherScatterProps, _excluded);
	var onMouseEnterFromProps = allOtherScatterProps.onMouseEnter, onItemClickFromProps = allOtherScatterProps.onClick, onMouseLeaveFromProps = allOtherScatterProps.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties(allOtherScatterProps, _excluded2);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, id);
	if (!isNonEmptyArray(points)) return null;
	var baseProps = svgPropertiesNoEvents(allOtherPropsWithoutId);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(ScatterLine, {
		points,
		props: allOtherPropsWithoutId
	}), points.map((entry, i) => /*#__PURE__*/ import_react.createElement(ScatterPoint, {
		key: "symbol-".concat(entry === null || entry === void 0 ? void 0 : entry.cx, "-").concat(entry === null || entry === void 0 ? void 0 : entry.cy, "-").concat(entry === null || entry === void 0 ? void 0 : entry.size, "-").concat(i),
		entry,
		index: i,
		shape,
		activeShape,
		baseProps,
		id,
		restOfAllOtherProps,
		animationElapsedTime,
		isAnimating,
		isEntrance,
		onMouseEnterFromContext,
		onMouseLeaveFromContext,
		onClickFromContext
	})));
}
var defaultScatterAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	return items.flatMap((item) => {
		if (item.status === "removed") return [];
		if (item.status === "matched") return [_objectSpread$2(_objectSpread$2({}, item.next), {}, {
			cx: item.next.cx == null ? void 0 : interpolate(item.prev.cx, item.next.cx, animationElapsedTime),
			cy: item.next.cy == null ? void 0 : interpolate(item.prev.cy, item.next.cy, animationElapsedTime),
			size: interpolate(item.prev.size, item.next.size, animationElapsedTime)
		})];
		return [_objectSpread$2(_objectSpread$2({}, item.next), {}, { size: interpolate(0, item.next.size, animationElapsedTime) })];
	});
};
function SymbolsWithAnimation(_ref5) {
	var previousPointsRef = _ref5.previousPointsRef, props = _ref5.props;
	var points = props.points, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationInterpolateFn = props.animationInterpolateFn;
	var _useAnimationCallback = useAnimationCallbacks(), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var layout = useCartesianChartLayout();
	if (layout == null) return null;
	return /*#__PURE__*/ import_react.createElement(ScatterLabelListProvider, {
		showLabels: !isAnimating,
		points
	}, /*#__PURE__*/ import_react.createElement(AnimatedItems, {
		animationInput: props,
		animationIdPrefix: "recharts-scatter-",
		items: points,
		previousItemsRef: previousPointsRef,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		onAnimationStart: handleAnimationStart,
		onAnimationEnd: handleAnimationEnd,
		animationInterpolateFn,
		animationMatchBy: props.animationMatchBy,
		layout
	}, (stepData, animationElapsedTime, isEntrance) => /*#__PURE__*/ import_react.createElement(Layer, null, /*#__PURE__*/ import_react.createElement(ScatterSymbols, {
		points: stepData,
		allOtherScatterProps: props,
		showLabels: !isAnimating,
		animationElapsedTime,
		isAnimating: isAnimating || animationElapsedTime < 1,
		isEntrance
	}))), props.children, /*#__PURE__*/ import_react.createElement(LabelListFromLabelProp, { label: props.label }));
}
function computeScatterPoints(_ref6) {
	var displayedData = _ref6.displayedData, xAxis = _ref6.xAxis, yAxis = _ref6.yAxis, zAxis = _ref6.zAxis, scatterSettings = _ref6.scatterSettings, xAxisTicks = _ref6.xAxisTicks, yAxisTicks = _ref6.yAxisTicks, cells = _ref6.cells;
	var xAxisDataKey = isNullish(xAxis.dataKey) ? scatterSettings.dataKey : xAxis.dataKey;
	var yAxisDataKey = isNullish(yAxis.dataKey) ? scatterSettings.dataKey : yAxis.dataKey;
	var zAxisDataKey = zAxis && zAxis.dataKey;
	var defaultRangeZ = zAxis ? zAxis.range : implicitZAxis.range;
	var defaultZ = defaultRangeZ && defaultRangeZ[0];
	var xBandSize = xAxis.scale.bandwidth ? xAxis.scale.bandwidth() : 0;
	var yBandSize = yAxis.scale.bandwidth ? yAxis.scale.bandwidth() : 0;
	return displayedData.map((entry, index) => {
		var x = getValueByDataKey(entry, xAxisDataKey);
		var y = getValueByDataKey(entry, yAxisDataKey);
		var z = !isNullish(zAxisDataKey) && getValueByDataKey(entry, zAxisDataKey) || "-";
		var tooltipPayload = [{
			name: isNullish(xAxis.dataKey) ? scatterSettings.name : xAxis.name || String(xAxis.dataKey),
			unit: xAxis.unit || "",
			value: x,
			payload: entry,
			dataKey: xAxisDataKey,
			type: scatterSettings.tooltipType,
			graphicalItemId: scatterSettings.id
		}, {
			name: isNullish(yAxis.dataKey) ? scatterSettings.name : yAxis.name || String(yAxis.dataKey),
			unit: yAxis.unit || "",
			value: y,
			payload: entry,
			dataKey: yAxisDataKey,
			type: scatterSettings.tooltipType,
			graphicalItemId: scatterSettings.id
		}];
		if (z !== "-" && zAxis != null) tooltipPayload.push({
			name: zAxis.name || zAxis.dataKey,
			unit: zAxis.unit || "",
			value: z,
			payload: entry,
			dataKey: zAxisDataKey,
			type: scatterSettings.tooltipType,
			graphicalItemId: scatterSettings.id
		});
		var cx = getCateCoordinateOfLine({
			axis: xAxis,
			ticks: xAxisTicks,
			bandSize: xBandSize,
			entry,
			index,
			dataKey: xAxisDataKey
		});
		var cy = getCateCoordinateOfLine({
			axis: yAxis,
			ticks: yAxisTicks,
			bandSize: yBandSize,
			entry,
			index,
			dataKey: yAxisDataKey
		});
		var size = z !== "-" && zAxis != null ? zAxis.scale.map(z) : defaultZ;
		var radius = size == null ? 0 : Math.sqrt(Math.max(size, 0) / Math.PI);
		return _objectSpread$2(_objectSpread$2({}, entry), {}, {
			cx,
			cy,
			x: cx == null ? void 0 : cx - radius,
			y: cy == null ? void 0 : cy - radius,
			width: 2 * radius,
			height: 2 * radius,
			size,
			node: {
				x,
				y,
				z
			},
			tooltipPayload,
			tooltipPosition: {
				x: cx,
				y: cy
			},
			payload: entry
		}, cells && cells[index] && cells[index].props);
	});
}
var errorBarDataPointFormatter = (dataPoint, dataKey, direction) => {
	return {
		x: dataPoint.cx,
		y: dataPoint.cy,
		value: direction === "x" ? Number(dataPoint.node.x) : Number(dataPoint.node.y),
		errorVal: getValueByDataKey(dataPoint, dataKey)
	};
};
function ScatterWithId(props) {
	var hide = props.hide, points = props.points, className = props.className, needClip = props.needClip, xAxisId = props.xAxisId, yAxisId = props.yAxisId, id = props.id;
	var previousPointsRef = (0, import_react.useRef)(null);
	if (hide) return null;
	var layerClass = clsx("recharts-scatter", className);
	var clipPathId = id;
	return /*#__PURE__*/ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /*#__PURE__*/ import_react.createElement(Layer, {
		className: layerClass,
		clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0,
		id
	}, needClip && /*#__PURE__*/ import_react.createElement("defs", null, /*#__PURE__*/ import_react.createElement(GraphicalItemClipPath, {
		clipPathId,
		xAxisId,
		yAxisId
	})), /*#__PURE__*/ import_react.createElement(SetErrorBarContext, {
		xAxisId,
		yAxisId,
		data: points,
		dataPointFormatter: errorBarDataPointFormatter,
		errorBarOffset: 0
	}, /*#__PURE__*/ import_react.createElement(Layer, { key: "recharts-scatter-symbols" }, /*#__PURE__*/ import_react.createElement(SymbolsWithAnimation, {
		props,
		previousPointsRef
	})))));
}
var defaultScatterProps = {
	xAxisId: 0,
	yAxisId: 0,
	zAxisId: 0,
	label: false,
	line: false,
	legendType: "circle",
	lineType: "joint",
	lineJointType: "linear",
	shape: "circle",
	hide: false,
	isAnimationActive: "auto",
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "linear",
	animationMatchBy: matchAppend,
	animationInterpolateFn: defaultScatterAnimateItems,
	zIndex: DefaultZIndexes.scatter
};
function ScatterImpl(props) {
	var _resolveDefaultProps = resolveDefaultProps(props, defaultScatterProps), animationBegin = _resolveDefaultProps.animationBegin, animationDuration = _resolveDefaultProps.animationDuration, animationEasing = _resolveDefaultProps.animationEasing, hide = _resolveDefaultProps.hide, isAnimationActive = _resolveDefaultProps.isAnimationActive, legendType = _resolveDefaultProps.legendType, lineJointType = _resolveDefaultProps.lineJointType, lineType = _resolveDefaultProps.lineType, shape = _resolveDefaultProps.shape, xAxisId = _resolveDefaultProps.xAxisId, yAxisId = _resolveDefaultProps.yAxisId, zAxisId = _resolveDefaultProps.zAxisId, everythingElse = _objectWithoutProperties(_resolveDefaultProps, _excluded3);
	var needClip = useNeedsClip(xAxisId, yAxisId).needClip;
	var cells = (0, import_react.useMemo)(() => findAllByType(props.children, Cell), [props.children]);
	var isPanorama = useIsPanorama();
	var points = useAppSelector((state) => {
		return selectScatterPoints(state, xAxisId, yAxisId, zAxisId, props.id, cells, isPanorama);
	});
	if (needClip == null) return null;
	if (points == null) return null;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetScatterTooltipEntrySettings, {
		dataKey: props.dataKey,
		points,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		formatter: props.formatter,
		tooltipType: props.tooltipType,
		id: props.id
	}), /*#__PURE__*/ import_react.createElement(ScatterWithId, _extends({}, everythingElse, {
		xAxisId,
		yAxisId,
		zAxisId,
		lineType,
		lineJointType,
		legendType,
		shape,
		hide,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		points,
		needClip
	})));
}
function ScatterFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultScatterProps);
	var isPanorama = useIsPanorama();
	return /*#__PURE__*/ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "scatter"
	}, (id) => /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromScatterProps(props) }), /*#__PURE__*/ import_react.createElement(SetCartesianGraphicalItem, {
		type: "scatter",
		id,
		data: props.data,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: props.zAxisId,
		dataKey: props.dataKey,
		hide: props.hide,
		name: props.name,
		tooltipType: props.tooltipType,
		isPanorama
	}), /*#__PURE__*/ import_react.createElement(ScatterImpl, _extends({}, props, { id }))));
}
/**
* @provides LabelListContext
* @provides ErrorBarContext
* @provides CellReader
* @consumes CartesianChartContext
*/
var Scatter = /*#__PURE__*/ import_react.memo(ScatterFn, propsAreEqual);
Scatter.displayName = "Scatter";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/cartesian/ZAxis.js
function SetZAxisSettings(settings) {
	var dispatch = useAppDispatch();
	var prevSettingsRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (prevSettingsRef.current === null) dispatch(addZAxis(settings));
		else if (prevSettingsRef.current !== settings) dispatch(replaceZAxis({
			prev: prevSettingsRef.current,
			next: settings
		}));
		prevSettingsRef.current = settings;
	}, [settings, dispatch]);
	(0, import_react.useLayoutEffect)(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeZAxis(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
var zAxisDefaultProps = {
	zAxisId: 0,
	range: implicitZAxis.range,
	scale: implicitZAxis.scale,
	type: implicitZAxis.type
};
/**
* Virtual axis, does not render anything itself. Has no ticks, grid lines, or labels.
* Useful for dynamically setting Scatter point size, based on data.
*
* @consumes CartesianViewBoxContext
*/
function ZAxis(outsideProps) {
	var props = resolveDefaultProps(outsideProps, zAxisDefaultProps);
	return /*#__PURE__*/ import_react.createElement(SetZAxisSettings, {
		domain: props.domain,
		id: props.zAxisId,
		dataKey: props.dataKey,
		name: props.name,
		unit: props.unit,
		range: props.range,
		scale: props.scale,
		type: props.type,
		allowDuplicatedCategory: implicitZAxis.allowDuplicatedCategory,
		allowDataOverflow: implicitZAxis.allowDataOverflow,
		reversed: implicitZAxis.reversed,
		includeHidden: implicitZAxis.includeHidden
	});
}
ZAxis.displayName = "ZAxis";
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/LineChart.js
var allowedTooltipTypes$3 = ["axis"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var LineChart = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	return /*#__PURE__*/ import_react.createElement(CartesianChart, {
		chartName: "LineChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes$3,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/RadarChart.js
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
var allowedTooltipTypes$2 = ["axis"];
var defaultRadarChartProps = _objectSpread$1(_objectSpread$1({}, defaultPolarChartProps), {}, {
	layout: "centric",
	startAngle: 90,
	endAngle: -270
});
/**
* @consumes ResponsiveContainerContext
* @provides PolarViewBoxContext
* @provides PolarChartContext
*/
var RadarChart = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	var propsWithDefaults = resolveDefaultProps(props, defaultRadarChartProps);
	return /*#__PURE__*/ import_react.createElement(PolarChart, {
		chartName: "RadarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes$2,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: propsWithDefaults,
		ref
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/ScatterChart.js
var allowedTooltipTypes$1 = ["item"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var ScatterChart = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	return /*#__PURE__*/ import_react.createElement(CartesianChart, {
		chartName: "ScatterChart",
		defaultTooltipEventType: "item",
		validateTooltipEventTypes: allowedTooltipTypes$1,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
// ../../node_modules/.pnpm/recharts@3.10.1_@types+reac_78a4d4f5d57ae67d0ab4d88c6ee8d27a/node_modules/recharts/es6/chart/RadialBarChart.js
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
var allowedTooltipTypes = ["axis", "item"];
var defaultRadialBarChartProps = _objectSpread(_objectSpread({}, defaultPolarChartProps), {}, {
	layout: "radial",
	startAngle: 0,
	endAngle: 360
});
/**
* @consumes ResponsiveContainerContext
* @provides PolarViewBoxContext
* @provides PolarChartContext
*/
var RadialBarChart = /*#__PURE__*/ (0, import_react.forwardRef)((props, ref) => {
	var propsWithDefaults = resolveDefaultProps(props, defaultRadialBarChartProps);
	return /*#__PURE__*/ import_react.createElement(PolarChart, {
		chartName: "RadialBarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: propsWithDefaults,
		ref
	});
});
export { Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ReferenceLine, Scatter, ScatterChart, ZAxis };

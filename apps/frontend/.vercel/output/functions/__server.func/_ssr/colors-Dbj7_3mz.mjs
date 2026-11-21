import { __toESM } from "../_runtime.mjs";
import { cn } from "./router-BGnyA3VS.mjs";
import { require_react } from "../_libs/@base-ui/react+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { ResponsiveContainer, Tooltip } from "../_libs/recharts+[...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/colors-Dbj7_3mz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Keep stylesheet text inside its HTML style element, including during SSR.
* This encodes an HTML boundary; it does not sanitize arbitrary CSS.
*/
function encodeChartStyleText(css) {
	const parts = [];
	let precedingBackslashes = 0;
	for (const character of css) {
		if (character === "<") parts.push(precedingBackslashes % 2 === 1 ? "3c " : "\\3c ");
		else parts.push(character);
		precedingBackslashes = character === "\\" ? precedingBackslashes + 1 : 0;
	}
	return parts.join("");
}
var THEMES = {
	light: "",
	dark: ".dark"
};
var INITIAL_DIMENSION = {
	width: 320,
	height: 200
};
var ChartContext = import_react.createContext(null);
function ChartContainer({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }) {
	const uniqueId = import_react.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartContext.Provider, {
		value: { config },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-slot": "chart",
			"data-chart": chartId,
			className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden", className),
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartStyle, {
				id: chartId,
				config
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				initialDimension,
				children
			})]
		})
	});
}
var ChartStyle = ({ id, config }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme ?? config.color);
	if (!colorConfig.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: encodeChartStyleText(Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	}).join("\n")}
}
`).join("\n")) } });
};
var ChartTooltip = Tooltip;
var CATEGORY_COLORS = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
	"color-mix(in oklch, var(--chart-1) 55%, var(--foreground))",
	"color-mix(in oklch, var(--chart-2) 55%, var(--foreground))",
	"color-mix(in oklch, var(--chart-3) 50%, var(--background))",
	"color-mix(in oklch, var(--chart-4) 55%, var(--foreground))",
	"color-mix(in oklch, var(--chart-5) 50%, var(--background))"
];
var INCOME_COLOR = "var(--chart-1)";
var EXPENSE_COLOR = "var(--chart-2)";
var BALANCE_COLOR = "var(--chart-3)";
function colorAt(i) {
	return CATEGORY_COLORS[i % CATEGORY_COLORS.length] ?? "var(--chart-1)";
}
export { BALANCE_COLOR, ChartContainer, ChartTooltip, EXPENSE_COLOR, INCOME_COLOR, colorAt };

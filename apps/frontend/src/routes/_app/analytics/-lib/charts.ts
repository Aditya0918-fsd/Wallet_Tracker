export type ChartId =
  | "bar"
  | "column"
  | "grouped"
  | "lollipop"
  | "bullet"
  | "radialBar"
  | "parallel"
  | "radar"
  | "nightingale"
  | "waterfall"
  | "table"
  | "bubble"
  | "connectedScatter"
  | "pyramid"
  | "pie"
  | "semiDonut"
  | "marimekko"
  | "gauge"
  | "sunburst"
  | "stream"
  | "bump"
  | "spline"
  | "candlestick";

export type ChartMeta = { id: ChartId; label: string; group: string; description: string };

export const CHARTS: ChartMeta[] = [
  { id: "grouped", label: "Grouped column", group: "Compare", description: "Income and expenses side by side for each period." },
  { id: "column", label: "Column chart", group: "Compare", description: "Net cash flow per period. Green columns saved money, red columns overspent." },
  { id: "bar", label: "Bar graph", group: "Compare", description: "Spending by category, largest first." },
  { id: "lollipop", label: "Lollipop chart", group: "Compare", description: "Spending by category as a lighter-weight bar chart." },
  { id: "bullet", label: "Bullet chart", group: "Compare", description: "Spending versus each budget, scaled to the length of the selected range." },
  { id: "pyramid", label: "Population pyramid", group: "Compare", description: "Income to the left, expenses to the right, for each period." },
  { id: "pie", label: "Pie chart", group: "Composition", description: "Share of total spending by category." },
  { id: "semiDonut", label: "Semicircle donut", group: "Composition", description: "Share of spending by category on a half ring." },
  { id: "sunburst", label: "Sunburst chart", group: "Composition", description: "Inner ring: income vs expenses. Outer ring: the categories inside each." },
  { id: "marimekko", label: "Marimekko chart", group: "Composition", description: "Column width is each period's total spending; segments show category mix." },
  { id: "nightingale", label: "Nightingale chart", group: "Composition", description: "Equal-angle petals whose length shows category spending." },
  { id: "radialBar", label: "Radial bar chart", group: "Composition", description: "Top spending categories as concentric rings." },
  { id: "waterfall", label: "Waterfall chart", group: "Flow", description: "How income builds up and each expense category draws it down to your net savings." },
  { id: "spline", label: "Spline chart", group: "Trend", description: "Smoothed income and expense lines over time." },
  { id: "stream", label: "Stream graph", group: "Trend", description: "Top spending categories flowing over time." },
  { id: "bump", label: "Bump chart", group: "Trend", description: "Ranking of your top spending categories in each period (1 = highest)." },
  { id: "candlestick", label: "Candlestick chart", group: "Trend", description: "Balance per period: opening, closing, highest, and lowest point." },
  { id: "connectedScatter", label: "Connected scatter plot", group: "Relationship", description: "Each dot is a period: income across, expenses up, joined in time order." },
  { id: "bubble", label: "Bubble chart", group: "Relationship", description: "Categories by number of payments (across) and average payment (up); bubble size is total." },
  { id: "radar", label: "Radar chart", group: "Relationship", description: "Category spending in this range versus the previous range of the same length." },
  { id: "gauge", label: "Circular gauge", group: "Indicator", description: "Savings rate: how much of your income you kept." },
  { id: "table", label: "Table chart", group: "Indicator", description: "Exact figures for each period." },
  {
    id: "parallel",
    label: "Parallel coordinates",
    group: "Unavailable",
    description:
      "Parallel coordinates compare records across many numeric measures. Each transaction has only one measure (its amount), so this chart would be misleading for your data.",
  },
];

export const UNAVAILABLE: ReadonlySet<ChartId> = new Set(["parallel"]);

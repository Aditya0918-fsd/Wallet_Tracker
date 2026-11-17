import type { ChartId } from "../-lib/charts.ts";
import type { ChartProps } from "../-lib/model.ts";
import {
  BubbleChart,
  BumpChart,
  CandlestickChart,
  CategoryBarChart,
  ColumnChart,
  ConnectedScatterChart,
  GroupedChart,
  PyramidChart,
  SplineChart,
  StreamChart,
  WaterfallChart,
} from "./cartesian-charts.tsx";
import {
  BulletChart,
  GaugeChart,
  MarimekkoChart,
  NightingaleChart,
  Notice,
  PieChartView,
  RadarView,
  RadialBarView,
  SunburstChart,
  TableChart,
} from "./polar-charts.tsx";

const NEEDS_EXPENSES: ReadonlySet<ChartId> = new Set([
  "bar",
  "lollipop",
  "pie",
  "semiDonut",
  "nightingale",
  "radialBar",
  "stream",
  "bump",
  "bubble",
  "radar",
  "marimekko",
]);

export default function ChartRenderer({ id, ...props }: ChartProps & { id: ChartId }) {
  const { totals } = props.model;
  if (id === "parallel") {
    return (
      <Notice>
        Parallel coordinates compare records across several numeric measures. A transaction only has one (its amount), so this chart
        can't show your data honestly. Try the Bubble chart or Radar chart to compare categories instead.
      </Notice>
    );
  }
  if (totals.income === 0 && totals.expense === 0 && id !== "bullet" && id !== "candlestick") {
    return <Notice>No transactions in the selected range. Pick a wider range or add a transaction.</Notice>;
  }
  if (NEEDS_EXPENSES.has(id) && totals.expense === 0) {
    return <Notice>This chart breaks down spending, and there are no expenses in the selected range.</Notice>;
  }
  switch (id) {
    case "grouped":
      return <GroupedChart {...props} />;
    case "column":
      return <ColumnChart {...props} />;
    case "bar":
      return <CategoryBarChart {...props} />;
    case "lollipop":
      return <CategoryBarChart {...props} lollipop />;
    case "bullet":
      return <BulletChart {...props} />;
    case "pyramid":
      return <PyramidChart {...props} />;
    case "pie":
      return <PieChartView {...props} />;
    case "semiDonut":
      return <PieChartView {...props} semi />;
    case "sunburst":
      return <SunburstChart {...props} />;
    case "marimekko":
      return <MarimekkoChart {...props} />;
    case "nightingale":
      return <NightingaleChart {...props} />;
    case "radialBar":
      return <RadialBarView {...props} />;
    case "waterfall":
      return <WaterfallChart {...props} />;
    case "spline":
      return <SplineChart {...props} />;
    case "stream":
      return <StreamChart {...props} />;
    case "bump":
      return <BumpChart {...props} />;
    case "candlestick":
      return <CandlestickChart {...props} />;
    case "connectedScatter":
      return <ConnectedScatterChart {...props} />;
    case "bubble":
      return <BubbleChart {...props} />;
    case "radar":
      return <RadarView {...props} />;
    case "gauge":
      return <GaugeChart {...props} />;
    case "table":
      return <TableChart {...props} />;
  }
}

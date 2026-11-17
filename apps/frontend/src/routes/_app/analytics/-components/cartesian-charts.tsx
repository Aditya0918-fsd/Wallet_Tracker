import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  type BarShapeProps,
} from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart.tsx";
import { colorAt, EXPENSE_COLOR, INCOME_COLOR } from "@/lib/wallet/colors.ts";
import { formatMoney } from "@/lib/wallet/money.ts";
import type { ChartProps } from "../-lib/model.ts";

const BASE_CONFIG = {
  income: { label: "Income", color: INCOME_COLOR },
  expense: { label: "Expenses", color: EXPENSE_COLOR },
} satisfies ChartConfig;

const H = "h-[340px] w-full";
const major = (v: number) => v / 100;

type TipItem = { name?: string | number; value?: unknown; color?: string; payload?: unknown };

export function Tip({
  active,
  payload,
  label,
  fmt,
}: {
  active?: boolean;
  payload?: ReadonlyArray<TipItem>;
  label?: string | number;
  fmt: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-40 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      {label !== undefined && label !== "" ? <p className="pb-1 font-medium">{label}</p> : null}
      {payload.map((p, i) => {
        const raw = Array.isArray(p.value) ? Number(p.value[1]) - Number(p.value[0]) : Number(p.value);
        return (
          <div key={`${String(p.name)}-${i}`} className="flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: p.color }} />
            <span className="flex-1 text-muted-foreground">{p.name}</span>
            <span className="font-mono">{fmt(raw)}</span>
          </div>
        );
      })}
    </div>
  );
}

function useFmt(props: ChartProps) {
  const full = (v: number) => formatMoney(Math.round(v * 100), props.money);
  const compact = (v: number) => formatMoney(Math.round(v * 100), props.money, { compact: true });
  return { full, compact };
}

function Axes({ compact, horizontal }: { compact: (v: number) => string; horizontal?: boolean }) {
  return horizontal ? (
    <>
      <CartesianGrid horizontal={false} strokeDasharray="3 3" />
      <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={compact} />
      <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={110} />
    </>
  ) : (
    <>
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={12} />
      <YAxis tickLine={false} axisLine={false} width={64} tickFormatter={compact} />
    </>
  );
}

export function GroupedChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.buckets.map((b) => ({ label: b.label, income: major(b.income), expense: major(b.expense) }));
  return (
    <ChartContainer config={BASE_CONFIG} className={H}>
      <BarChart data={data} barGap={3}>
        <Axes compact={compact} />
        <ChartTooltip cursor={{ fillOpacity: 0.4 }} content={(p) => <Tip {...p} fmt={full} />} />
        <Bar dataKey="income" name="Income" fill="var(--color-income)" radius={[5, 5, 0, 0]} maxBarSize={26} />
        <Bar dataKey="expense" name="Expenses" fill="var(--color-expense)" radius={[5, 5, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ChartContainer>
  );
}

export function ColumnChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.buckets.map((b) => ({ label: b.label, net: major(b.net) }));
  return (
    <ChartContainer config={{ net: { label: "Net" } }} className={H}>
      <BarChart data={data}>
        <Axes compact={compact} />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip cursor={{ fillOpacity: 0.4 }} content={(p) => <Tip {...p} fmt={full} />} />
        <Bar dataKey="net" name="Net cash flow" radius={4} maxBarSize={32}>
          {data.map((d) => (
            <Cell key={d.label} fill={d.net >= 0 ? INCOME_COLOR : EXPENSE_COLOR} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function CategoryBarChart(props: ChartProps & { lollipop?: boolean }) {
  const { full, compact } = useFmt(props);
  const data = props.model.expenseSlices.map((s, i) => ({ name: s.name, amount: major(s.amount), fill: colorAt(i) }));
  const lollipop = (s: BarShapeProps) => {
    const x = Number(s.x ?? 0);
    const y = Number(s.y ?? 0);
    const w = Number(s.width ?? 0);
    const h = Number(s.height ?? 0);
    const fill = typeof s.fill === "string" ? s.fill : INCOME_COLOR;
    return (
      <g>
        <line x1={x} x2={x + w} y1={y + h / 2} y2={y + h / 2} stroke={fill} strokeWidth={2} />
        <circle cx={x + w} cy={y + h / 2} r={7} fill={fill} />
      </g>
    );
  };
  return (
    <ChartContainer config={{ amount: { label: "Spent" } }} className="w-full" style={{ height: Math.max(240, data.length * 40 + 40) }}>
      <BarChart data={data} layout="vertical" margin={{ right: 24 }}>
        <Axes compact={compact} horizontal />
        <ChartTooltip cursor={{ fillOpacity: 0.3 }} content={(p) => <Tip {...p} fmt={full} />} />
        <Bar dataKey="amount" name="Spent" radius={6} barSize={props.lollipop ? 18 : 22} shape={props.lollipop ? lollipop : undefined}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function PyramidChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.buckets.map((b) => ({ label: b.label, income: -major(b.income), expense: major(b.expense) }));
  const abs = (v: number) => compact(Math.abs(v));
  return (
    <ChartContainer config={BASE_CONFIG} className="w-full" style={{ height: Math.max(300, data.length * 22 + 40) }}>
      <BarChart data={data} layout="vertical" stackOffset="sign" barCategoryGap={2}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={abs} />
        <YAxis type="category" dataKey="label" tickLine={false} axisLine={false} width={64} />
        <ReferenceLine x={0} stroke="var(--border)" />
        <ChartTooltip cursor={{ fillOpacity: 0.3 }} content={(p) => <Tip {...p} fmt={(v) => full(Math.abs(v))} />} />
        <Bar dataKey="income" name="Income" stackId="p" fill="var(--color-income)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="expense" name="Expenses" stackId="p" fill="var(--color-expense)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

export function WaterfallChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const { totals: t, expenseSlices } = props.model;
  const rows: Array<{ label: string; range: [number, number]; fill: string }> = [
    { label: "Income", range: [0, major(t.income)], fill: INCOME_COLOR },
  ];
  let running = t.income;
  for (const s of expenseSlices.slice(0, 8)) {
    rows.push({ label: s.name, range: [major(running - s.amount), major(running)], fill: EXPENSE_COLOR });
    running -= s.amount;
  }
  const others = expenseSlices.slice(8).reduce((sum, s) => sum + s.amount, 0);
  if (others > 0) {
    rows.push({ label: "Others", range: [major(running - others), major(running)], fill: EXPENSE_COLOR });
    running -= others;
  }
  rows.push({ label: "Net savings", range: [Math.min(0, major(running)), Math.max(0, major(running))], fill: running >= 0 ? "var(--chart-3)" : EXPENSE_COLOR });
  return (
    <ChartContainer config={{ range: { label: "Amount" } }} className={H}>
      <BarChart data={rows}>
        <Axes compact={compact} />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip cursor={{ fillOpacity: 0.3 }} content={(p) => <Tip {...p} fmt={full} />} />
        <Bar dataKey="range" name="Amount" radius={4} maxBarSize={48}>
          {rows.map((r) => (
            <Cell key={r.label} fill={r.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function SplineChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.buckets.map((b) => ({ label: b.label, income: major(b.income), expense: major(b.expense) }));
  return (
    <ChartContainer config={BASE_CONFIG} className={H}>
      <LineChart data={data}>
        <Axes compact={compact} />
        <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
        <Line dataKey="income" name="Income" type="natural" stroke="var(--color-income)" strokeWidth={2.5} dot={false} />
        <Line dataKey="expense" name="Expenses" type="natural" stroke="var(--color-expense)" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

function topCategories(props: ChartProps, n: number) {
  return props.model.expenseSlices.slice(0, n);
}

export function StreamChart(props: ChartProps) {
  const { full } = useFmt(props);
  const cats = topCategories(props, 6);
  const data = props.model.buckets.map((b) => {
    const row: Record<string, number | string> = { label: b.label };
    for (const c of cats) row[c.categoryId] = major(b.byCategory[c.categoryId] ?? 0);
    return row;
  });
  return (
    <ChartContainer config={{}} className={H}>
      <AreaChart data={data} stackOffset="silhouette">
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={12} />
        <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
        {cats.map((c, i) => (
          <Area key={c.categoryId} dataKey={c.categoryId} name={c.name} stackId="s" type="monotone" stroke="none" fill={colorAt(i)} fillOpacity={0.85} />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

export function BumpChart(props: ChartProps) {
  const cats = topCategories(props, 6);
  const data = props.model.buckets
    .filter((b) => b.expense > 0)
    .map((b) => {
      const ranked = [...cats].sort((a, c) => (b.byCategory[c.categoryId] ?? 0) - (b.byCategory[a.categoryId] ?? 0));
      const row: Record<string, number | string> = { label: b.label };
      ranked.forEach((c, i) => {
        row[c.categoryId] = i + 1;
      });
      return row;
    });
  return (
    <ChartContainer config={{}} className={H}>
      <LineChart data={data} margin={{ right: 16 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={12} />
        <YAxis reversed domain={[1, Math.max(1, cats.length)]} allowDecimals={false} tickLine={false} axisLine={false} width={32} tickFormatter={(v: number) => `#${v}`} />
        <ChartTooltip content={(p) => <Tip {...p} fmt={(v) => `#${v}`} />} />
        {cats.map((c, i) => (
          <Line key={c.categoryId} dataKey={c.categoryId} name={c.name} type="monotone" stroke={colorAt(i)} strokeWidth={3} dot={{ r: 4, fill: colorAt(i) }} />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

export function ConnectedScatterChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.buckets.map((b) => ({ label: b.label, income: major(b.income), expense: major(b.expense) }));
  return (
    <ChartContainer config={BASE_CONFIG} className={H}>
      <ScatterChart margin={{ right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="income" name="Income" tickLine={false} axisLine={false} tickFormatter={compact} />
        <YAxis type="number" dataKey="expense" name="Expenses" tickLine={false} axisLine={false} width={64} tickFormatter={compact} />
        <ChartTooltip
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload as { label: string; income: number; expense: number } | undefined;
            if (!active || !row) return null;
            return (
              <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
                <p className="font-medium">{row.label}</p>
                <p>Income {full(row.income)}</p>
                <p>Expenses {full(row.expense)}</p>
              </div>
            );
          }}
        />
        <Scatter data={data} fill="var(--chart-3)" line={{ stroke: "var(--chart-3)", strokeWidth: 1.5 }} lineType="joint" />
      </ScatterChart>
    </ChartContainer>
  );
}

export function BubbleChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data = props.model.categoryStats.map((c, i) => ({
    name: c.name,
    count: c.count,
    average: major(c.average),
    total: major(c.total),
    fill: colorAt(i),
  }));
  return (
    <ChartContainer config={{}} className={H}>
      <ScatterChart margin={{ right: 24, top: 16 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" dataKey="count" name="Payments" allowDecimals={false} tickLine={false} axisLine={false} />
        <YAxis type="number" dataKey="average" name="Average" tickLine={false} axisLine={false} width={64} tickFormatter={compact} />
        <ZAxis type="number" dataKey="total" range={[120, 2400]} />
        <ChartTooltip
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload as (typeof data)[number] | undefined;
            if (!active || !row) return null;
            return (
              <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
                <p className="font-medium">{row.name}</p>
                <p>{row.count} payments · avg {full(row.average)}</p>
                <p>Total {full(row.total)}</p>
              </div>
            );
          }}
        />
        <Scatter data={data} fillOpacity={0.75}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.fill} />
          ))}
        </Scatter>
      </ScatterChart>
    </ChartContainer>
  );
}

type CandleRow = { label: string; open: number; close: number; high: number; low: number; span: [number, number] };

export function CandlestickChart(props: ChartProps) {
  const { full, compact } = useFmt(props);
  const data: CandleRow[] = props.model.buckets.map((b) => ({
    label: b.label,
    open: major(b.open),
    close: major(b.close),
    high: major(b.high),
    low: major(b.low),
    span: [major(b.low), major(b.high)],
  }));
  const candle = (s: BarShapeProps) => {
    const row = s.payload as CandleRow | undefined;
    if (!row) return <g />;
    const x = Number(s.x ?? 0);
    const y = Number(s.y ?? 0);
    const w = Number(s.width ?? 0);
    const h = Number(s.height ?? 0);
    const spread = row.high - row.low;
    const toY = (v: number) => (spread === 0 ? y + h / 2 : y + ((row.high - v) / spread) * h);
    const up = row.close >= row.open;
    const color = up ? INCOME_COLOR : EXPENSE_COLOR;
    const top = toY(Math.max(row.open, row.close));
    const bottom = toY(Math.min(row.open, row.close));
    const cx = x + w / 2;
    return (
      <g>
        <line x1={cx} x2={cx} y1={y} y2={y + Math.max(h, 1)} stroke={color} strokeWidth={1.5} />
        <rect x={x + w * 0.15} width={w * 0.7} y={top} height={Math.max(2, bottom - top)} fill={color} rx={2} />
      </g>
    );
  };
  return (
    <ChartContainer config={{}} className={H}>
      <BarChart data={data}>
        <Axes compact={compact} />
        <ChartTooltip
          cursor={{ fillOpacity: 0.3 }}
          content={({ active, payload }) => {
            const row = payload?.[0]?.payload as CandleRow | undefined;
            if (!active || !row) return null;
            return (
              <div className="grid grid-cols-2 gap-x-3 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
                <p className="col-span-2 pb-1 font-medium">{row.label}</p>
                <span className="text-muted-foreground">Open</span>
                <span className="text-right font-mono">{full(row.open)}</span>
                <span className="text-muted-foreground">Close</span>
                <span className="text-right font-mono">{full(row.close)}</span>
                <span className="text-muted-foreground">High</span>
                <span className="text-right font-mono">{full(row.high)}</span>
                <span className="text-muted-foreground">Low</span>
                <span className="text-right font-mono">{full(row.low)}</span>
              </div>
            );
          }}
        />
        <Bar dataKey="span" name="Balance" shape={candle} maxBarSize={22} />
      </BarChart>
    </ChartContainer>
  );
}

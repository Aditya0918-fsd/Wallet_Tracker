import { differenceInCalendarDays } from "date-fns";
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { savingsRate } from "@/lib/wallet/calc.ts";
import { colorAt, EXPENSE_COLOR, INCOME_COLOR } from "@/lib/wallet/colors.ts";
import { fromDay } from "@/lib/wallet/dates.ts";
import { formatMoney } from "@/lib/wallet/money.ts";
import { cn } from "@/lib/utils.ts";
import type { ChartProps } from "../-lib/model.ts";
import { Tip } from "./cartesian-charts.tsx";

const H = "h-[340px] w-full";
const major = (v: number) => v / 100;

function fmts(props: ChartProps) {
  return {
    full: (v: number) => formatMoney(Math.round(v * 100), props.money),
    minor: (v: number) => formatMoney(v, props.money),
  };
}

function Legend({ items }: { items: Array<{ name: string; color: string }> }) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 pt-2 text-xs">
      {items.map((i) => (
        <li key={i.name} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: i.color }} />
          {i.name}
        </li>
      ))}
    </ul>
  );
}

function slicesData(props: ChartProps, n = 8) {
  const s = props.model.expenseSlices;
  const top = s.slice(0, n);
  const rest = s.slice(n).reduce((sum, c) => sum + c.amount, 0);
  const rows = top.map((c, i) => ({ name: c.name, value: major(c.amount), fill: colorAt(i) }));
  if (rest > 0) rows.push({ name: "Others", value: major(rest), fill: colorAt(n) });
  return rows;
}

export function PieChartView(props: ChartProps & { semi?: boolean }) {
  const { full } = fmts(props);
  const data = slicesData(props);
  return (
    <div>
      <ChartContainer config={{}} className={props.semi ? "h-[260px] w-full" : H}>
        <PieChart>
          <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cy={props.semi ? "85%" : "50%"}
            startAngle={props.semi ? 180 : 90}
            endAngle={props.semi ? 0 : -270}
            innerRadius={props.semi ? "95%" : 0}
            outerRadius={props.semi ? "150%" : "80%"}
            paddingAngle={props.semi ? 1.5 : 0.5}
            strokeWidth={0}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <Legend items={data.map((d) => ({ name: d.name, color: d.fill }))} />
    </div>
  );
}

export function SunburstChart(props: ChartProps) {
  const { full } = fmts(props);
  const { totals: t, incomeSlices, expenseSlices } = props.model;
  const inner = [
    { name: "Income", value: major(t.income), fill: INCOME_COLOR },
    { name: "Expenses", value: major(t.expense), fill: EXPENSE_COLOR },
  ];
  const outer = [
    ...incomeSlices.map((s, i) => ({ name: s.name, value: major(s.amount), fill: `color-mix(in oklch, ${INCOME_COLOR} ${90 - i * 12}%, var(--background))` })),
    ...expenseSlices.map((s, i) => ({ name: s.name, value: major(s.amount), fill: `color-mix(in oklch, ${EXPENSE_COLOR} ${90 - Math.min(i, 6) * 11}%, var(--background))` })),
  ];
  return (
    <div>
      <ChartContainer config={{}} className={H}>
        <PieChart>
          <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
          <Pie data={inner} dataKey="value" nameKey="name" outerRadius="45%" strokeWidth={2} stroke="var(--card)">
            {inner.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Pie>
          <Pie data={outer} dataKey="value" nameKey="name" innerRadius="48%" outerRadius="80%" strokeWidth={2} stroke="var(--card)">
            {outer.map((d, i) => (
              <Cell key={`${d.name}-${i}`} fill={d.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <Legend items={inner.map((d) => ({ name: d.name, color: d.fill }))} />
    </div>
  );
}

export function NightingaleChart(props: ChartProps) {
  const { full } = fmts(props);
  const data = slicesData(props, 9);
  const max = Math.max(...data.map((d) => d.value), 1);
  // Equal angles, radius scaled by sqrt so area is proportional to value.
  return (
    <div>
      <ChartContainer config={{}} className={H}>
        <PieChart>
          <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
          {data.map((d, i) => {
            const step = 360 / data.length;
            const r = 20 + 80 * Math.sqrt(d.value / max);
            return (
              <Pie
                key={d.name}
                data={[d]}
                dataKey="value"
                nameKey="name"
                startAngle={90 - i * step}
                endAngle={90 - (i + 1) * step + 1.5}
                innerRadius="8%"
                outerRadius={`${r * 0.8}%`}
                strokeWidth={0}
                isAnimationActive={false}
              >
                <Cell fill={d.fill} />
              </Pie>
            );
          })}
        </PieChart>
      </ChartContainer>
      <Legend items={data.map((d) => ({ name: d.name, color: d.fill }))} />
    </div>
  );
}

export function RadialBarView(props: ChartProps) {
  const { full } = fmts(props);
  const data = slicesData(props, 6)
    .filter((d) => d.name !== "Others")
    .reverse();
  return (
    <div>
      <ChartContainer config={{}} className={H}>
        <RadialBarChart data={data} innerRadius="18%" outerRadius="92%" startAngle={90} endAngle={-270} barSize={16}>
          <PolarAngleAxis type="number" domain={[0, Math.max(...data.map((d) => d.value), 1)]} tick={false} />
          <ChartTooltip content={(p) => <Tip {...p} fmt={full} />} />
          <RadialBar dataKey="value" background cornerRadius={8}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </RadialBar>
        </RadialBarChart>
      </ChartContainer>
      <Legend items={[...data].reverse().map((d) => ({ name: d.name, color: d.fill }))} />
    </div>
  );
}

export function RadarView(props: ChartProps) {
  const { full } = fmts(props);
  const prev = new Map(props.model.prevExpenseSlices.map((s) => [s.categoryId, s.amount]));
  const data = props.model.expenseSlices.slice(0, 8).map((s) => ({
    name: s.name,
    current: major(s.amount),
    previous: major(prev.get(s.categoryId) ?? 0),
  }));
  if (data.length < 3) {
    return <Notice>Radar charts need spending in at least 3 categories in the selected range.</Notice>;
  }
  return (
    <div>
      <ChartContainer config={{}} className={H}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <ChartTooltip content={(p) => <Tip {...p} label={p.label} fmt={full} />} />
          <Radar dataKey="previous" name="Previous range" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.15} />
          <Radar dataKey="current" name="Selected range" stroke={EXPENSE_COLOR} fill={EXPENSE_COLOR} fillOpacity={0.35} />
        </RadarChart>
      </ChartContainer>
      <Legend items={[{ name: "Selected range", color: EXPENSE_COLOR }, { name: "Previous range", color: "var(--chart-3)" }]} />
    </div>
  );
}

export function GaugeChart(props: ChartProps) {
  const rate = savingsRate(props.model.totals);
  if (rate === null) return <Notice>No income in this range, so a savings rate can't be calculated.</Notice>;
  const clamped = Math.max(0, Math.min(100, rate));
  const color = rate < 0 ? EXPENSE_COLOR : rate < 10 ? "var(--chart-4)" : INCOME_COLOR;
  const data = [{ name: "Saved", value: clamped, fill: color }];
  return (
    <div className="relative">
      <ChartContainer config={{}} className="mx-auto aspect-square h-[300px]">
        <RadialBarChart data={data} innerRadius="70%" outerRadius="100%" startAngle={225} endAngle={-45} barSize={22}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" background cornerRadius={12} />
        </RadialBarChart>
      </ChartContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <p className={cn("font-display text-5xl font-semibold", rate < 0 && "text-destructive")}>{rate.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground">savings rate</p>
        </div>
      </div>
    </div>
  );
}

export function MarimekkoChart(props: ChartProps) {
  const { minor } = fmts(props);
  const buckets = props.model.buckets.filter((b) => b.expense > 0);
  const cats = props.model.expenseSlices.slice(0, 6);
  const total = buckets.reduce((s, b) => s + b.expense, 0);
  if (total === 0) return <Notice>No spending in this range.</Notice>;
  return (
    <div className="space-y-3">
      <div className="flex h-[300px] w-full gap-0.5 overflow-hidden rounded-lg">
        {buckets.map((b) => {
          const other = b.expense - cats.reduce((s, c) => s + (b.byCategory[c.categoryId] ?? 0), 0);
          return (
            <div key={b.key} className="flex min-w-1 flex-col-reverse gap-px" style={{ width: `${(b.expense / total) * 100}%` }} title={`${b.label}: ${minor(b.expense)}`}>
              {cats.map((c, i) => {
                const v = b.byCategory[c.categoryId] ?? 0;
                return v > 0 ? (
                  <div key={c.categoryId} style={{ height: `${(v / b.expense) * 100}%`, background: colorAt(i) }} title={`${b.label} · ${c.name}: ${minor(v)}`} />
                ) : null;
              })}
              {other > 0 ? <div style={{ height: `${(other / b.expense) * 100}%` }} className="bg-muted-foreground/30" title={`${b.label} · Others: ${minor(other)}`} /> : null}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>{buckets[0]?.label}</span>
        <span>{buckets[buckets.length - 1]?.label}</span>
      </div>
      <Legend items={[...cats.map((c, i) => ({ name: c.name, color: colorAt(i) })), { name: "Others", color: "color-mix(in oklch, var(--muted-foreground) 30%, transparent)" }]} />
    </div>
  );
}

export function BulletChart(props: ChartProps) {
  const { minor } = fmts(props);
  const { range } = props.model;
  if (props.budgets.length === 0) return <Notice>Create budgets to compare spending against your limits.</Notice>;
  const days = differenceInCalendarDays(fromDay(range.to), fromDay(range.from)) + 1;
  // Monthly limits pro-rated to the selected range so comparisons stay fair.
  const factor = days / 30.4375;
  const spent = new Map(props.model.expenseSlices.map((s) => [s.categoryId, s.amount]));
  const names = new Map(props.categories.map((c) => [c.id, c.name]));
  return (
    <ul className="space-y-5 py-2">
      {props.budgets.map((b) => {
        const target = Math.round(b.limit * factor);
        const actual = spent.get(b.categoryId) ?? 0;
        const max = Math.max(target * 1.25, actual, 1);
        const pct = (v: number) => `${Math.min(100, (v / max) * 100)}%`;
        return (
          <li key={b.id} className="grid gap-1.5 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-4">
            <span className="truncate text-sm font-medium">{names.get(b.categoryId) ?? "Uncategorised"}</span>
            <div className="relative h-7 overflow-hidden rounded-md bg-muted">
              <div className="absolute inset-y-0 left-0 bg-muted-foreground/10" style={{ width: pct(target * 0.8) }} />
              <div className="absolute inset-y-0 left-0 bg-muted-foreground/10" style={{ width: pct(target) }} />
              <div
                className={cn("absolute inset-y-2 left-0 rounded-sm", actual > target ? "bg-destructive" : "bg-primary")}
                style={{ width: pct(actual) }}
              />
              <div className="absolute inset-y-1 w-0.5 bg-foreground" style={{ left: pct(target) }} />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {minor(actual)} / {minor(target)}
            </span>
          </li>
        );
      })}
      <li className="text-xs text-muted-foreground">Black marker = budget for this range. Shaded bands = 80% and 100% of budget.</li>
    </ul>
  );
}

export function TableChart(props: ChartProps) {
  const { minor } = fmts(props);
  const rows = props.model.buckets.filter((b) => b.income || b.expense);
  if (rows.length === 0) return <Notice>No transactions in this range.</Notice>;
  return (
    <div className="max-h-[400px] overflow-auto rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 bg-muted">
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Income</TableHead>
            <TableHead className="text-right">Expenses</TableHead>
            <TableHead className="text-right">Net</TableHead>
            <TableHead className="text-right">Closing balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((b) => (
            <TableRow key={b.key}>
              <TableCell className="font-medium">{b.label}</TableCell>
              <TableCell className="text-right font-mono text-primary">{minor(b.income)}</TableCell>
              <TableCell className="text-right font-mono text-destructive">{minor(b.expense)}</TableCell>
              <TableCell className={cn("text-right font-mono", b.net < 0 && "text-destructive")}>{minor(b.net)}</TableCell>
              <TableCell className="text-right font-mono">{minor(b.close)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[300px] place-items-center rounded-xl border border-dashed px-6 text-center text-sm text-muted-foreground">
      <p className="max-w-md">{children}</p>
    </div>
  );
}

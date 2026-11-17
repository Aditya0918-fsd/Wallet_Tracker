import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import type { MonthPoint } from "@/lib/wallet/calc.ts";
import { BALANCE_COLOR, EXPENSE_COLOR, INCOME_COLOR } from "@/lib/wallet/colors.ts";
import { formatMoney, type MoneyFormat } from "@/lib/wallet/money.ts";

const config = {
  income: { label: "Income", color: INCOME_COLOR },
  expense: { label: "Expenses", color: EXPENSE_COLOR },
  balance: { label: "Balance", color: BALANCE_COLOR },
} satisfies ChartConfig;

type Row = { label: string; [k: string]: number | string };

export function MoneyTooltip({
  active,
  payload,
  label,
  money,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ name?: string | number; value?: unknown; color?: string }>;
  label?: string | number;
  money: MoneyFormat;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-36 rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="pb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={String(p.name)} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="flex-1 text-muted-foreground">{config[p.name as keyof typeof config]?.label ?? p.name}</span>
          <span className="font-mono">{formatMoney(Number(p.value) * 100, money)}</span>
        </div>
      ))}
    </div>
  );
}

function toMajor(points: MonthPoint[]): Row[] {
  return points.map((p) => ({ label: p.label, income: p.income / 100, expense: p.expense / 100, balance: p.balance / 100 }));
}

export function CashflowBars({ points, className }: { points: MonthPoint[]; className?: string }) {
  const { money } = useWallet();
  const compact = (v: number) => formatMoney(v * 100, money, { compact: true });
  return (
    <ChartContainer config={config} className={className ?? "h-72 w-full"}>
      <BarChart data={toMajor(points)} barGap={4}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={64} tickFormatter={compact} />
        <ChartTooltip cursor={{ fillOpacity: 0.4 }} content={(p) => <MoneyTooltip {...p} money={money} />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={[6, 6, 0, 0]} maxBarSize={28} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={[6, 6, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ChartContainer>
  );
}

export function BalanceArea({ points, className }: { points: MonthPoint[]; className?: string }) {
  const { money } = useWallet();
  const compact = (v: number) => formatMoney(v * 100, money, { compact: true });
  return (
    <ChartContainer config={config} className={className ?? "h-56 w-full"}>
      <AreaChart data={toMajor(points)}>
        <defs>
          <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-balance)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-balance)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={64} tickFormatter={compact} />
        <ChartTooltip content={(p) => <MoneyTooltip {...p} money={money} />} />
        <Area dataKey="balance" type="monotone" stroke="var(--color-balance)" strokeWidth={2.5} fill="url(#balanceFill)" />
      </AreaChart>
    </ChartContainer>
  );
}

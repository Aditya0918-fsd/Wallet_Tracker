import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import type { CategorySlice } from "@/lib/wallet/calc.ts";
import { colorAt } from "@/lib/wallet/colors.ts";
import { formatMoney } from "@/lib/wallet/money.ts";
import Amount from "./amount.tsx";

type Props = { slices: CategorySlice[]; total: number; label: string };

/** Donut with a legend list; renders nothing chart-wise when empty. */
export default function CategoryDonut({ slices, total, label }: Props) {
  const { money } = useWallet();
  if (slices.length === 0 || total === 0) {
    return (
      <div className="grid h-56 place-items-center rounded-xl border border-dashed text-sm text-muted-foreground">
        No {label.toLowerCase()} recorded for this period
      </div>
    );
  }
  const top = slices.slice(0, 6);
  const rest = slices.slice(6).reduce((s, c) => s + c.amount, 0);
  const data = rest > 0 ? [...top, { categoryId: "rest", name: "Others", amount: rest }] : top;
  const config: ChartConfig = Object.fromEntries(data.map((d, i) => [d.categoryId, { label: d.name, color: colorAt(i) }]));

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div className="relative">
        <ChartContainer config={config} className="aspect-square h-48 w-48">
          <PieChart>
            <ChartTooltip
              content={({ payload }) => {
                const p = payload?.[0]?.payload as CategorySlice | undefined;
                if (!p) return null;
                return (
                  <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
                    <p className="font-medium">{p.name}</p>
                    <p className="font-mono">{formatMoney(p.amount, money)}</p>
                  </div>
                );
              }}
            />
            <Pie data={data} dataKey="amount" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2} strokeWidth={0}>
              {data.map((d, i) => (
                <Cell key={d.categoryId} fill={colorAt(i)} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <Amount value={total} compact className="font-display text-base font-semibold" />
          </div>
        </div>
      </div>
      <ul className="w-full min-w-0 flex-1 space-y-2">
        {data.map((d, i) => (
          <li key={d.categoryId} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: colorAt(i) }} />
            <span className="min-w-0 flex-1 truncate">{d.name}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{((d.amount / total) * 100).toFixed(0)}%</span>
            <Amount value={d.amount} compact className="w-20 text-right text-xs font-medium" />
          </li>
        ))}
      </ul>
    </div>
  );
}

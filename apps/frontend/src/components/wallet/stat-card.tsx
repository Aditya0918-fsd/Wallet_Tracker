import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

type Props = {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  hint?: ReactNode;
  /** Percent change; positive is good unless `invert`. */
  delta?: number | null;
  invert?: boolean;
  tone?: "primary" | "destructive" | "accent" | "muted";
  className?: string;
};

const TONES = {
  primary: "bg-primary/10 text-primary",
  destructive: "bg-destructive/10 text-destructive",
  accent: "bg-accent text-accent-foreground",
  muted: "bg-muted text-muted-foreground",
} as const;

export default function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  delta,
  invert,
  tone = "primary",
  className,
}: Props) {
  const good = delta !== undefined && delta !== null && (invert ? delta <= 0 : delta >= 0);
  return (
    <Card className={cn("gap-3 px-5 py-5 shadow-sm", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn("grid size-9 place-items-center rounded-xl", TONES[tone])}>
          <Icon className="size-4" />
        </span>
      </div>
      <div className="min-w-0 truncate font-display text-2xl font-semibold">{value}</div>
      <div className="flex min-h-5 items-center gap-2 text-xs text-muted-foreground">
        {delta !== undefined && delta !== null ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
              good ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive",
            )}
          >
            {delta >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        ) : null}
        {hint ? <span className="truncate">{hint}</span> : null}
      </div>
    </Card>
  );
}

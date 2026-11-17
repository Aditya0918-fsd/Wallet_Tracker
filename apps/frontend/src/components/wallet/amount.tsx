import { useWallet } from "@/hooks/use-wallet.ts";
import { formatMoney } from "@/lib/wallet/money.ts";
import { cn } from "@/lib/utils.ts";
import type { CurrencyCode, TxType } from "@/lib/wallet/types.ts";

type Props = {
  value: number;
  type?: TxType | "net";
  currency?: CurrencyCode;
  compact?: boolean;
  signed?: boolean;
  className?: string;
};

/** Renders a paise amount in the user's currency, tinted by direction. */
export default function Amount({ value, type, currency, compact, signed, className }: Props) {
  const { money } = useWallet();
  const tone =
    type === "income"
      ? "text-primary"
      : type === "expense"
        ? "text-destructive"
        : type === "net"
          ? value >= 0
            ? "text-primary"
            : "text-destructive"
          : "";
  const prefix = type === "income" && signed ? "+" : type === "expense" && signed ? "−" : "";
  return (
    <span className={cn("font-mono tabular-nums tracking-tight", tone, className)}>
      {prefix}
      {formatMoney(Math.abs(value) * (type === "net" && value < 0 ? -1 : 1), currency ? { ...money, currency } : money, {
        compact,
        signed: type === "net" && signed,
      })}
    </span>
  );
}


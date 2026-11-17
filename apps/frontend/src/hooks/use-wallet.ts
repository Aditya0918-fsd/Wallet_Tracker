import { createContext, useContext } from "react";
import type { MoneyFormat } from "@/lib/wallet/money.ts";
import type { WalletData } from "@/lib/wallet/types.ts";

export type WalletContextValue = {
  data: WalletData;
  update: (fn: (data: WalletData) => WalletData) => void;
  replace: (data: WalletData) => void;
  reset: () => void;
  money: MoneyFormat;
  email: string;
};

export const WalletContext = createContext<WalletContextValue | null>(null);

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}

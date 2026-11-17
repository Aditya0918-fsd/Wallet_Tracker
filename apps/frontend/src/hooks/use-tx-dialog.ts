import { createContext, useContext } from "react";
import type { Transaction, TxType } from "@/lib/wallet/types.ts";

export type TxDialogValue = {
  openNew: (type: TxType) => void;
  openEdit: (tx: Transaction) => void;
  openDetails: (tx: Transaction) => void;
  openTask: () => void;
};

export const TxDialogContext = createContext<TxDialogValue | null>(null);

export function useTxDialog(): TxDialogValue {
  const ctx = useContext(TxDialogContext);
  if (!ctx) throw new Error("useTxDialog must be used inside TxDialogProvider");
  return ctx;
}

import { useMemo, useState, type ReactNode } from "react";
import { TxDialogContext, type TxDialogValue } from "@/hooks/use-tx-dialog.ts";
import type { Transaction, TxType } from "@/lib/wallet/types.ts";
import TaskFormDialog from "./task-form-dialog.tsx";
import TransactionDetailsDialog from "./transaction-details-dialog.tsx";
import TransactionFormDialog from "./transaction-form-dialog.tsx";

/** App-wide dialogs so any page (and quick actions) can open them. */
export default function TxDialogProvider({ children }: { children: ReactNode }) {
  const [formOpen, setFormOpen] = useState(false);
  const [formType, setFormType] = useState<TxType>("expense");
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [details, setDetails] = useState<Transaction | null>(null);
  const [taskOpen, setTaskOpen] = useState(false);

  const value = useMemo<TxDialogValue>(
    () => ({
      openNew: (type) => {
        setEditing(null);
        setFormType(type);
        setFormOpen(true);
      },
      openEdit: (tx) => {
        setEditing(tx);
        setFormType(tx.type);
        setFormOpen(true);
      },
      openDetails: (tx) => setDetails(tx),
      openTask: () => setTaskOpen(true),
    }),
    [],
  );

  return (
    <TxDialogContext value={value}>
      {children}
      <TransactionFormDialog open={formOpen} onOpenChange={setFormOpen} type={formType} editing={editing} />
      <TransactionDetailsDialog
        tx={details}
        onOpenChange={(o) => {
          if (!o) setDetails(null);
        }}
        onEdit={value.openEdit}
      />
      <TaskFormDialog open={taskOpen} onOpenChange={setTaskOpen} editing={null} />
    </TxDialogContext>
  );
}

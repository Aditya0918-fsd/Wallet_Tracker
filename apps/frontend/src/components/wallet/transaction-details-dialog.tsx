import { format, parseISO } from "date-fns";
import { Pencil, Repeat, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { deleteTransaction } from "@/lib/wallet/actions.ts";
import { formatDay } from "@/lib/wallet/dates.ts";
import { PAYMENT_METHODS } from "@/lib/wallet/defaults.ts";
import type { Transaction } from "@/lib/wallet/types.ts";
import Amount from "./amount.tsx";
import ConfirmDialog from "./confirm-dialog.tsx";

type Props = {
  tx: Transaction | null;
  onOpenChange: (open: boolean) => void;
  onEdit: (tx: Transaction) => void;
};

export default function TransactionDetailsDialog({ tx, onOpenChange, onEdit }: Props) {
  const { data, update } = useWallet();
  const [confirm, setConfirm] = useState(false);
  // Read the latest version so edits made elsewhere show here.
  const live = tx ? (data.transactions.find((t) => t.id === tx.id) ?? null) : null;
  const category = live ? data.categories.find((c) => c.id === live.categoryId) : undefined;

  return (
    <>
      <Dialog open={live !== null} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          {live ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant={live.type === "income" ? "default" : "destructive"} className="capitalize">
                    {live.type}
                  </Badge>
                  {live.recurringId ? (
                    <Badge variant="secondary">
                      <Repeat /> Recurring
                    </Badge>
                  ) : null}
                </div>
                <DialogTitle className="pt-1 font-display text-xl">{live.title}</DialogTitle>
                <DialogDescription className="font-mono text-xs">{live.ref}</DialogDescription>
              </DialogHeader>
              <Amount value={live.amount} currency={live.currency} type={live.type} signed className="font-display text-4xl font-semibold" />
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-muted/60 p-4 text-sm">
                <Detail label="Category" value={category?.name ?? "Uncategorised"} />
                <Detail label="Date" value={formatDay(live.date, data.settings.dateFormat)} />
                <Detail label="Payment method" value={PAYMENT_METHODS[live.paymentMethod]} />
                <Detail label="Recorded" value={format(parseISO(live.createdAt), "d MMM yyyy, p")} />
                <div className="col-span-2">
                  <dt className="text-xs text-muted-foreground">Description</dt>
                  <dd className="whitespace-pre-wrap break-words pt-0.5">
                    {live.description || <span className="text-muted-foreground">No description</span>}
                  </dd>
                </div>
              </dl>
              <DialogFooter>
                <Button variant="destructive" onClick={() => setConfirm(true)}>
                  <Trash2 /> Delete
                </Button>
                <Button
                  onClick={() => {
                    onOpenChange(false);
                    onEdit(live);
                  }}
                >
                  <Pencil /> Edit
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={confirm}
        onOpenChange={setConfirm}
        title="Delete this transaction?"
        description="This permanently removes it and updates all totals, budgets, and charts."
        onConfirm={() => {
          if (!live) return;
          update((d) => deleteTransaction(d, live.id));
          onOpenChange(false);
          toast.success("Transaction deleted");
        }}
      />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="truncate pt-0.5 font-medium">{value}</dd>
    </div>
  );
}


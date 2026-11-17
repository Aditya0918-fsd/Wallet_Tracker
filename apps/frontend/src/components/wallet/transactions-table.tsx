import { Eye, MoreVertical, Pencil, Receipt, Repeat, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useTxDialog } from "@/hooks/use-tx-dialog.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { deleteTransaction } from "@/lib/wallet/actions.ts";
import { formatDay } from "@/lib/wallet/dates.ts";
import { PAYMENT_METHODS } from "@/lib/wallet/defaults.ts";
import type { Transaction } from "@/lib/wallet/types.ts";
import Amount from "./amount.tsx";
import ConfirmDialog from "./confirm-dialog.tsx";

const PAGE_SIZE = 15;

type Props = {
  transactions: Transaction[];
  emptyTitle?: string;
  emptyAction?: React.ReactNode;
  /** Full column set (Transactions page) vs compact (dashboard). */
  variant?: "full" | "compact";
};

export default function TransactionsTable({ transactions, emptyTitle, emptyAction, variant = "full" }: Props) {
  const { data, update } = useWallet();
  const { openDetails, openEdit } = useTxDialog();
  const [page, setPage] = useState(0);
  const [toDelete, setToDelete] = useState<Transaction | null>(null);
  const names = new Map(data.categories.map((c) => [c.id, c.name]));

  const pages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const rows = variant === "compact" ? transactions : transactions.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);

  if (transactions.length === 0) {
    return (
      <Empty className="border border-dashed py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Receipt />
          </EmptyMedia>
          <EmptyTitle>{emptyTitle ?? "No transactions found"}</EmptyTitle>
          <EmptyDescription>Try adjusting filters, or record a new transaction.</EmptyDescription>
        </EmptyHeader>
        {emptyAction ? <EmptyContent>{emptyAction}</EmptyContent> : null}
      </Empty>
    );
  }

  const actions = (t: Transaction) => (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="Transaction actions" onClick={(e) => e.stopPropagation()} />}
      >
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => openDetails(t)}>
          <Eye /> View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openEdit(t)}>
          <Pencil /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => setToDelete(t)}>
          <Trash2 /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-3">
      {/* Mobile: stacked cards */}
      <ul className="divide-y rounded-xl border md:hidden">
        {rows.map((t) => (
          <li key={t.id} className="flex items-center gap-3 px-3 py-3">
            <button type="button" className="flex min-w-0 flex-1 cursor-pointer flex-col text-left" onClick={() => openDetails(t)}>
              <span className="flex items-center gap-1.5 truncate font-medium">
                {t.recurringId ? <Repeat className="size-3.5 shrink-0 text-muted-foreground" /> : null}
                <span className="truncate">{t.title}</span>
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {names.get(t.categoryId) ?? "Uncategorised"} · {formatDay(t.date, data.settings.dateFormat)}
              </span>
            </button>
            <Amount value={t.amount} currency={t.currency} type={t.type} signed className="text-sm font-semibold" />
            {actions(t)}
          </li>
        ))}
      </ul>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border md:block">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {variant === "full" ? <TableHead className="w-32">ID</TableHead> : null}
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              {variant === "full" ? <TableHead>Method</TableHead> : null}
              {variant === "full" ? <TableHead className="max-w-56">Description</TableHead> : null}
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((t) => (
              <TableRow key={t.id} className="cursor-pointer" onClick={() => openDetails(t)}>
                {variant === "full" ? (
                  <TableCell className="font-mono text-xs text-muted-foreground">{t.ref}</TableCell>
                ) : null}
                <TableCell className="max-w-56">
                  <span className="flex items-center gap-1.5 font-medium">
                    {t.recurringId ? <Repeat className="size-3.5 shrink-0 text-muted-foreground" /> : null}
                    <span className="truncate">{t.title}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={t.type === "income" ? "secondary" : "destructive"} className="capitalize">
                    {t.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{names.get(t.categoryId) ?? "Uncategorised"}</TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDay(t.date, data.settings.dateFormat)}
                </TableCell>
                {variant === "full" ? (
                  <TableCell className="whitespace-nowrap text-muted-foreground">{PAYMENT_METHODS[t.paymentMethod]}</TableCell>
                ) : null}
                {variant === "full" ? (
                  <TableCell className="max-w-56 truncate text-muted-foreground">{t.description || "—"}</TableCell>
                ) : null}
                <TableCell className="text-right">
                  <Amount value={t.amount} currency={t.currency} type={t.type} signed className="font-semibold" />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>{actions(t)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {variant === "full" && pages > 1 ? (
        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            {current * PAGE_SIZE + 1}–{Math.min((current + 1) * PAGE_SIZE, transactions.length)} of {transactions.length}
          </span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled={current === 0} onClick={() => setPage(current - 1)}>
              Previous
            </Button>
            <span className="tabular-nums">
              {current + 1} / {pages}
            </span>
            <Button variant="secondary" size="sm" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}>
              Next
            </Button>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => {
          if (!o) setToDelete(null);
        }}
        title="Delete this transaction?"
        description={`"${toDelete?.title ?? ""}" will be removed and all totals, budgets, and charts will update.`}
        onConfirm={() => {
          if (!toDelete) return;
          update((d) => deleteTransaction(d, toDelete.id));
          toast.success("Transaction deleted");
        }}
      />
    </div>
  );
}


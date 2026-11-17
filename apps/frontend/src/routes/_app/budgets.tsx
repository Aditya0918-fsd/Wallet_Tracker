import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { AlertTriangle, MoreVertical, OctagonAlert, Pencil, PiggyBank, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/page-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import Amount from "@/components/wallet/amount.tsx";
import CategorySelect from "@/components/wallet/category-select.tsx";
import ConfirmDialog from "@/components/wallet/confirm-dialog.tsx";
import StatCard from "@/components/wallet/stat-card.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { deleteBudget, upsertBudget } from "@/lib/wallet/actions.ts";
import { budgetUsage, type BudgetUsage } from "@/lib/wallet/calc.ts";
import { monthRange } from "@/lib/wallet/dates.ts";
import { minorToInput, parseAmountToMinor } from "@/lib/wallet/money.ts";
import type { Budget } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";

export const Route = createFileRoute("/_app/budgets")({
  head: () => ({ meta: [{ title: "Budgets · Wallet Tracker" }] }),
  component: BudgetsPage,
});

function BudgetsPage() {
  const { data, update } = useWallet();
  const [editing, setEditing] = useState<Budget | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [toDelete, setToDelete] = useState<BudgetUsage | null>(null);
  const usage = useMemo(
    () => budgetUsage(data.budgets, data.transactions, data.categories, monthRange(new Date())),
    [data.budgets, data.transactions, data.categories],
  );
  const totalLimit = usage.reduce((s, u) => s + u.budget.limit, 0);
  const totalSpent = usage.reduce((s, u) => s + u.spent, 0);
  const warnings = usage.filter((u) => u.status !== "ok").length;

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">Budgets</span>}
        description={`Monthly spending limits for ${format(new Date(), "MMMM yyyy")}. Limits reset each month; history is kept.`}
        actions={
          <Button size="sm" onClick={openNew}>
            <Plus /> New budget
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total budgeted" value={<Amount value={totalLimit} />} icon={PiggyBank} />
        <StatCard
          label="Spent so far"
          value={<Amount value={totalSpent} />}
          icon={ShieldCheck}
          tone="destructive"
          hint={totalLimit > 0 ? `${((totalSpent / totalLimit) * 100).toFixed(0)}% of all budgets` : undefined}
        />
        <StatCard
          label="Remaining"
          value={<Amount value={totalLimit - totalSpent} type="net" />}
          icon={AlertTriangle}
          tone="accent"
          hint={warnings > 0 ? `${warnings} need attention` : "All on track"}
        />
      </div>

      {usage.length === 0 ? (
        <Empty className="border border-dashed py-14">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PiggyBank />
            </EmptyMedia>
            <EmptyTitle>No budgets yet</EmptyTitle>
            <EmptyDescription>Set a monthly limit for Food, Shopping, or any category and we'll warn you at 80%.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={openNew}>
              <Plus /> Create a budget
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {usage.map((u) => (
            <Card key={u.budget.id} className={cn("gap-4 px-5 shadow-sm", u.status === "exceeded" && "border-destructive/40", u.status === "warning" && "border-chart-4/60")}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">{u.categoryName}</p>
                  <StatusLabel u={u} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Budget actions" />}>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditing(u.budget);
                        setFormOpen(true);
                      }}
                    >
                      <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setToDelete(u)}>
                      <Trash2 /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Progress
                value={Math.min(100, u.usage)}
                className={cn(
                  "[&_[data-slot=progress-track]]:h-2.5",
                  u.status === "exceeded" && "[&_[data-slot=progress-indicator]]:bg-destructive",
                  u.status === "warning" && "[&_[data-slot=progress-indicator]]:bg-chart-4",
                )}
              />
              <dl className="grid grid-cols-4 gap-2 text-sm">
                <Stat label="Budget" value={<Amount value={u.budget.limit} compact />} />
                <Stat label="Spent" value={<Amount value={u.spent} compact />} />
                <Stat label="Remaining" value={<Amount value={u.remaining} type="net" compact />} />
                <Stat label="Usage" value={<span className="font-mono">{Math.round(u.usage)}%</span>} />
              </dl>
            </Card>
          ))}
        </div>
      )}

      <BudgetDialog open={formOpen} onOpenChange={setFormOpen} editing={editing} />
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => {
          if (!o) setToDelete(null);
        }}
        title="Delete this budget?"
        description={`The ${toDelete?.categoryName ?? ""} budget will be removed. Your expenses are not affected.`}
        onConfirm={() => {
          if (!toDelete) return;
          update((d) => deleteBudget(d, toDelete.budget.id));
          toast.success("Budget deleted");
        }}
      />
    </div>
  );
}

function StatusLabel({ u }: { u: BudgetUsage }) {
  if (u.status === "exceeded") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-destructive">
        <OctagonAlert className="size-3.5" /> Over budget
      </span>
    );
  }
  if (u.status === "warning") {
    return (
      <span className="flex items-center gap-1 text-xs font-medium">
        <AlertTriangle className="size-3.5" /> Approaching limit
      </span>
    );
  }
  return <span className="text-xs text-muted-foreground">On track</span>;
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="truncate font-semibold">{value}</dd>
    </div>
  );
}

function BudgetDialog({ open, onOpenChange, editing }: { open: boolean; onOpenChange: (o: boolean) => void; editing: Budget | null }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {open ? <BudgetForm key={editing?.id ?? "new"} editing={editing} onDone={() => onOpenChange(false)} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function BudgetForm({ editing, onDone }: { editing: Budget | null; onDone: () => void }) {
  const { update } = useWallet();
  const [categoryId, setCategoryId] = useState(editing?.categoryId ?? "");
  const [limit, setLimit] = useState(editing ? minorToInput(editing.limit) : "");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseAmountToMinor(limit);
    if (!categoryId) return setError("Choose a category");
    if (amount === null) return setError("Enter a valid limit greater than 0");
    try {
      update((d) => upsertBudget(d, { id: editing?.id, categoryId, limit: amount }));
      toast.success(editing ? "Budget updated" : "Budget created");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save budget");
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4" noValidate>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">{editing ? "Edit budget" : "New monthly budget"}</DialogTitle>
        <DialogDescription>Set a spending limit for an expense category.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        <Label>Category</Label>
        <CategorySelect type="expense" value={categoryId} onChange={setCategoryId} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="limit">Monthly limit</Label>
        <Input id="limit" inputMode="decimal" className="font-mono" placeholder="5000" value={limit} onChange={(e) => setLimit(e.target.value)} />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit">{editing ? "Save changes" : "Create budget"}</Button>
      </DialogFooter>
    </form>
  );
}

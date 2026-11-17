import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarClock, MoreVertical, Pause, Pencil, Play, Plus, Repeat, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PageHeader from "@/components/page-header.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import Amount from "@/components/wallet/amount.tsx";
import CategorySelect from "@/components/wallet/category-select.tsx";
import ConfirmDialog from "@/components/wallet/confirm-dialog.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { addRecurring, deleteRecurring, setRecurringPaused, updateRecurring } from "@/lib/wallet/actions.ts";
import { formatDay, FREQUENCY_LABELS, todayDay } from "@/lib/wallet/dates.ts";
import { PAYMENT_METHODS } from "@/lib/wallet/defaults.ts";
import { minorToInput, parseAmountToMinor } from "@/lib/wallet/money.ts";
import { amountField, dayField, paymentMethodField } from "@/lib/wallet/schemas.ts";
import type { Frequency, PaymentMethod, RecurringSchedule, TxType } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";

export const Route = createFileRoute("/_app/recurring")({
  head: () => ({ meta: [{ title: "Recurring · Wallet Tracker" }] }),
  component: RecurringPage,
});

function RecurringPage() {
  const { data, update } = useWallet();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<RecurringSchedule | null>(null);
  const [toDelete, setToDelete] = useState<RecurringSchedule | null>(null);
  const names = new Map(data.categories.map((c) => [c.id, c.name]));
  const sorted = [...data.recurring].sort((a, b) => Number(a.paused) - Number(b.paused) || a.nextDate.localeCompare(b.nextDate));
  const postedCount = (id: string) => data.transactions.filter((t) => t.recurringId === id).length;

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">Recurring</span>}
        description="Schedules post a real transaction automatically on each due date. Upcoming ones stay scheduled until then."
        actions={
          <Button size="sm" onClick={openNew}>
            <Plus /> New schedule
          </Button>
        }
      />

      {sorted.length === 0 ? (
        <Empty className="border border-dashed py-14">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Repeat />
            </EmptyMedia>
            <EmptyTitle>No recurring schedules</EmptyTitle>
            <EmptyDescription>Automate salary, rent, bills, and subscriptions.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={openNew}>
              <Plus /> Add a schedule
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sorted.map((r) => (
            <Card key={r.id} className={cn("gap-4 px-5 shadow-sm", r.paused && "opacity-70")}>
              <div className="flex items-start gap-3">
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", r.type === "income" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive")}>
                  <Repeat className="size-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display font-semibold">{r.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {names.get(r.categoryId) ?? "Uncategorised"} · {PAYMENT_METHODS[r.paymentMethod]}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Schedule actions" />}>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                      onClick={() => {
                        update((d) => setRecurringPaused(d, r.id, !r.paused));
                        toast.success(r.paused ? "Schedule resumed" : "Schedule paused");
                      }}
                    >
                      {r.paused ? <Play /> : <Pause />} {r.paused ? "Resume" : "Pause"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditing(r);
                        setOpen(true);
                      }}
                    >
                      <Pencil /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setToDelete(r)}>
                      <Trash2 /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-end justify-between gap-2">
                <Amount value={r.amount} type={r.type} signed className="font-display text-2xl font-semibold" />
                <div className="flex gap-1.5">
                  <Badge variant="secondary">{FREQUENCY_LABELS[r.frequency]}</Badge>
                  {r.paused ? <Badge variant="destructive">Paused</Badge> : <Badge>Active</Badge>}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarClock className="size-3.5" />
                  {r.paused ? "Paused" : "Next:"} <strong className="text-foreground">{r.paused ? "" : formatDay(r.nextDate, data.settings.dateFormat)}</strong>
                </span>
                <span className="text-muted-foreground">{postedCount(r.id)} posted</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          {open ? <RecurringForm key={editing?.id ?? "new"} editing={editing} onDone={() => setOpen(false)} /> : null}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => {
          if (!o) setToDelete(null);
        }}
        title="Delete this schedule?"
        description="Future transactions will stop. Transactions already posted stay in your history."
        onConfirm={() => {
          if (!toDelete) return;
          update((d) => deleteRecurring(d, toDelete.id));
          toast.success("Schedule deleted");
        }}
      />
    </div>
  );
}

const schema = z.object({
  type: z.enum(["income", "expense"]),
  title: z.string().trim().min(1, "Enter a title").max(80),
  amount: amountField,
  categoryId: z.string().min(1, "Choose a category"),
  paymentMethod: paymentMethodField,
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  startDate: dayField,
  description: z.string().max(500),
});
type Values = z.infer<typeof schema>;

function RecurringForm({ editing, onDone }: { editing: RecurringSchedule | null; onDone: () => void }) {
  const { update } = useWallet();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: editing
      ? { ...editing, amount: minorToInput(editing.amount) }
      : { type: "expense", title: "", amount: "", categoryId: "", paymentMethod: "bank_transfer", frequency: "monthly", startDate: todayDay(), description: "" },
  });
  const type = useWatch({ control: form.control, name: "type" });

  const submit = (v: Values) => {
    const amount = parseAmountToMinor(v.amount);
    if (amount === null) return;
    const input = { ...v, amount, title: v.title.trim(), description: v.description.trim() };
    update((d) => (editing ? updateRecurring(d, editing.id, input) : addRecurring(d, input)));
    toast.success(editing ? "Schedule updated" : "Schedule created", {
      description: v.startDate <= todayDay() ? "Due entries were posted to your transactions." : undefined,
    });
    onDone();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">{editing ? "Edit schedule" : "New recurring schedule"}</DialogTitle>
        <DialogDescription>A transaction is created automatically on each due date, never twice for the same date.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="grid gap-4" noValidate>
          <Tabs
            value={type}
            onValueChange={(v) => {
              form.setValue("type", v as TxType);
              form.setValue("categoryId", "");
            }}
          >
            <TabsList className="w-full">
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
            </TabsList>
          </Tabs>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder={type === "income" ? "Monthly salary" : "House rent"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input inputMode="decimal" className="font-mono" placeholder="15000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeats</FormLabel>
                  <NativeSelect className="w-full" value={field.value} onChange={(e) => field.onChange(e.target.value as Frequency)}>
                    {Object.entries(FREQUENCY_LABELS).map(([k, l]) => (
                      <NativeSelectOption key={k} value={k}>
                        {l}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <CategorySelect type={type} value={field.value} invalid={!!fieldState.error} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{editing ? "Start / next date" : "First date"}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment method</FormLabel>
                <NativeSelect className="w-full" value={field.value} onChange={(e) => field.onChange(e.target.value as PaymentMethod)}>
                  {Object.entries(PAYMENT_METHODS).map(([k, l]) => (
                    <NativeSelectOption key={k} value={k}>
                      {l}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onDone}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Create schedule"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}

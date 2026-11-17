import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { addTransaction, updateTransaction } from "@/lib/wallet/actions.ts";
import { todayDay } from "@/lib/wallet/dates.ts";
import { PAYMENT_METHODS } from "@/lib/wallet/defaults.ts";
import { minorToInput, parseAmountToMinor } from "@/lib/wallet/money.ts";
import { txFormSchema, type TxFormValues } from "@/lib/wallet/schemas.ts";
import type { PaymentMethod, Transaction, TxType } from "@/lib/wallet/types.ts";
import CategorySelect from "./category-select.tsx";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: TxType;
  editing: Transaction | null;
};

function initialValues(editing: Transaction | null): TxFormValues {
  if (editing) {
    return {
      title: editing.title,
      amount: minorToInput(editing.amount),
      categoryId: editing.categoryId,
      date: editing.date,
      paymentMethod: editing.paymentMethod,
      description: editing.description,
    };
  }
  return {
    title: "",
    amount: "",
    categoryId: "",
    date: todayDay(),
    paymentMethod: "upi",
    description: "",
  };
}

export default function TransactionFormDialog({ open, onOpenChange, type, editing }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {/* Remount per open/target so default values reset cleanly. */}
        {open ? (
          <TxForm
            key={editing?.id ?? `new-${type}`}
            type={editing?.type ?? type}
            editing={editing}
            onDone={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function TxForm({ type, editing, onDone }: { type: TxType; editing: Transaction | null; onDone: () => void }) {
  const { update, money } = useWallet();
  const form = useForm<TxFormValues>({
    resolver: zodResolver(txFormSchema),
    defaultValues: initialValues(editing),
  });
  const label = type === "income" ? "Income" : "Expense";

  const onSubmit = (values: TxFormValues) => {
    const amount = parseAmountToMinor(values.amount);
    if (amount === null) return;
    const input = {
      type,
      title: values.title.trim(),
      amount,
      currency: editing?.currency ?? money.currency,
      categoryId: values.categoryId,
      date: values.date,
      paymentMethod: values.paymentMethod,
      description: values.description.trim(),
    };
    try {
      update((d) => (editing ? updateTransaction(d, editing.id, input) : addTransaction(d, input)));
      toast.success(editing ? `${label} updated` : `${label} added`, { description: input.title });
      onDone();
    } catch {
      toast.error("Could not save. Please try again.");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">
          {editing ? `Edit ${label.toLowerCase()}` : `Add ${label.toLowerCase()}`}
        </DialogTitle>
        <DialogDescription>
          {type === "income" ? "Record money coming in." : "Record money going out."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder={type === "income" ? "November salary" : "Groceries at BigBasket"} {...field} />
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
                    <Input inputMode="decimal" placeholder="2500.00" className="font-mono" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <CategorySelect
                    type={type}
                    value={field.value}
                    invalid={!!fieldState.error}
                    onChange={(id) => field.onChange(id)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment method</FormLabel>
                  <NativeSelect
                    className="w-full"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value as PaymentMethod)}
                  >
                    {Object.entries(PAYMENT_METHODS).map(([value, name]) => (
                      <NativeSelectOption key={value} value={value}>
                        {name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Optional note" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onDone}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : `Add ${label.toLowerCase()}`}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { addTask, updateTask } from "@/lib/wallet/actions.ts";
import { PRIORITY_LABELS } from "@/lib/wallet/defaults.ts";
import type { Task, TaskPriority } from "@/lib/wallet/types.ts";

const schema = z.object({
  title: z.string().trim().min(1, "Enter a task title").max(100, "Keep it under 100 characters"),
  description: z.string().max(500, "Keep it under 500 characters"),
  dueDate: z.string(),
  priority: z.enum(["low", "medium", "high"]),
});
type Values = z.infer<typeof schema>;

type Props = { open: boolean; onOpenChange: (open: boolean) => void; editing: Task | null };

export default function TaskFormDialog({ open, onOpenChange, editing }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {open ? <TaskForm key={editing?.id ?? "new"} editing={editing} onDone={() => onOpenChange(false)} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function TaskForm({ editing, onDone }: { editing: Task | null; onDone: () => void }) {
  const { update } = useWallet();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: editing?.title ?? "",
      description: editing?.description ?? "",
      dueDate: editing?.dueDate ?? "",
      priority: editing?.priority ?? "medium",
    },
  });

  const onSubmit = (v: Values) => {
    const input = {
      title: v.title.trim(),
      description: v.description.trim(),
      dueDate: v.dueDate || null,
      priority: v.priority,
    };
    update((d) => (editing ? updateTask(d, editing.id, input) : addTask(d, input)));
    toast.success(editing ? "Task updated" : "Task added");
    onDone();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-xl">{editing ? "Edit task" : "New task"}</DialogTitle>
        <DialogDescription>Keep track of bills to pay, documents to file, and money to-dos.</DialogDescription>
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
                  <Input placeholder="Pay credit card bill" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <NativeSelect
                    className="w-full"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value as TaskPriority)}
                  >
                    {Object.entries(PRIORITY_LABELS).map(([value, name]) => (
                      <NativeSelectOption key={value} value={value}>
                        {name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
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
                  <Textarea rows={3} placeholder="Optional details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onDone}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add task"}</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}

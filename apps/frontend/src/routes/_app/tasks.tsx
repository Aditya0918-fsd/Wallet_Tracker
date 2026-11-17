import { createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { AlertCircle, CalendarDays, CheckCircle2, ListTodo, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "@/components/page-header.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import ConfirmDialog from "@/components/wallet/confirm-dialog.tsx";
import TaskFormDialog from "@/components/wallet/task-form-dialog.tsx";
import { useDebounce } from "@/hooks/use-debounce.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { deleteTask, setTaskCompleted } from "@/lib/wallet/actions.ts";
import { isOverdue } from "@/lib/wallet/calc.ts";
import { formatDay, todayDay } from "@/lib/wallet/dates.ts";
import { PRIORITY_LABELS } from "@/lib/wallet/defaults.ts";
import type { Task } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({ meta: [{ title: "Tasks · Wallet Tracker" }] }),
  component: TasksPage,
});

type StatusFilter = "all" | "pending" | "completed";
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 } as const;
const PRIORITY_TONE = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-chart-4/20 text-foreground",
  low: "bg-muted text-muted-foreground",
} as const;

function TasksPage() {
  const { data, update } = useWallet();
  const [status, setStatus] = useState<StatusFilter>("pending");
  const [search, setSearch] = useState("");
  const [q] = useDebounce(search, 200);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [toDelete, setToDelete] = useState<Task | null>(null);
  const today = todayDay();

  const { overdue, list, counts } = useMemo(() => {
    const query = q.trim().toLowerCase();
    const matches = (t: Task) => !query || `${t.title} ${t.description}`.toLowerCase().includes(query);
    const sorted = [...data.tasks].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const ad = a.dueDate ?? "9999";
      const bd = b.dueDate ?? "9999";
      if (ad !== bd) return ad.localeCompare(bd);
      return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    });
    const over = sorted.filter((t) => isOverdue(t, today) && matches(t));
    const rest = sorted.filter((t) => {
      if (isOverdue(t, today)) return false;
      if (status === "pending" && t.completed) return false;
      if (status === "completed" && !t.completed) return false;
      return matches(t);
    });
    return {
      overdue: status === "completed" ? [] : over,
      list: rest,
      counts: {
        all: data.tasks.length,
        pending: data.tasks.filter((t) => !t.completed).length,
        completed: data.tasks.filter((t) => t.completed).length,
      },
    };
  }, [data.tasks, q, status, today]);

  const toggle = (t: Task) => {
    update((d) => setTaskCompleted(d, t.id, !t.completed));
    toast.success(t.completed ? "Marked as pending" : "Task completed");
  };
  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const row = (t: Task) => (
    <li key={t.id} className="flex items-start gap-3 px-4 py-3.5">
      <Checkbox checked={t.completed} onCheckedChange={() => toggle(t)} className="mt-0.5 cursor-pointer" aria-label={`Mark ${t.title} ${t.completed ? "pending" : "complete"}`} />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("font-medium break-words", t.completed && "text-muted-foreground line-through")}>{t.title}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", PRIORITY_TONE[t.priority])}>{PRIORITY_LABELS[t.priority]}</span>
        </div>
        {t.description ? <p className="text-sm break-words text-muted-foreground">{t.description}</p> : null}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {t.dueDate ? (
            <span className={cn("flex items-center gap-1", isOverdue(t, today) && "font-medium text-destructive")}>
              <CalendarDays className="size-3.5" /> Due {formatDay(t.dueDate, data.settings.dateFormat)}
            </span>
          ) : null}
          <span>Created {format(parseISO(t.createdAt), "d MMM yyyy")}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Task actions" />}>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => toggle(t)}>
            <CheckCircle2 /> {t.completed ? "Mark pending" : "Mark complete"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditing(t);
              setFormOpen(true);
            }}
          >
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setToDelete(t)}>
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">Tasks</span>}
        description="Bills to pay, documents to file, money to-dos."
        actions={
          <Button size="sm" onClick={openNew}>
            <Plus /> Add task
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
          <TabsList>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks" className="pl-9" aria-label="Search tasks" />
        </div>
      </div>

      {overdue.length > 0 ? (
        <Card className="gap-0 border-destructive/30 py-0">
          <div className="flex items-center gap-2 border-b border-destructive/20 bg-destructive/5 px-4 py-3">
            <AlertCircle className="size-4 text-destructive" />
            <span className="font-display text-sm font-semibold text-destructive">Overdue ({overdue.length})</span>
          </div>
          <ul className="divide-y">{overdue.map(row)}</ul>
        </Card>
      ) : null}

      {list.length > 0 ? (
        <Card className="gap-0 py-0">
          <ul className="divide-y">{list.map(row)}</ul>
        </Card>
      ) : overdue.length === 0 ? (
        <Empty className="border border-dashed py-14">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListTodo />
            </EmptyMedia>
            <EmptyTitle>{data.tasks.length === 0 ? "No tasks yet" : "Nothing here"}</EmptyTitle>
            <EmptyDescription>
              {data.tasks.length === 0 ? "Add reminders like paying rent or renewing insurance." : "No tasks match this view."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" onClick={openNew}>
              <Plus /> Add task
            </Button>
          </EmptyContent>
        </Empty>
      ) : null}

      {counts.completed > 0 && status !== "completed" ? (
        <p className="text-center text-xs text-muted-foreground">
          <Badge variant="secondary">{counts.completed}</Badge> completed tasks hidden. Switch to Completed to view them.
        </p>
      ) : null}

      <TaskFormDialog open={formOpen} onOpenChange={setFormOpen} editing={editing} />
      <ConfirmDialog
        open={toDelete !== null}
        onOpenChange={(o) => {
          if (!o) setToDelete(null);
        }}
        title="Delete this task?"
        description={`"${toDelete?.title ?? ""}" will be permanently removed.`}
        onConfirm={() => {
          if (!toDelete) return;
          update((d) => deleteTask(d, toDelete.id));
          toast.success("Task deleted");
        }}
      />
    </div>
  );
}

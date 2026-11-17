import { formatDistanceToNow, parseISO } from "date-fns";
import {
  AlertTriangle,
  Bell,
  CalendarClock,
  CheckCheck,
  CircleDollarSign,
  ClipboardList,
  FileBarChart,
  OctagonAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { clearNotifications, markAllRead, markNotificationRead } from "@/lib/wallet/actions.ts";
import type { NotificationKind } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";

const KIND_ICON: Record<NotificationKind, { icon: LucideIcon; tone: string }> = {
  transaction: { icon: CircleDollarSign, tone: "bg-primary/10 text-primary" },
  budget_warning: { icon: AlertTriangle, tone: "bg-chart-4/20 text-foreground" },
  budget_exceeded: { icon: OctagonAlert, tone: "bg-destructive/10 text-destructive" },
  recurring: { icon: CalendarClock, tone: "bg-chart-3/15 text-chart-3" },
  task_overdue: { icon: ClipboardList, tone: "bg-destructive/10 text-destructive" },
  monthly_summary: { icon: FileBarChart, tone: "bg-accent text-accent-foreground" },
};

export default function NotificationBell() {
  const { data, update } = useWallet();
  // Cleared notifications keep an empty title as a dedupe marker.
  const items = data.notifications.filter((n) => n.title);
  const unread = items.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative" aria-label={`Notifications, ${unread} unread`} />
        }
      >
        <Bell />
        {unread > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-destructive px-1 font-mono text-[10px] font-semibold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(92vw,380px)] gap-0 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="font-display font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">{unread} unread</p>
          </div>
          <div className="flex gap-1">
            <Button size="xs" variant="ghost" disabled={unread === 0} onClick={() => update(markAllRead)}>
              <CheckCheck /> Read all
            </Button>
            <Button size="xs" variant="ghost" disabled={items.length === 0} onClick={() => update(clearNotifications)}>
              Clear
            </Button>
          </div>
        </div>
        {items.length === 0 ? (
          <div className="grid place-items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground">
            <Bell className="size-6" />
            You're all caught up.
          </div>
        ) : (
          <ScrollArea className="max-h-[420px]">
            <ul className="divide-y">
              {items.slice(0, 40).map((n) => {
                const meta = KIND_ICON[n.kind];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => update((d) => markNotificationRead(d, n.id))}
                      className={cn(
                        "flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60",
                        !n.read && "bg-primary/[0.04]",
                      )}
                    >
                      <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", meta.tone)}>
                        <meta.icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium">{n.title}</span>
                          {!n.read ? <span className="size-1.5 shrink-0 rounded-full bg-primary" /> : null}
                        </span>
                        <span className="line-clamp-2 text-xs text-muted-foreground">{n.message}</span>
                        <span className="text-[11px] text-muted-foreground/80">
                          {formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}

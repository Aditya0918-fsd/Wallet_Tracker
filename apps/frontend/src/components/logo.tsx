import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils.ts";

export default function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl shadow-sm",
          light ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <Wallet className="size-5" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Wallet<span className={light ? "text-sidebar-primary" : "text-primary"}>Tracker</span>
      </span>
    </span>
  );
}

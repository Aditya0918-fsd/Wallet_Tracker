import { Link, useLocation } from "@tanstack/react-router";
import { LogOut, MoreHorizontal, Plus, Settings, User } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/logo.tsx";
import NotificationBell from "@/components/notification-bell.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { useTxDialog } from "@/hooks/use-tx-dialog.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { MOBILE_PRIMARY, NAV_ITEMS } from "@/lib/nav.ts";
import { cn } from "@/lib/utils.ts";

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "W"
  );
}

export function UserAvatar({ className }: { className?: string }) {
  const { data } = useWallet();
  const { user } = useAuth();
  const src = data.profile.avatar ?? undefined;
  return (
    <Avatar className={className}>
      {src ? <AvatarImage src={src} alt={data.profile.name} /> : null}
      <AvatarFallback className="bg-primary/15 font-semibold text-primary">{initials(data.profile.name)}</AvatarFallback>
    </Avatar>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon
              className={cn("size-4.5", active ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground")}
            />
            {item.label}
            {active ? <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

function AccountMenu() {
  const { data, email } = useWallet();
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="h-10 gap-2 rounded-full px-1.5 sm:pr-3" aria-label="Account menu" />}
      >
        <UserAvatar className="size-8" />
        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">{data.profile.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col">
            <span className="truncate text-sm font-semibold text-foreground">{data.profile.name}</span>
            <span className="truncate text-xs font-normal">{email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link to="/profile" />}>
          <User /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link to="/settings" />}>
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => void signOut({ returnTo: "/" })}>
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function QuickAdd() {
  const { openNew, openTask } = useTxDialog();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="sm" className="gap-1.5" />}>
        <Plus /> <span className="hidden sm:inline">New</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => openNew("income")}>Add income</DropdownMenuItem>
        <DropdownMenuItem onClick={() => openNew("expense")}>Add expense</DropdownMenuItem>
        <DropdownMenuItem onClick={openTask}>Add task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((n) => pathname.startsWith(n.to));
  const primary = NAV_ITEMS.filter((n) => MOBILE_PRIMARY.includes(n.to));

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground lg:flex">
        <div className="px-2 pt-1 pb-6">
          <Logo light />
        </div>
        <SidebarNav />
        <div className="mt-auto rounded-2xl bg-sidebar-accent p-4 text-xs text-sidebar-foreground/70">
          <p className="font-display text-sm font-semibold text-sidebar-accent-foreground">Private by design</p>
          <p className="pt-1">Your records stay in this browser, tied to your account.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/85 px-4 backdrop-blur-md sm:px-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="hidden font-display text-lg font-semibold lg:block">{current?.label ?? "Profile"}</h2>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <QuickAdd />
            <ThemeToggle />
            <NotificationBell />
            <AccountMenu />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 pt-6 pb-28 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t bg-background/95 px-2 pt-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur-md lg:hidden">
        {primary.map((item) => {
          const active = pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-w-14 cursor-pointer flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMoreOpen(true)}
          className="flex min-w-14 cursor-pointer flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium text-muted-foreground"
        >
          <MoreHorizontal className="size-5" />
          More
        </button>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-4 text-sidebar-foreground">
          <SheetHeader className="px-2">
            <SheetTitle className="text-sidebar-foreground">
              <Logo light />
            </SheetTitle>
          </SheetHeader>
          <SidebarNav onNavigate={() => setMoreOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}


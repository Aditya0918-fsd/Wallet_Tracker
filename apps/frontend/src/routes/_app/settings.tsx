import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Database, Download, FileJson, LogOut, Monitor, Moon, Sun, Trash2, Upload, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTheme, type Theme } from "@/components/providers/theme-context.ts";
import PageHeader from "@/components/page-header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import ConfirmDialog from "@/components/wallet/confirm-dialog.tsx";
import Panel from "@/components/wallet/panel.tsx";
import { UserAvatar } from "@/components/app-shell.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { categoryInUse, deleteCategory, updateSettings } from "@/lib/wallet/actions.ts";
import { DATE_FORMATS, formatDay, todayDay } from "@/lib/wallet/dates.ts";
import { downloadCsv, downloadJson } from "@/lib/wallet/export.ts";
import { CURRENCIES, formatMoney } from "@/lib/wallet/money.ts";
import { parseWallet } from "@/lib/wallet/store.ts";
import type { CurrencyCode, DateFormat, NumberLocale, Settings } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";
import { apiHref, apiRequest } from "@/lib/api.ts";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings · Wallet Tracker" }] }),
  component: SettingsPage,
});

const THEMES: Array<{ id: Theme; label: string; icon: typeof Sun }> = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

const LOCALES: Array<{ id: NumberLocale; label: string }> = [
  { id: "en-IN", label: "Indian (12,34,567.89)" },
  { id: "en-US", label: "International (1,234,567.89)" },
  { id: "de-DE", label: "European (1.234.567,89)" },
  { id: "fr-FR", label: "French (1 234 567,89)" },
];

const NOTIFY: Array<{ key: keyof Settings; label: string; hint: string }> = [
  { key: "notifyBudget", label: "Budget alerts", hint: "When you reach 80% or exceed a budget" },
  { key: "notifyRecurring", label: "Recurring reminders", hint: "Upcoming and posted recurring transactions" },
  { key: "notifyTasks", label: "Task deadlines", hint: "When a task becomes overdue" },
  { key: "notifyMonthly", label: "Monthly summary", hint: "A recap of last month's income and spending" },
  { key: "notifyTransactions", label: "Transaction confirmations", hint: "Each time you add income or an expense" },
];

type ActiveSession = { id:string; createdAt:string; expiresAt:string; current:boolean };
function SessionManagement() {
  const sessionsQuery = useQuery({ queryKey: ["auth-sessions"], queryFn: () => apiRequest<ActiveSession[]>("/auth/sessions") });
  const sessions = sessionsQuery.data ?? [];
  useEffect(() => {
    if (sessionsQuery.error) toast.error(sessionsQuery.error instanceof Error ? sessionsQuery.error.message : "Could not load sessions.");
  }, [sessionsQuery.error]);
  async function revoke(id:string){try{await apiRequest("/auth/sessions/"+encodeURIComponent(id),{method:"DELETE"});toast.success("Session revoked");await sessionsQuery.refetch();}catch(error){toast.error(error instanceof Error?error.message:"Could not revoke session.");}}
  return <Panel title="Active sessions"><div className="space-y-3">{sessionsQuery.isPending?<p className="text-sm text-muted-foreground">Loading sessions…</p>:null}{sessions.map((session)=><div key={session.id} className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium">{session.current?"This device":"Signed-in device"}</p><p className="text-xs text-muted-foreground">Signed in {new Date(session.createdAt).toLocaleString()} · Expires {new Date(session.expiresAt).toLocaleDateString()}</p></div><Button variant="secondary" size="sm" disabled={session.current} onClick={()=>void revoke(session.id)}>Revoke</Button></div>)}{!sessionsQuery.isPending&&sessions.length===0&&<p className="text-sm text-muted-foreground">No active sessions found.</p>}</div></Panel>;
}
function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      <div className="sm:w-64">{children}</div>
    </div>
  );
}

function SettingsPage() {
  const { data, update, replace, reset, email, money } = useWallet();
  const { theme, setTheme } = useTheme();
  const { signOut, user } = useAuth();
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const s = data.settings;
  const set = (patch: Partial<Settings>) => {
    update((d) => updateSettings(d, patch));
    toast.success("Preferences saved");
  };
  const custom = data.categories.filter((c) => !c.isDefault);

  const importFile = async (file: File | undefined) => {
    if (!file) return;
    const parsed = parseWallet(await file.text(), data.profile.name);
    if (!parsed) return toast.error("That file isn't a valid Wallet Tracker backup");
    const merge = <T extends { id: string }>(current: T[], incoming: T[]) => {
      const known = new Set(current.map((item) => item.id));
      const additions = incoming.filter((item) => !known.has(item.id));
      return { rows: [...current, ...additions], added: additions.length };
    };
    const transactions=merge(data.transactions,parsed.transactions),categories=merge(data.categories,parsed.categories);
    const tasks=merge(data.tasks,parsed.tasks),budgets=merge(data.budgets,parsed.budgets);
    const recurring=merge(data.recurring,parsed.recurring),notifications=merge(data.notifications,parsed.notifications);
    replace({...data,transactions:transactions.rows,categories:categories.rows,tasks:tasks.rows,budgets:budgets.rows,recurring:recurring.rows,notifications:notifications.rows});
    const added=transactions.added+categories.added+tasks.added+budgets.added+recurring.added+notifications.added;
    toast.success("Backup merged safely",{description:added+" new records added; duplicate IDs were skipped."});
  };
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader title={<span className="font-display">Settings</span>} description="Manage your account and preferences." />

      <Panel title="Account">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <UserAvatar className="size-14" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-semibold">{data.profile.name}</p>
            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" render={<Link to="/profile" />} nativeButton={false}>
              <User /> Edit profile
            </Button>
            <Button variant="secondary" size="sm" render={<a href="/auth/change-password" />} nativeButton={false}>
              Change password
            </Button>
            <Button variant="destructive" size="sm" onClick={() => void signOut({ returnTo: "/" })}>
              <LogOut /> Log out
            </Button>
          </div>
        </div>
        <p className="pt-4 text-xs text-muted-foreground">
          Password hashing and sessions are handled by the Wallet Tracker backend. Use the forgot-password link on the sign-in screen if needed.
        </p>
      </Panel>

      <SessionManagement />
      <Panel title="Sign-in methods">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" render={<a href="/auth/change-password" />} nativeButton={false}>
            {user?.authMethods?.password ? "Change password" : "Set a password"}
          </Button>
          {!user?.authMethods?.google && <Button variant="secondary" render={<a href={apiHref("/auth/google/link")} />} nativeButton={false}>Connect Google</Button>}
        </div>
      </Panel>
      <Panel title="Appearance">
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors hover:bg-muted/50",
                theme === t.id && "border-primary bg-primary/5 text-primary",
              )}
            >
              <t.icon className="size-5" />
              {t.label}
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="Financial preferences">
        <div className="divide-y">
          <Row label="Default currency" hint={`Preview: ${formatMoney(123456789, money)}`}>
            <NativeSelect className="w-full" value={s.currency} onChange={(e) => set({ currency: e.target.value as CurrencyCode })}>
              {CURRENCIES.map((c) => (
                <NativeSelectOption key={c.code} value={c.code}>
                  {c.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Row>
          <Row label="Number format">
            <NativeSelect className="w-full" value={s.numberLocale} onChange={(e) => set({ numberLocale: e.target.value as NumberLocale })}>
              {LOCALES.map((l) => (
                <NativeSelectOption key={l.id} value={l.id}>
                  {l.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Row>
          <Row label="Date format" hint={`Today: ${formatDay(todayDay(), s.dateFormat)}`}>
            <NativeSelect className="w-full" value={s.dateFormat} onChange={(e) => set({ dateFormat: e.target.value as DateFormat })}>
              {DATE_FORMATS.map((f) => (
                <NativeSelectOption key={f} value={f}>
                  {formatDay(todayDay(), f)}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Row>
          <Row label="First day of the week">
            <NativeSelect className="w-full" value={String(s.weekStartsOn)} onChange={(e) => set({ weekStartsOn: e.target.value === "0" ? 0 : 1 })}>
              <NativeSelectOption value="1">Monday</NativeSelectOption>
              <NativeSelectOption value="0">Sunday</NativeSelectOption>
            </NativeSelect>
          </Row>
        </div>
      </Panel>

      <Panel title="Notifications">
        <div className="divide-y">
          {NOTIFY.map((n) => (
            <div key={n.key} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.hint}</p>
              </div>
              <Switch checked={Boolean(s[n.key])} onCheckedChange={(v) => set({ [n.key]: v })} aria-label={n.label} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Custom categories" description="Categories you added. Defaults can't be removed.">
        {custom.length === 0 ? (
          <p className="text-sm text-muted-foreground">No custom categories yet. Add one from any transaction form.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {custom.map((c) => {
              const used = categoryInUse(data, c.id);
              return (
                <li key={c.id} className="flex items-center gap-1 rounded-full border py-1 pr-1 pl-3 text-sm">
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">· {c.type}</span>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Delete ${c.name}`}
                    disabled={used}
                    title={used ? "In use by transactions, budgets, or schedules" : "Delete"}
                    onClick={() => {
                      update((d) => deleteCategory(d, c.id));
                      toast.success("Category removed");
                    }}
                  >
                    <Trash2 />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Data management" description="Your account data syncs to your Wallet Tracker account. Download a backup regularly.">
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            className="justify-start"
            disabled={data.transactions.length === 0}
            onClick={() => downloadCsv("all-transactions", data.transactions, data.categories)}
          >
            <Download /> Export financial data (CSV)
          </Button>
          <Button variant="secondary" className="justify-start" onClick={() => downloadJson("wallet-tracker-backup", data)}>
            <FileJson /> Download account data (backup)
          </Button>
          <Button variant="secondary" className="justify-start" onClick={() => fileRef.current?.click()}>
            <Upload /> Restore from backup
          </Button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={(e) => void importFile(e.target.files?.[0])} />
          <Button variant="destructive" className="justify-start" onClick={() => setConfirmReset(true)}>
            <Trash2 /> Delete all my data
          </Button>
        </div>
        <p className="flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
          <Database className="size-3.5" /> {data.transactions.length} transactions · {data.tasks.length} tasks · {data.budgets.length} budgets ·{" "}
          {data.recurring.length} schedules
        </p>
      </Panel>

      <ConfirmDialog
        open={confirmReset}
        onOpenChange={setConfirmReset}
        title="Delete all your data?"
        description="This permanently erases every transaction, task, budget, schedule, and preference from your account. Download a backup first if you might need it. Your sign-in account itself is not removed."
        confirmLabel="Delete everything"
        onConfirm={() => {
          reset();
          toast.success("All data deleted");
        }}
      />
    </div>
  );
}





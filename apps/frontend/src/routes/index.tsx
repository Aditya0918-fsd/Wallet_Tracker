import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Bell, CheckSquare, PiggyBank, Repeat, ShieldCheck, Wallet } from "lucide-react";
import Logo from "@/components/logo.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { site } from "@/lib/site.ts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} · Personal finance, beautifully organised` },
      { name: "description", content: site.tagline },
      { property: "og:title", content: site.name },
      { property: "og:description", content: site.tagline },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Wallet, title: "Income and expenses", body: "Record every rupee in seconds with categories, payment methods, and notes." },
  { icon: BarChart3, title: "22 chart views", body: "Waterfalls, sunbursts, candlesticks, and more, all from your real data." },
  { icon: PiggyBank, title: "Monthly budgets", body: "Set limits per category and get warned at 80% before you overspend." },
  { icon: Repeat, title: "Recurring payments", body: "Salary, rent, and subscriptions post themselves, never twice." },
  { icon: CheckSquare, title: "Money to-dos", body: "Deadlines and priorities for bills, renewals, and paperwork." },
  { icon: Bell, title: "Smart alerts", body: "Budget warnings, overdue tasks, and a monthly recap." },
];

const BARS = [42, 58, 35, 70, 52, 80, 64];

function Landing() {
  const { user } = useAuth();
  const cta = user ? (
    <Button size="lg" render={<Link to="/dashboard" />} nativeButton={false} className="h-12 px-6 text-base">
      Open dashboard <ArrowRight />
    </Button>
  ) : (
    <SignInButton size="lg" className="h-12 px-6 text-base" signInText="Get started free" showIcon={false} />
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--accent)_70%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[size:56px_56px] opacity-40" />

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Button size="sm" render={<Link to="/dashboard" />} nativeButton={false}>
              Dashboard
            </Button>
          ) : (
            <SignInButton size="sm" variant="secondary" />
          )}
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <ShieldCheck className="size-3.5 text-primary" /> Private by design · INR first
            </span>
            <h1 className="font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Know exactly where your <span className="font-serif font-normal text-primary italic">money</span> goes.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Wallet Tracker brings your income, expenses, budgets, and savings into one calm dashboard, with totals and charts that update the moment you
              add a transaction.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {cta}
              <span className="text-sm text-muted-foreground">Sign in with Google or email</span>
            </div>
          </div>

          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-3xl bg-sidebar p-6 text-sidebar-foreground shadow-2xl ring-1 ring-black/5">
              <p className="text-xs tracking-[0.2em] text-sidebar-foreground/60 uppercase">Available balance</p>
              <p className="pt-1 font-display text-4xl font-semibold text-sidebar-accent-foreground">₹1,84,320.50</p>
              <div className="mt-6 flex h-36 items-end gap-2.5">
                {BARS.map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-lg bg-sidebar-primary/85" />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-sidebar-accent p-4">
                  <p className="text-xs text-sidebar-foreground/60">This month in</p>
                  <p className="font-mono text-lg text-sidebar-primary">+₹92,000</p>
                </div>
                <div className="rounded-2xl bg-sidebar-accent p-4">
                  <p className="text-xs text-sidebar-foreground/60">This month out</p>
                  <p className="font-mono text-lg text-sidebar-accent-foreground">−₹41,250</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-16 hidden w-56 rounded-2xl border bg-card p-4 shadow-xl sm:block">
              <p className="text-xs text-muted-foreground">Food budget</p>
              <p className="font-display font-semibold">₹4,000 of ₹5,000</p>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-2 w-4/5 rounded-full bg-chart-4" />
              </div>
              <p className="pt-1.5 text-[11px] text-muted-foreground">80% used · ₹1,000 left</p>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <h2 className="pb-8 font-display text-3xl font-semibold tracking-tight">Everything a careful spender needs</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border bg-card/80 p-6 backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </span>
                <h3 className="pt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="pt-1 text-sm text-muted-foreground">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <span>© {new Date().getFullYear()} Wallet Tracker</span>
        </div>
      </footer>
    </div>
  );
}

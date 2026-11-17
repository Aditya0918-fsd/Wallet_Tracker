import { createFileRoute } from "@tanstack/react-router";
import TypeLedgerPage from "@/components/wallet/type-ledger-page.tsx";

export const Route = createFileRoute("/_app/expenses")({
  head: () => ({ meta: [{ title: "Expenses · Wallet Tracker" }] }),
  component: () => <TypeLedgerPage type="expense" />,
});

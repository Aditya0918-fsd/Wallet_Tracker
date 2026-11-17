import { createFileRoute } from "@tanstack/react-router";
import TypeLedgerPage from "@/components/wallet/type-ledger-page.tsx";

export const Route = createFileRoute("/_app/income")({
  head: () => ({ meta: [{ title: "Income · Wallet Tracker" }] }),
  component: () => <TypeLedgerPage type="income" />,
});

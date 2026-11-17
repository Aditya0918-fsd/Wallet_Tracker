import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownCircle, ArrowUpCircle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import PageHeader from "@/components/page-header.tsx";
import Amount from "@/components/wallet/amount.tsx";
import ExportMenu from "@/components/wallet/export-menu.tsx";
import Panel from "@/components/wallet/panel.tsx";
import StatCard from "@/components/wallet/stat-card.tsx";
import TransactionsTable from "@/components/wallet/transactions-table.tsx";
import TxFilters from "@/components/wallet/tx-filters.tsx";
import { useTxDialog } from "@/hooks/use-tx-dialog.ts";
import { useTxFilters } from "@/hooks/use-tx-filters.ts";
import { useWallet } from "@/hooks/use-wallet.ts";
import { totals } from "@/lib/wallet/calc.ts";

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "Transactions · Wallet Tracker" }] }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const { data } = useWallet();
  const { openNew } = useTxDialog();
  const { filters, set, reset, filtered } = useTxFilters(data.transactions, data.categories);
  const t = totals(filtered);
  const rangeLabel = filters.from || filters.to ? `${filters.from || "start"} to ${filters.to || "today"}` : "All dates";

  return (
    <div className="space-y-6">
      <PageHeader
        title={<span className="font-display">Transactions</span>}
        description="Your complete financial history in one ledger."
        actions={
          <>
            <ExportMenu name="transactions" title="Transaction history" rangeLabel={rangeLabel} transactions={filtered} />
            <Button size="sm" variant="secondary" onClick={() => openNew("income")}>
              <ArrowDownCircle /> Income
            </Button>
            <Button size="sm" onClick={() => openNew("expense")}>
              <ArrowUpCircle /> Expense
            </Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Filtered income" value={<Amount value={t.income} />} icon={ArrowDownCircle} />
        <StatCard label="Filtered expenses" value={<Amount value={t.expense} />} icon={ArrowUpCircle} tone="destructive" />
        <StatCard label="Net" value={<Amount value={t.net} type="net" />} icon={Scale} tone="accent" hint={`${filtered.length} transactions`} />
      </div>
      <Panel title="Ledger" description={`${filtered.length} of ${data.transactions.length} transactions`}>
        <div className="space-y-4">
          <TxFilters filters={filters} onChange={set} onReset={reset} />
          <TransactionsTable
            transactions={filtered}
            emptyTitle={data.transactions.length === 0 ? "No transactions yet" : "No matching transactions"}
            emptyAction={
              <Button size="sm" onClick={() => openNew("expense")}>
                Add a transaction
              </Button>
            }
          />
        </div>
      </Panel>
    </div>
  );
}

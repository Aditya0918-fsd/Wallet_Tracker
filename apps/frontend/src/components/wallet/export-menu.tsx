import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { downloadCsv, downloadTransactionsPdf } from "@/lib/wallet/export.ts";
import type { Transaction } from "@/lib/wallet/types.ts";

type Props = { name: string; title: string; rangeLabel: string; transactions: Transaction[] };

export default function ExportMenu({ name, title, rangeLabel, transactions }: Props) {
  const { data } = useWallet();
  const [busy, setBusy] = useState(false);
  const empty = transactions.length === 0;

  const pdf = async () => {
    setBusy(true);
    try {
      await downloadTransactionsPdf(title, rangeLabel, transactions, data);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Could not create the PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" size="sm" disabled={busy} />}>
        <Download /> Export
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem disabled={empty} onClick={() => void pdf()}>
          <FileText /> Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={empty}
          onClick={() => {
            downloadCsv(name, transactions, data.categories);
            toast.success("CSV downloaded");
          }}
        >
          <FileSpreadsheet /> Export CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

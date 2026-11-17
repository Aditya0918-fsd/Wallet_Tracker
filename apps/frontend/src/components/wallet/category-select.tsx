import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { useWallet } from "@/hooks/use-wallet.ts";
import { addCategory } from "@/lib/wallet/actions.ts";
import type { TxType } from "@/lib/wallet/types.ts";
import { cn } from "@/lib/utils.ts";

type Props = {
  type: TxType;
  value: string;
  onChange: (id: string) => void;
  id?: string;
  invalid?: boolean;
  className?: string;
};

/** Category dropdown with inline "add custom category". */
export default function CategorySelect({ type, value, onChange, id, invalid, className }: Props) {
  const { data, update } = useWallet();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const options = data.categories.filter((c) => c.type === type);

  const save = () => {
    if (!name.trim()) return;
    let createdId = "";
    update((d) => {
      const res = addCategory(d, type, name);
      createdId = res.category.id;
      return res.data;
    });
    onChange(createdId);
    setName("");
    setAdding(false);
  };

  if (adding) {
    return (
      <div className={cn("flex gap-2", className)}>
        <Input
          autoFocus
          value={name}
          maxLength={40}
          placeholder="e.g. Side project"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              save();
            }
            if (e.key === "Escape") setAdding(false);
          }}
        />
        <Button type="button" size="sm" onClick={save} className="h-9">
          Add
        </Button>
        <Button type="button" size="sm" variant="ghost" className="h-9" onClick={() => setAdding(false)}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      <NativeSelect
        id={id}
        aria-invalid={invalid}
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <NativeSelectOption value="" disabled>
          Select a category
        </NativeSelectOption>
        {options.map((c) => (
          <NativeSelectOption key={c.id} value={c.id}>
            {c.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="size-9 shrink-0"
        aria-label="Add custom category"
        onClick={() => setAdding(true)}
      >
        <Plus />
      </Button>
    </div>
  );
}

import { z } from "zod";

export const transactionInputSchema = z.object({
  type: z.enum(["income", "expense"]),
  title: z.string().trim().min(1).max(120),
  amount: z.number().int().positive().safe(),
  currency: z.string().regex(/^[A-Z]{3}$/).default("INR"),
  categoryId: z.string().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  paymentMethod: z.enum(["cash", "upi", "debit_card", "credit_card", "bank_transfer", "wallet", "cheque", "other"]),
  description: z.string().max(2000).default(""),
});
export type TransactionInput = z.infer<typeof transactionInputSchema>;

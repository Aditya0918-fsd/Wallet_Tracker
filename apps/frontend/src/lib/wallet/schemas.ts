import { z } from "zod";
import { parseAmountToMinor } from "./money.ts";

/** Amount entered as text and validated into integer paise. */
export const amountField = z
  .string()
  .trim()
  .min(1, "Enter an amount")
  .refine((v) => parseAmountToMinor(v) !== null, "Enter a valid amount greater than 0 (max 2 decimals)");

export const dayField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date");

export const paymentMethodField = z.enum([
  "cash",
  "upi",
  "debit_card",
  "credit_card",
  "bank_transfer",
  "wallet",
  "cheque",
  "other",
]);

export const txFormSchema = z.object({
  title: z.string().trim().min(1, "Enter a title").max(80, "Keep it under 80 characters"),
  amount: amountField,
  categoryId: z.string().min(1, "Choose a category"),
  date: dayField,
  paymentMethod: paymentMethodField,
  description: z.string().max(500, "Keep it under 500 characters"),
});

export type TxFormValues = z.infer<typeof txFormSchema>;

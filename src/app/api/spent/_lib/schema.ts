import z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .required();

export const LoginSchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .required();

export const itemSchema = z.object({
  amount: z.number(),
  description: z.string(),
  flags: z.string().nullable(),
  qty: z.number(),
  unitPrice: z.number(),
});

export const ReceiptSchema = z.object({
  merchantName: z.string(),
  merchantAddress: z.string().nullable(),
  merchantPhone: z.string().nullable(),
  merchantWebsite: z.string().nullable(),
  receiptNo: z.string(),
  date: z
    .string()
    .date("Date must be in the correct (and only accepted format): YYYY-MM-DD"),
  time: z.string().nullable(),
  items: z.array(itemSchema),
  currency: z.string(),
  total: z.number(),
  subtotal: z.number(),
  tax: z.number().nullable(),
  serviceCharge: z.string().nullable(),
  tip: z.number().nullable(),
});

export const ExpenseDateFilterSchema = z.object({
  startDate: z
    .string()
    .date("Input must be a valid date (Accepted format: YYYY-MM-DD"),
  endDate: z
    .string()
    .date("Input must be a valid date (Accepted format: YYYY-MM-DD"),
  categories: z.string().array().optional(),
  merchants: z.string().array().optional(),
  subCategories: z.string().array().optional(),
});

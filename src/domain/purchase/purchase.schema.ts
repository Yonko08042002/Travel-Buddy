import { z } from 'zod';

export const purchaseSchema = z.object({
  id: z.string(),
  stripePurchaseId: z.string(),
  amount: z.number(),
  userId: z.string(),
  tourId: z.string(),
  createdAt: z.date()
});

export const InsertPurchaseSchema = z.object({
  stripePurchaseId: z.string(),
  amount: z.number(),
  userId: z.string(),
  tourId: z.string()
});

export type InsertPurchase = z.infer<typeof InsertPurchaseSchema>;

export type Purchase = z.infer<typeof purchaseSchema>;

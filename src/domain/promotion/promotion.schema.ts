import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const promotionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date(),
  discountPercentage: z.number().transform((value) => new Prisma.Decimal(value))
});

export const AddPromotionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  startDate: z
    .string()
    .min(1, { message: 'Start date is required' })
    .transform((value) => new Date(value)),
  endDate: z
    .string()
    .min(1, { message: 'End date is required' })
    .transform((value) => new Date(value)),
  discountPercentage: z
    .number()
    .min(1, { message: 'Discount percentage is required' })
    .transform((value) => new Prisma.Decimal(value))
});

export type Promotion = z.infer<typeof promotionSchema>;

export type AddPromotionInputs = z.infer<typeof AddPromotionSchema>;

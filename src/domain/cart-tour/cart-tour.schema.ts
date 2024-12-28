import { z } from 'zod';

export const AddCartTourSchema = z.object({
  cartId: z.string().min(1, { message: 'cart ID is required' }),
  tourId: z.string().min(1, { message: 'Tour ID is required' })
});

export type AddCartTourInputs = z.infer<typeof AddCartTourSchema>;

import { z } from 'zod';

export const tourStyleSchema = z.object({
  id: z.string(),
  name: z.string()
});

export const AddTourStyleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' })
});

export type TourStyle = z.infer<typeof tourStyleSchema>;

export type AddTourStyleInputs = z.infer<typeof AddTourStyleSchema>;

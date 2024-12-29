import { z } from 'zod';

export const tourSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  tourType: z.enum(['PackageTour', 'DailyTour', 'TailorMadeTour']),
  tourStyleId: z.string(),
  timeStart: z.date().nullable()
});

export const AddTourSchema = z.object({
  image: z.string().min(1, { message: 'Image is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  duration: z.number().int().min(0, { message: 'Duration is required' }),
  price: z.number().int().min(0, { message: 'Price is required' }),
  tourType: z.enum(['PackageTour', 'DailyTour', 'TailorMadeTour']),
  tourStyleId: z.string().min(1, { message: 'Tour style is required' }),
  timeStart: z.string().transform((value) => new Date(value))
});

export const upsertTourSchema = AddTourSchema.extend({
  id: z.string().optional()
});

export type AddTourInputs = z.infer<typeof AddTourSchema>;

export type Tour = z.infer<typeof tourSchema>;

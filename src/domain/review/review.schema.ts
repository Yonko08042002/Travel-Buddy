import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().nullable(),
  createdAt: z.date(),
  text: z.string(),
  rating: z.number()
});

export type Review = z.infer<typeof reviewSchema>;

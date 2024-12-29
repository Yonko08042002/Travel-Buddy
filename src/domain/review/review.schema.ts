import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  tourId: z.string(),
  text: z.string(),
  rating: z.number()
});

export const InsertReviewSchema = z.object({
  text: z.string(),
  rating: z.number(),
  userId: z.string(),
  tourId: z.string()
});

export type InsertReview = z.infer<typeof InsertReviewSchema>;
export type Review = z.infer<typeof reviewSchema>;

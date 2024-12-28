import { z } from 'zod';

export const blogSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date(),
  image: z.string()
});

export const addBlogSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  createdAt: z.date().optional(),
  image: z.string().min(1, { message: 'Image is required' })
});

export const upsertBlogSchema = addBlogSchema.extend({
  id: z.string().optional()
});

export type AddBlogSchema = z.infer<typeof addBlogSchema>;

export type Blog = z.infer<typeof blogSchema>;

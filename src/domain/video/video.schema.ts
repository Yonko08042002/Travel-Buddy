import { z } from 'zod';

export const videoSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string()
});

export const AddVideoSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  link: z.string().min(1, { message: 'Link is required' })
});

export type Video = z.infer<typeof videoSchema>;

export type AddVideoInputs = z.infer<typeof AddVideoSchema>;

import { z } from 'zod';

export const destinationSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string()
});

export const AddDestinationSchema = z.object({
  image: z.string().min(1, { message: 'Image is required' }),
  title: z.string().min(1, { message: 'Link is required' }),
  description: z.string().min(1, { message: 'Description is required' })
});

export type Destination = z.infer<typeof destinationSchema>;

export type AddDestinationInputs = z.infer<typeof AddDestinationSchema>;

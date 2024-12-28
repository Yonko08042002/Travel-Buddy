import { z } from 'zod';

export const permissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string()
});

export const AddPermissionSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' })
});

export type Permission = z.infer<typeof permissionSchema>;

export type AddPermissionInputs = z.infer<typeof AddPermissionSchema>;

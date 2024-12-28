import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  password: z.string(),
  avatar: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
  userRoles: z.array(
    z.object({
      role: z.object({
        id: z.string(),
        name: z.string(),
        rolePermissions: z.array(
          z.object({
            permission: z.object({
              id: z.string(),
              name: z.string(),
              slug: z.string()
            })
          })
        )
      })
    })
  )
});

export const UpdateUserWithRolesSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  roleIds: z.array(z.string())
});

export interface CreateUserSchema {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  stripeCustomerId: string;
}

export type UpdateUserSchema = z.infer<typeof UpdateUserWithRolesSchema>;

export type User = z.infer<typeof userSchema>;

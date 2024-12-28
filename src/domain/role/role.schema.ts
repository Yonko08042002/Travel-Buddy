import { permissionSchema } from 'domain/permission/permission.schema';
import { z } from 'zod';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  rolePermissions: z.array(
    z.object({
      permissionId: z.string(),
      roleId: z.string(),
      permission: permissionSchema
    })
  )
});

export const AddRoleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' })
});

export const UpdateRoleWithPermissionsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  permissionIds: z.array(z.string())
});

export type AddRoleInputs = z.infer<typeof AddRoleSchema>;

export type Role = z.infer<typeof roleSchema>;

export interface InsertRole extends AddRoleInputs {
  permissionIds: string[];
}

import { z } from 'zod';

export const AddRolePermissionSchema = z.object({
  roleId: z.string().min(1, { message: 'Role ID is required' }),
  permissionId: z.string().min(1, { message: 'Permission ID is required' })
});

export type AddRolePermissionInputs = z.infer<typeof AddRolePermissionSchema>;

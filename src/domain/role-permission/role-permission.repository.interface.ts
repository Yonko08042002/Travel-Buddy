import type { DbTransactionClient } from 'infrastructure/database/prisma';
import type { AddRolePermissionInputs } from './role-permission.schema';

export interface IRolePermissionRepository {
  insertMany(
    values: AddRolePermissionInputs[],
    tx?: DbTransactionClient
  ): Promise<unknown>;

  deleteByRoleId(roleId: string, tx?: DbTransactionClient): Promise<unknown>;
}

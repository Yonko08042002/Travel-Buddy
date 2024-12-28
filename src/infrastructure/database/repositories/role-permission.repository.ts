import type { IRolePermissionRepository } from 'domain/role-permission/role-permission.repository.interface';
import type { AddRolePermissionInputs } from 'domain/role-permission/role-permission.schema';
import {
  type DbTransactionClient,
  prisma
} from 'infrastructure/database/prisma';

export class RolePermissionRepository implements IRolePermissionRepository {
  insertMany = (
    values: AddRolePermissionInputs[],
    tx?: DbTransactionClient
  ) => {
    const transaction = tx ?? prisma;

    return transaction.rolePermission.createMany({
      data: values
    });
  };

  deleteByRoleId = (roleId: string, tx?: DbTransactionClient) => {
    const transaction = tx ?? prisma;
    return transaction.rolePermission.deleteMany({ where: { roleId } });
  };
}

import type { IRoleRepository } from 'domain/role/role.repository.interface';
import type { InsertRole } from 'domain/role/role.schema';
import {
  type DbTransactionClient,
  prisma
} from 'infrastructure/database/prisma';
import { injectable } from 'inversify';
@injectable()
export class RoleRepository implements IRoleRepository {
  getAll = () => {
    return prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      }
    });
  };

  insert({ permissionIds, ...values }: InsertRole) {
    return prisma.role.create({
      data: {
        ...values,
        rolePermissions: {
          create: permissionIds.map((id) => ({ permissionId: id }))
        }
      }
    });
  }

  update(roleId: string, { permissionIds, ...values }: InsertRole) {
    return prisma.role.update({
      where: { id: roleId },
      data: {
        ...values,
        rolePermissions: {
          deleteMany: {
            permissionId: {
              notIn: permissionIds
            }
          },
          upsert: permissionIds.map((permissionId) => ({
            where: {
              permissionId_roleId: { permissionId: permissionId, roleId }
            },
            update: {
              permission: {
                connect: { id: permissionId }
              }
            },
            create: {
              permission: {
                connect: { id: permissionId }
              }
            }
          }))
        }
      }
    });
  }

  delete(id: string, tx?: DbTransactionClient) {
    const transaction = tx ?? prisma;

    return transaction.role.delete({ where: { id } });
  }
}

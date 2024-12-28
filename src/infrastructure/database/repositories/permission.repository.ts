import type { IPermissionRepository } from 'domain/permission/permission.repository.interface';
import type { AddPermissionInputs } from 'domain/permission/permission.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class PermissionRepository implements IPermissionRepository {
  getAll = () => {
    return prisma.permission.findMany();
  };

  insert(values: AddPermissionInputs) {
    return prisma.permission.create({
      data: values
    });
  }

  update(id: string, values: AddPermissionInputs) {
    return prisma.permission.update({
      where: { id },
      data: values
    });
  }

  delete(id: string) {
    return prisma.permission.delete({ where: { id } });
  }
}

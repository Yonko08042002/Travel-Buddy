import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { RolePermissionRepository } from 'infrastructure/database/repositories/role-permission.repository';
import type { IRolePermissionRepository } from 'domain/role-permission/role-permission.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IRolePermissionRepository>(DI_SYMBOLS.IRolePermissionRepository).to(
    RolePermissionRepository
  );
};

export const RolePermissionModule = new ContainerModule(initializeModule);

import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { IPermissionRepository } from 'domain/permission/permission.repository.interface';
import { PermissionRepository } from 'infrastructure/database/repositories/permission.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IPermissionRepository>(DI_SYMBOLS.IPermissionRepository).to(
    PermissionRepository
  );
};

export const PermissionModule = new ContainerModule(initializeModule);

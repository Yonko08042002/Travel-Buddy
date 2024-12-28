import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { RoleRepository } from 'infrastructure/database/repositories/role.repository';
import type { IRoleRepository } from 'domain/role/role.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IRoleRepository>(DI_SYMBOLS.IRoleRepository).to(RoleRepository);
};

export const RoleModule = new ContainerModule(initializeModule);

import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { UserRepository } from 'infrastructure/database/repositories/user.repository';
import type { IUserRepository } from 'domain/user/user.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository);
};

export const UserModule = new ContainerModule(initializeModule);

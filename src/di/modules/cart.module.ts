import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { ICartRepository } from 'domain/cart/cart.repository.interface';
import { CartRepository } from 'infrastructure/database/repositories/cart.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<ICartRepository>(DI_SYMBOLS.ICartRepository).to(CartRepository);
};

export const CartModule = new ContainerModule(initializeModule);

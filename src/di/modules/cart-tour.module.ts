import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { ICartTourRepository } from 'domain/cart-tour/cart-tour.repository.interface';
import { CartTourRepository } from 'infrastructure/database/repositories/cart-tour.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<ICartTourRepository>(DI_SYMBOLS.ICartTourRepository).to(
    CartTourRepository
  );
};

export const CartTourModule = new ContainerModule(initializeModule);

import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { IPurchaseRepository } from 'domain/purchase/purchase.repository.interface';
import { PurchaseRepository } from 'infrastructure/database/repositories/purchase.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IPurchaseRepository>(DI_SYMBOLS.IPurchaseRepository).to(
    PurchaseRepository
  );
};

export const PurchaseModule = new ContainerModule(initializeModule);

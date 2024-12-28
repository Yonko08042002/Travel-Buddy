import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { IPromotionRepository } from 'domain/promotion/promotion.repository.interface';
import { PromotionRepository } from 'infrastructure/database/repositories/promotion.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IPromotionRepository>(DI_SYMBOLS.IPromotionRepository).to(
    PromotionRepository
  );
};

export const PromotionModule = new ContainerModule(initializeModule);

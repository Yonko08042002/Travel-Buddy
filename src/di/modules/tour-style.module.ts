import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { TourStyleRepository } from 'infrastructure/database/repositories/tour-style.repository';
import type { ITourStyleRepository } from 'domain/tour-style/tour-style.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITourStyleRepository>(DI_SYMBOLS.ITourStyleRepository).to(
    TourStyleRepository
  );
};

export const TourStyleModule = new ContainerModule(initializeModule);

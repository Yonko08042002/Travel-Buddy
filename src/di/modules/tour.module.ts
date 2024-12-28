import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { TourRepository } from 'infrastructure/database/repositories/tour.repository';
import type { ITourRepository } from 'domain/tour/tour.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITourRepository>(DI_SYMBOLS.ITourRepository).to(TourRepository);
};

export const TourModule = new ContainerModule(initializeModule);

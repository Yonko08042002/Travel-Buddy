import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import type { IDestinationRepository } from 'domain/destination/destination.repository.interface';
import { DestinationRepository } from 'infrastructure/database/repositories/destination.repository';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IDestinationRepository>(DI_SYMBOLS.IDestinationRepository).to(
    DestinationRepository
  );
};

export const DestinationModule = new ContainerModule(initializeModule);

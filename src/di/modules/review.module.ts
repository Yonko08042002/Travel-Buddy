import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { ReviewRepository } from 'infrastructure/database/repositories/review.repository';
import type { IReviewRepository } from 'domain/review/review.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IReviewRepository>(DI_SYMBOLS.IReviewRepository).to(ReviewRepository);
};

export const ReviewModule = new ContainerModule(initializeModule);

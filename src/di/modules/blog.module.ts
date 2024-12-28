import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { BlogRepository } from 'infrastructure/database/repositories/blog.repository';
import type { IBlogRepository } from 'domain/blog/blog.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IBlogRepository>(DI_SYMBOLS.IBlogRepository).to(BlogRepository);
};

export const BlogModule = new ContainerModule(initializeModule);

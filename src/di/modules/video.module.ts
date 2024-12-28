import { ContainerModule, type interfaces } from 'inversify';

import { DI_SYMBOLS } from '../types';
import { VideoRepository } from 'infrastructure/database/repositories/video.repository';
import type { IVideoRepository } from 'domain/video/video.repository.interface';

const initializeModule = (bind: interfaces.Bind) => {
  bind<IVideoRepository>(DI_SYMBOLS.IVideoRepository).to(VideoRepository);
};

export const VideoModule = new ContainerModule(initializeModule);

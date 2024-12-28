import type { AddVideoInputs, Video } from './video.schema';

export interface IVideoRepository {
  getAll(): Promise<Video[]>;
  insert(addVideoSchema: AddVideoInputs): Promise<Video | undefined>;
  update(id: string, updateVideoSchema: AddVideoInputs): Promise<Video>;
  delete(id: string, tx?: unknown): Promise<Video>;
}

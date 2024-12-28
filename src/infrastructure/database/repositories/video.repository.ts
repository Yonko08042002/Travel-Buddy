import { prisma } from 'infrastructure/database/prisma';
import type { AddVideoInputs } from 'domain/video/video.schema';
import type { IVideoRepository } from 'domain/video/video.repository.interface';
import { injectable } from 'inversify';

@injectable()
export class VideoRepository implements IVideoRepository {
  getAll() {
    return prisma.video.findMany();
  }

  insert(addVideoInputs: AddVideoInputs) {
    return prisma.video.create({
      data: addVideoInputs
    });
  }

  update(id: string, addVideoInputs: AddVideoInputs) {
    return prisma.video.update({
      where: { id },
      data: addVideoInputs
    });
  }

  delete(id: string) {
    return prisma.video.delete({
      where: { id }
    });
  }
}

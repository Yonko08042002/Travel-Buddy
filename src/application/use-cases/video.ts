'use server';
import { revalidatePath } from 'next/cache';
import type { AddVideoInputs } from 'domain/video/video.schema';
import { getInjection } from 'di/container';

export const getVideos = async () => {
  const videoRepository = getInjection('IVideoRepository');
  return await videoRepository.getAll();
};

interface UpsertVideo extends AddVideoInputs {
  id?: string;
}

export const upsertVideo = async ({ id, ...rest }: UpsertVideo) => {
  const videoRepository = getInjection('IVideoRepository');
  if (id) {
    await videoRepository.update(id, { ...rest });
  } else {
    await videoRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deleteVideo = async (id: string) => {
  const videoRepository = getInjection('IVideoRepository');

  await videoRepository.delete(id);

  revalidatePath('/');
};

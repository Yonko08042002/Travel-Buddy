'use server';
import { getInjection } from 'di/container';
import type { AddTourInputs } from 'domain/tour/tour.schema';
import { revalidatePath } from 'next/cache';

export const getBestSellerTours = async () => {
  const TourRepository = getInjection('ITourRepository');
  return await TourRepository.getAll();
};

export const getTourById = async (id: string) => {
  const TourRepository = getInjection('ITourRepository');

  return await TourRepository.getById(id);
};

export type Tour = Awaited<ReturnType<typeof getTourById>>;

interface UpsertTour extends AddTourInputs {
  id?: string;
}

export const upsertTour = async ({ id, ...rest }: UpsertTour) => {
  const TourRepository = getInjection('ITourRepository');

  if (id) {
    await TourRepository.update(id, { ...rest });
  } else {
    await TourRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deleteTour = async (id: string) => {
  const TourRepository = getInjection('ITourRepository');

  await TourRepository.delete(id);

  revalidatePath('/');
};

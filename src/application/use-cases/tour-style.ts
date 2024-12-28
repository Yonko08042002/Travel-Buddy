'use server';
import { getInjection } from 'di/container';
import type { AddTourStyleInputs } from 'domain/tour-style/tour-style.schema';
import { revalidatePath } from 'next/cache';

export const getTourStyles = async () => {
  const TourStyleRepository = getInjection('ITourStyleRepository');

  return await TourStyleRepository.getAll();
};

interface UpsertTourStyle extends AddTourStyleInputs {
  id?: string;
}

export const upsertTourStyle = async ({ id, ...rest }: UpsertTourStyle) => {
  const tourStyleRepository = getInjection('ITourStyleRepository');
  if (id) {
    await tourStyleRepository.update(id, { ...rest });
  } else {
    await tourStyleRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deleteTourStyle = async (id: string) => {
  const tourStyleRepository = getInjection('ITourStyleRepository');

  await tourStyleRepository.delete(id);

  revalidatePath('/');
};

'use server';
import { revalidatePath } from 'next/cache';
import type { AddDestinationInputs } from 'domain/destination/destination.schema';
import { getInjection } from 'di/container';

export const getDestinations = async () => {
  const destinationRepository = getInjection('IDestinationRepository');
  return await destinationRepository.getAll();
};

interface UpsertDestination extends AddDestinationInputs {
  id?: string;
}

export const upsertDestination = async ({ id, ...rest }: UpsertDestination) => {
  const destinationRepository = getInjection('IDestinationRepository');

  if (id) {
    await destinationRepository.update(id, { ...rest });
  } else {
    await destinationRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deleteDestination = async (id: string) => {
  const destinationRepository = getInjection('IDestinationRepository');

  await destinationRepository.delete(id);

  revalidatePath('/');
};

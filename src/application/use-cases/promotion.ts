'use server';
import { revalidatePath } from 'next/cache';
import { getInjection } from 'di/container';
import type { AddPromotionInputs } from 'domain/promotion/promotion.schema';

export const getPromotions = async () => {
  const promotionRepository = getInjection('IPromotionRepository');
  return await promotionRepository.getAll();
};

interface UpsertPromotion extends AddPromotionInputs {
  id?: string;
}

export const upsertPromotion = async ({ id, ...rest }: UpsertPromotion) => {
  const promotionRepository = getInjection('IPromotionRepository');

  if (id) {
    await promotionRepository.update(id, { ...rest });
  } else {
    await promotionRepository.insert({ ...rest });
  }
  revalidatePath('/');
};

export const deletePromotion = async (id: string) => {
  const promotionRepository = getInjection('IPromotionRepository');

  await promotionRepository.delete(id);

  revalidatePath('/');
};

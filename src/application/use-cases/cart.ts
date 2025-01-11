'use server';

import { getInjection } from 'di/container';
import { getServerSession } from 'next-auth';
import { authOptions } from 'shared/helpers/auth';
import { getMe } from './user';
import { revalidatePath } from 'next/cache';

export const getCartByUser = async () => {
  const cartRepository = getInjection('ICartRepository');
  const session = await getServerSession(authOptions);
  if (!session) return null;
  return await cartRepository.getCartById(session?.user.id);
};

export const getCartToursByUserId = async (userId: string) => {
  const cartRepository = getInjection('ICartRepository');

  return await cartRepository.getCartToursByUserId(userId);
};
export const addTourToCart = async (tourId: string, amount: number) => {
  const cartRepository = getInjection('ICartRepository');
  const user = await getMe();
  if (!user) return null;
  return await cartRepository.addTourToCart(user.id, tourId, amount);
};

export const removeTourFromCart = async (tourId: string) => {
  const cartRepository = getInjection('ICartRepository');
  const user = await getMe();
  if (!user) throw new Error('User not authenticated');

  await cartRepository.removeTourFromCart(user.id, tourId);

  revalidatePath('/cart');
};

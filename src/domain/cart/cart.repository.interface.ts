import type { Cart, CartTour } from '@prisma/client';

export interface ICartRepository {
  getCartById(id: string): Promise<Cart | null>;
  getCartToursByUserId(userId: string): Promise<CartTour[] | null>;
  addTourToCart(
    userId: string,
    tourId: string,
    amount: number
  ): Promise<CartTour>;
  removeTourFromCart(userId: string, tourId: string): Promise<void>;
  updateTourAmount(
    userId: string,
    tourId: string,
    amount: number
  ): Promise<CartTour>;
}

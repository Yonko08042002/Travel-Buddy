import type { ICartTourRepository } from 'domain/cart-tour/cart-tour.repository.interface';
import type { AddCartTourInputs } from 'domain/cart-tour/cart-tour.schema';
import {
  type DbTransactionClient,
  prisma
} from 'infrastructure/database/prisma';

export class CartTourRepository implements ICartTourRepository {
  insertMany = (values: AddCartTourInputs[], tx?: DbTransactionClient) => {
    const transaction = tx ?? prisma;

    return transaction.cartTour.createMany({
      data: values
    });
  };

  deleteById = (cartId: string, tx?: DbTransactionClient) => {
    const transaction = tx ?? prisma;
    return transaction.cartTour.deleteMany({ where: { cartId } });
  };
}

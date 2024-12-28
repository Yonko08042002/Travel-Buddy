import type { DbTransactionClient } from 'infrastructure/database/prisma';
import type { AddCartTourInputs } from './cart-tour.schema';

export interface ICartTourRepository {
  insertMany(
    values: AddCartTourInputs[],
    tx?: DbTransactionClient
  ): Promise<unknown>;

  deleteById(CartId: string, tx?: DbTransactionClient): Promise<unknown>;
}

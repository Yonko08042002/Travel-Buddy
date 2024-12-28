import type { InsertPurchase, Purchase } from './purchase.schema';

export interface IPurchaseRepository {
  insert(data: InsertPurchase): Promise<Purchase>;
}

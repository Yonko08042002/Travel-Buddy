import type { InsertPurchase, Purchase } from './purchase.schema';

export interface IPurchaseRepository {
  insert(data: InsertPurchase): Promise<Purchase>;
  getPurchaseByIdUser(id: string): Promise<Purchase[] | null>;
}

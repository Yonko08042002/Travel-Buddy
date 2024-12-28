import type { IPurchaseRepository } from 'domain/purchase/purchase.repository.interface';
import type { InsertPurchase } from 'domain/purchase/purchase.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class PurchaseRepository implements IPurchaseRepository {
  insert(values: InsertPurchase) {
    return prisma.purchase.create({
      data: values
    });
  }
}

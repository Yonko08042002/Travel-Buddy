import type { IPromotionRepository } from 'domain/promotion/promotion.repository.interface';
import type { AddPromotionInputs } from 'domain/promotion/promotion.schema';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class PromotionRepository implements IPromotionRepository {
  getAll() {
    return prisma.promotion.findMany();
  }

  insert(addPromotionInputs: AddPromotionInputs) {
    return prisma.promotion.create({
      data: addPromotionInputs
    });
  }

  update(id: string, addPromotionInputs: AddPromotionInputs) {
    return prisma.promotion.update({
      where: { id },
      data: addPromotionInputs
    });
  }

  delete(id: string) {
    return prisma.promotion.delete({ where: { id } });
  }
}

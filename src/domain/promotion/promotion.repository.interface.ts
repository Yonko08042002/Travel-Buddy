import type { AddPromotionInputs, Promotion } from './promotion.schema';

export interface IPromotionRepository {
  getAll(): Promise<Promotion[]>;
  insert(createPromotionSchema: AddPromotionInputs): Promise<Promotion>;
  update(id: string, updatePromotion: AddPromotionInputs): Promise<Promotion>;
  delete(id: string): Promise<Promotion>;
}

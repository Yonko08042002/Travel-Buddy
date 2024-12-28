import type { Review } from './review.schema';

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
}

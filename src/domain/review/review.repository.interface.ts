import type { InsertReview, Review } from './review.schema';

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  insert(data: InsertReview): Promise<Review>;
}

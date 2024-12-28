import type { IReviewRepository } from 'domain/review/review.repository.interface';
import { prisma } from 'infrastructure/database/prisma';
import { injectable } from 'inversify';

@injectable()
export class ReviewRepository implements IReviewRepository {
  getAll = () => {
    return prisma.review.findMany();
  };
}

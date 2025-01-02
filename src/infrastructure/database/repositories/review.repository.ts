import type { IReviewRepository } from "domain/review/review.repository.interface";
import type { InsertReview } from "domain/review/review.schema";
import { prisma } from "infrastructure/database/prisma";
import { injectable } from "inversify";

@injectable()
export class ReviewRepository implements IReviewRepository {
  getAll = () => {
    return prisma.review.findMany();
  };

  insert = async (data: InsertReview) => {
    return await prisma.review.create({
      data,
    });
  };
  getByTourId = async (tourId: string) => {
    return await prisma.review.findMany({
      where: {
        tourId,
      },
    });
  };
}

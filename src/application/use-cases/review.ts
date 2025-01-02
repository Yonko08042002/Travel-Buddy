"use server";

import { getInjection } from "di/container";
import type { InsertReview } from "domain/review/review.schema";

export const getReviews = async () => {
  const reviewRepository = getInjection("IReviewRepository");
  return await reviewRepository.getAll();
};
export const getReviewByTourId = async (id: string) => {
  const reviewRepository = getInjection("IReviewRepository");
  return await reviewRepository.getByTourId(id);
};

export const insertReview = async (data: InsertReview) => {
  const reviewRepository = getInjection("IReviewRepository");
  return await reviewRepository.insert(data);
};

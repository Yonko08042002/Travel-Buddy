'use server';

import { getInjection } from 'di/container';

export const getReviews = async () => {
  const reviewRepository = getInjection('IReviewRepository');
  return await reviewRepository.getAll();
};

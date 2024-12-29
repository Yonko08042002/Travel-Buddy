import { getMe } from 'application/use-cases/user';
import { getInjection } from 'di/container';
import type { InsertReview } from 'domain/review/review.schema';
import {
  internalServerErrorResponse,
  successResponse
} from 'shared/helpers/response';

export const POST = async (req: Request): Promise<Response> => {
  try {
    const user = await getMe();
    if (!user) {
      console.error('User not found');
      return internalServerErrorResponse('User not found');
    }

    const body = await req.json();
    if (!body) {
      console.error('Request body is null or undefined');
      return internalServerErrorResponse('Invalid request body');
    }

    const { tourId, text, rating } = body;

    // Validate input
    if (
      !tourId ||
      typeof text !== 'string' ||
      text.trim() === '' ||
      typeof rating !== 'number' ||
      rating <= 0 ||
      rating > 5
    ) {
      console.error('Invalid input:', { tourId, text, rating });
      return internalServerErrorResponse(
        'Invalid input: tourId, text (non-empty string), and rating (1-5) are required'
      );
    }

    const reviewRepository = getInjection('IReviewRepository');
    if (!reviewRepository) {
      console.error('Review repository injection failed');
      return internalServerErrorResponse('Review repository not found');
    }

    const reviewData: InsertReview = {
      userId: user.id,
      tourId,
      text,
      rating
    };

    console.log('Inserting review:', reviewData);

    const review = await reviewRepository.insert(reviewData);

    // Ensure the review is valid
    if (!review) {
      console.error('Review insertion returned null or undefined');
      return internalServerErrorResponse('Failed to insert review');
    }

    console.log('Inserted review data:', review);

    return successResponse({ review }); // Wrap the review in an object
  } catch (error) {
    console.error('Error in POST handler:', error);
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    return internalServerErrorResponse('An unexpected error occurred');
  }
};

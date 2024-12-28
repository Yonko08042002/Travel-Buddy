import {
  internalServerErrorResponse,
  successResponse
} from 'shared/helpers/response';
import { getInjection } from 'di/container';

export const GET = async () => {
  try {
    const TourStyleRepository = getInjection('ITourStyleRepository');
    const tourStyle = await TourStyleRepository.getAll();

    return successResponse(tourStyle);
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};

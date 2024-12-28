import {
  internalServerErrorResponse,
  successResponse
} from 'shared/helpers/response';
import { getInjection } from 'di/container';

export const GET = async () => {
  try {
    const roleRepository = getInjection('IRoleRepository');
    const roles = await roleRepository.getAll();

    return successResponse(roles);
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};

import {
  internalServerErrorResponse,
  successResponse
} from 'shared/helpers/response';
import { getInjection } from 'di/container';

export const GET = async () => {
  try {
    const permissionRepository = getInjection('IPermissionRepository');
    const permissions = await permissionRepository.getAll();

    return successResponse(permissions);
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};

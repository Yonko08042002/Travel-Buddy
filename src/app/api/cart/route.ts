import {
  badRequestResponse,
  internalServerErrorResponse,
  successResponse,
} from "shared/helpers/response";
import { getInjection } from "di/container";
import { getMe } from "application/use-cases/user";

export const GET = async () => {
  try {
    const user = await getMe();

    if (!user) {
      return internalServerErrorResponse("User not found");
    }
    const cartRepository = getInjection("ICartRepository");
    const cart = await cartRepository.getCartById(user.id);

    return successResponse(cart);
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};

export const POST = async (req: Request) => {
  try {
    const user = await getMe();
    if (!user) {
      return internalServerErrorResponse("User not found");
    }

    const body = await req.json();
    const { tourId, amount } = body;

    if (!tourId || typeof amount !== "number" || amount <= 0) {
      return badRequestResponse("Invalid tourId or amount");
    }

    const cartRepository = getInjection("ICartRepository");

    const cartTour = await cartRepository.addTourToCart(
      user.id,
      tourId,
      amount
    );

    return successResponse(cartTour);
  } catch (error) {
    console.error("Error in POST /api/cart:", error);
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    return internalServerErrorResponse("An unexpected error occurred");
  }
};

export const PATCH = async (req: Request) => {
  try {
    // Lấy thông tin user hiện tại
    const user = await getMe();
    if (!user) {
      return internalServerErrorResponse("User not found");
    }

    const body = await req.json();

    const { tourId, amount } = body;

    const cartRepository = getInjection("ICartRepository");
    const cartTour = await cartRepository.updateTourToCart(
      user.id,
      tourId,
      amount
    );

    return successResponse(cartTour);
  } catch (error) {
    console.error("Error in PATCH /api/cart:", error);
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    return internalServerErrorResponse("An unexpected error occurred");
  }
};


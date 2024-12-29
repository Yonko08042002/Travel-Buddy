import { getCartToursByUserId } from 'application/use-cases/cart';
import { getTourById } from 'application/use-cases/tour';
import { getMe } from 'application/use-cases/user';

import {
  internalServerErrorResponse,
  successResponse
} from 'shared/helpers/response';
import config from 'shared/lib/config';
import stripe from 'shared/lib/stripe';

export const POST = async () => {
  try {
    const user = await getMe();
    if (!user?.stripeCustomerId) {
      return internalServerErrorResponse(
        'User not found or missing Stripe customer ID'
      );
    }

    const carts = await getCartToursByUserId(user.id);
    if (!carts || carts.length === 0) {
      return internalServerErrorResponse('No tours selected for payment');
    }

    const listTour = await Promise.all(
      carts.map(async (cart) => {
        const tour = await getTourById(cart.tourId);
        return { ...tour, amount: cart.amount };
      })
    );

    const lineItems = listTour.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item?.title || '', images: [item?.image || ''] },
        unit_amount: Math.round(item.price || 1) / 250
      },
      quantity: item.amount || 1
    }));

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${config.NEXT_PUBLIC_APP_URL}/checkout/success`,
      cancel_url: `${config.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        userId: user.id,
        tourIds: carts.map((cart) => cart.tourId).join(','),
        amount: listTour.map((cart) => cart.amount).join(',')
      }
    });

    return successResponse({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Error during checkout:', error);
    return internalServerErrorResponse(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
};

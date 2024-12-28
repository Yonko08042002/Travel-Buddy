import { getCartToursByUserId } from "application/use-cases/cart";
import { getTourById } from "application/use-cases/tour";
import { getMe } from "application/use-cases/user";
import { Checkout } from "presentation/checkout/containers/Checkout";
import { internalServerErrorResponse } from "shared/helpers/response";

export const metadata = {
  title: "Checkout Page",
};

export default async function CheckoutPage() {
  const me = await getMe();

  if (!me) return null;
  const carts = await getCartToursByUserId(me.id);

  if (!carts) {
    return internalServerErrorResponse("No tours selected for payment");
  }

  const listTour = await Promise.all(
    carts.map(async (cart) => {
      const tour = await getTourById(cart.tourId);
      return {
        ...tour,
        amount: cart.amount,
      };
    })
  );
  return <Checkout items={listTour} />;
}

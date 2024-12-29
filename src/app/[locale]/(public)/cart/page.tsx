import { getCartToursByUserId } from "application/use-cases/cart";
import { getTourById } from "application/use-cases/tour";
import { getMe } from "application/use-cases/user";
import { CartList } from "presentation/cart/containers/CartList";
import { internalServerErrorResponse } from "shared/helpers/response";

export const metadata = {
  title: "Cart Page",
};

export default async function CartPage() {
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
  console.log(listTour);

  return <CartList carts={listTour} />;
}

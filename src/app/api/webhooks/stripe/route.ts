import { getInjection } from "di/container";
import config from "shared/lib/config";
import stripe from "shared/lib/stripe";
import type Stripe from "stripe";

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userRepository = getInjection("IUserRepository");
  const purchaseRepository = getInjection("IPurchaseRepository");
  const cartRepository = getInjection("ICartRepository");

  const tourIds = session.metadata?.tourIds?.split(",") || [];
  const stripeCustomerId = session.customer as string;
  const userId = session.metadata?.userId;
  const amounts = session.metadata?.amount?.split(",") || [];

  if (!(tourIds.length && stripeCustomerId && userId)) {
    throw new Error(
      "Missing required metadata (tourIds, stripeCustomerId, userId)"
    );
  }

  const user = await userRepository.getUserByStripeCustomerId(stripeCustomerId);
  if (!user) {
    throw new Error("User not found");
  }

  if (amounts.length !== tourIds.length) {
    throw new Error("Mismatch between number of amounts and tour IDs");
  }
  await Promise.all(
    tourIds.map((tourId, index) => {
      const amount = Math.round(Number(amounts[index]));
      return purchaseRepository.insert({
        userId,
        tourId,
        amount,
        stripePurchaseId: session.id,
      });
    })
  );

  await Promise.all(
    tourIds.map((tourId) => cartRepository.removeTourFromCart(userId, tourId))
  );

  if (session.metadata?.tourTitle && session.metadata?.tourImage) {
    console.info("Send email to user with tour details");
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed.", err.message);
    }

    return new Response("Webhook signature verification failed.", {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      default:
        console.info(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error) {
    console.error(`Error processing webhook (${event.type}):`, error);
    return new Response("Error processing webhook", { status: 400 });
  }

  return new Response(null, { status: 200 });
}

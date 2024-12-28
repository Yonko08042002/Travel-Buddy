import { RegisterSchema } from "application/schemas/register";
import { hashPassword } from "shared/helpers/hash";
import {
  conflictResponse,
  createdResponse,
  internalServerErrorResponse,
} from "shared/helpers/response";
import { getInjection } from "di/container";
import stripe from "shared/lib/stripe";

export const POST = async (request: Request) => {
  const UserRepository = getInjection("IUserRepository");

  try {
    const body = await request.json();

    const { name, email, password } = RegisterSchema.parse(body);

    const user = await UserRepository.getUserByEmail(email);
    if (user) {
      return conflictResponse("User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const customer = await stripe.customers.create({
      email: email,
    });

    await UserRepository.insert({
      name: name,
      email,
      password: hashedPassword,
      stripeCustomerId: customer.id,
    });

    return createdResponse({
      message: "User created successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return internalServerErrorResponse(error.message);
    }
    throw error;
  }
};

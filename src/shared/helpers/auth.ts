import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { comparePassword, hashPassword } from "shared/helpers/hash";
import config from "shared/lib/config";
import { LoginSchema } from "application/schemas/login";
import { getUserByEmail, insertUser } from "application/use-cases/user";
import stripe from "shared/lib/stripe";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: config.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ user, token }) {
      token.userRoles = user?.userRoles ?? [];

      return token;
    },
  },
  providers: [
    GitHubProvider({
      clientId: config.GITHUB_ID,
      clientSecret: config.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: config.FACEBOOK_CLIENT_ID,
      clientSecret: config.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: config.GOOGLE_ID,
      clientSecret: config.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = LoginSchema.parse(credentials);

          const user = await getUserByEmail(email);

          if (!user) {
            throw new Error("Invalid credentials!");
          }

          const isPasswordCorrect = await comparePassword(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials!");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            userRoles: user.userRoles,
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message || "An error occurred!");
          }
          return null;
        }
      },
    }),
  ],
  events: {
    async signIn({ user, account }) {
      try {
        if (account?.type === "credentials" || !user.email) return;

        const userToCheck = await getUserByEmail(user.email);

        if (!userToCheck) {
          const password = crypto.randomUUID();

          const hashedPassword = await hashPassword(password);

          const customer = await stripe.customers.create({
            email: user.email,
            name: user.name || undefined,
          });

          await insertUser({
            name: user.name || "",
            email: user.email,
            password: hashedPassword,
            avatar: user.image,
            stripeCustomerId: customer.id,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};

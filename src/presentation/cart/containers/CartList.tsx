"use client";

import type { TourStyle } from "@prisma/client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "shared/components/atoms/button";

interface CartItem {
  amount: number | null;
  id?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  duration?: number | undefined;
  tourStyleId?: string | undefined;
  timeStart?: Date;
}

interface CartListProps {
  carts: CartItem[];
}

export function CartList({ carts }: CartListProps) {
  if (!carts || carts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }
  const t = useTranslations();

  return (
    <div className="h-screen p-8 flex gap-2">
      <ul className="space-y-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto">
        {carts.map((cart) => (
          <li
            key={cart.id}
            className="border p-4 rounded-md flex gap-4 items-center"
          >
            <img
              src={cart.image}
              alt={cart.title}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{cart.title}</h3>
              <p className="text-sm text-gray-600">{cart.description}</p>
              <p>Price: ${cart.price}</p>
              <p>Amount: {cart.amount}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        <Link href="/checkout">
          <Button>{t("buttonWeb.check_out")}</Button>
        </Link>
      </div>
    </div>
  );
}

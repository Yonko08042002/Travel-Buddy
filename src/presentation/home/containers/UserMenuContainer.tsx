"use client";
import React, { useEffect, useState } from "react";
import { getMe } from "application/use-cases/user";
import { getCartToursByUserId } from "application/use-cases/cart";
import { UserMenu } from "shared/components/organisms/UserMenu";

import Link from "next/link";
import SizeGoods from "../components/SizeGoods";
import DropMenu from "../components/DropMenu";

const UserMenuContainer = () => {
  const [me, setMe] = useState<{
    id: string;
    email: string;
    name: string | null;
    password: string;
    avatar: string | null;
    stripeCustomerId: string | null;
    userRoles: {
      role: {
        id: string;
        name: string;
        rolePermissions: {
          permission: { id: string; name: string; slug: string };
        }[];
      };
    }[];
  } | null>(null);
  const [carts, setCarts] = useState<
    { cartId: string; tourId: string; amount: number | null }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getMe();
        setMe(user);

        if (user) {
          const userCarts = await getCartToursByUserId(user.id);
          setCarts(userCarts || []);
        }
      } catch (err) {
        setError("Failed to fetch user or cart data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!me) {
    return (
      <div className="flex gap-1 lg:gap-3 items-center">
        <SizeGoods />
        <DropMenu />
      </div>
    );
  }

  return (
    <div className="flex gap-1 lg:gap-8 items-center">
      <Link className="relative" href="/cart">
        <span className="absolute text-white bg-red-500 rounded-full size-5 flex justify-center items-center top-[-15px] right-[-10px] text-xs">
          {carts.length}
        </span>
        <SizeGoods />
      </Link>
      <UserMenu user={me} />
    </div>
  );
};

export default UserMenuContainer;

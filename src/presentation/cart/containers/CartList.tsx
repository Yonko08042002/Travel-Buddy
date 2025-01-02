"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "shared/components/atoms/button";
import { Input } from "shared/components/atoms/input";

interface CartItem {
  amount: number | null;
  id?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

interface CartListProps {
  carts: CartItem[];
}

interface UpdateForm {
  amount: number;
}

export function CartList({ carts }: CartListProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState<string | null>(null); // Track item đang loading
  const [error, setError] = useState<string | null>(null); // Thông báo lỗi

  if (!carts || carts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<UpdateForm> = async (data, event) => {
    const formElement = event?.target as HTMLFormElement;
    const tourId = formElement?.dataset?.tourId;

    if (!tourId) return;

    setLoading(tourId);
    setError(null);

    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourId,
          amount: data.amount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to update cart");
      }

      // Lấy lại dữ liệu từ server (đảm bảo UI hiển thị giá trị chính xác)
      const updatedCartTour = await response.json();
      carts = carts.map((cart) =>
        cart.id === tourId ? { ...cart, amount: updatedCartTour.amount } : cart
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="h-screen p-8 flex gap-2">
      <ul className="space-y-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto">
        {carts.map((cart) => {
          const { register, handleSubmit, setValue, getValues, formState } =
            useForm<UpdateForm>({
              defaultValues: {
                amount: cart.amount || 1,
              },
            });

          const changeAmount = (amountChange: number) => {
            const currentAmount = getValues("amount");
            const newAmount = Math.max(1, currentAmount + amountChange); // Đảm bảo giá trị >= 1
            setValue("amount", newAmount); // Cập nhật giá trị
          };

          return (
            <form
              onSubmit={handleSubmit(onSubmit)}
              data-tour-id={cart.id} // Gắn tourId để lấy trong submit handler
              key={cart.id}
              className="border p-4 rounded-md flex gap-4 items-center"
            >
              <img
                src={cart.image}
                alt={cart.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 w-5/6">
                  {" "}
                  <h3 className="font-semibold text-lg">{cart.title}</h3>
                  <p className="text-sm text-gray-600">{cart.description}</p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <Button
                      type="submit"
                      onClick={() => changeAmount(-1)}
                      disabled={loading === cart.id} // Disable khi loading
                    >
                      -
                    </Button>

                    <Input
                      className="w-16 text-center"
                      id="amount"
                      {...register("amount", {
                        valueAsNumber: true,
                        required: "Amount is required",
                        min: { value: 1, message: "Amount must be at least 1" },
                      })}
                      type="number"
                      disabled={loading === cart.id}
                    />

                    <Button type="submit" onClick={() => changeAmount(1)}>
                      +
                    </Button>
                  </div>
                  <p className="text-red-500">
                    {t("Cart_tour.price")}: {cart.price} VND
                  </p>
                  {formState.errors.amount && (
                    <p className="text-sm mt-2 text-red-500">
                      {formState.errors.amount.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          );
        })}
      </ul>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}{" "}
      {/* Thông báo lỗi */}
      <div className="text-right mt-4">
        <Link href="/checkout">
          <Button>{t("buttonWeb.check_out")}</Button>
        </Link>
      </div>
    </div>
  );
}

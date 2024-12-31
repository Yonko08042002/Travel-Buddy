"use client";

import { useForm } from "react-hook-form";
import { Button } from "shared/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "shared/components/atoms/card";
import { Input } from "shared/components/atoms/input";
import { Label } from "shared/components/atoms/label";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function BookingCard({ tourId }: { tourId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{ amount: number }>({
    defaultValues: {
      amount: 1,
    },
  });

  const changeAmount = (amountChange: number) => {
    const currentAmount = getValues("amount");
    setValue("amount", Math.max(1, currentAmount + amountChange));
  };

  const onSubmit = async (data: { amount: number }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({
          tourId,
          amount: data.amount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Failed to add tour to cart");
      }
      const successMessage = "Tour added to cart successfully!";
      setSuccess(successMessage);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-max md:min-w-48 lg:max-w-96 rounded-lg shadow-lg">
      <CardHeader className="w-full font-semibold text-xl">
        <p className="w-full">Booking Travel</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 justify-start ">
            <Label htmlFor="amount" className="text-left">
              {t("Cart_tour.Amount")}:
            </Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => changeAmount(-1)}
                disabled={loading}
              >
                -
              </Button>

              <Input
                id="amount"
                {...register("amount", {
                  valueAsNumber: true,
                  required: "Amount is required",
                  min: { value: 1, message: "Amount must be at least 1" },
                })}
                type="number"
                disabled={loading}
              />

              <Button
                type="button"
                onClick={() => changeAmount(1)}
                disabled={loading}
              >
                +
              </Button>
            </div>
            {errors.amount && (
              <p className="text-sm mt-2 text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? `${t("buttonWeb.placing")}...`
              : `${t("buttonWeb.book_now")}`}
          </Button>
        </CardFooter>
      </form>
      {success && (
        <p className="text-sm mt-2 text-green-500 text-center">{success}</p>
      )}
      {error && (
        <p className="text-sm mt-2 text-red-500 text-center">{error}</p>
      )}
    </Card>
  );
}

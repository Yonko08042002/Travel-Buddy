"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "shared/components/atoms/textarea";
import { Label } from "shared/components/atoms/label";
import StarRating from "../container/StartRating";
import { toast } from "sonner";
import { LoadingButton } from "shared/components/molecules/LoadingButton";
import { SendHorizontal } from "lucide-react";

export default function ReviewTourForm({ tourId }: { tourId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<{ text: string; rating: number }>({
    defaultValues: {
      text: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: { text: string; rating: number }) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, tourId }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Something went wrong!");
      }

      setMessage({ type: "success", text: "Review submitted successfully!" });
      toast.success("Review submitted successfully!");
      setValue("text", "");
      setValue("rating", 0);
    } catch {
      toast.error("You need to login");
      // window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full border rounded-md shadow">
      <h2 className="text-lg font-bold mb-4">Submit Your Review</h2>
      {message && (
        <p
          className={`text-sm mb-4 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="text" className="block text-sm font-medium">
            Comment:
          </Label>
          <Textarea
            id="text"
            {...register("text", {
              required: "Comment is required.",
            })}
          />
          {errors.text && (
            <p className="text-sm mt-2 text-red-500">{errors.text.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <div>
            <Label htmlFor="rating" className="block text-sm font-medium">
              Rating (1-5):
            </Label>
            <StarRating
              size={20}
              rating={getValues("rating")}
              onChange={(value) => setValue("rating", value)}
            />
            {errors.rating && (
              <p className="text-sm mt-2 text-red-500">
                {errors.rating.message}
              </p>
            )}
          </div>
          <LoadingButton type="submit" loading={loading}>
            <SendHorizontal />
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}

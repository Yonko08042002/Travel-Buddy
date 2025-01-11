import type { Tour } from "@prisma/client";
import { getReviewByTourId } from "application/use-cases/review";
import { getUserById } from "application/use-cases/user";
import { useTranslations } from "next-intl";
import StarRating from "shared/components/atoms/start-rating";

interface TourDetailProps {
  tour: Tour;
}
export default async function TourReview({ tour }: TourDetailProps) {
  const t = useTranslations();
  const reviews = await getReviewByTourId(tour.id);

  const listReview = await Promise.all(
    reviews.map(async (review) => {
      const user = await getUserById(review.userId);
      return {
        avatar: user?.avatar,
        name: user?.name,
        ...review,
      };
    })
  );
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0);
  const averageRating =
    reviews.length > 0 ? totalRating / reviews.length : null;
  const comment = listReview.length;
  return (
    <div className="lg:w-max w-full flex flex-col gap-2">
      <div className="flex gap-2 p-4 justify-between  rounded-lg border-[1px] border-separate">
        <div className="flex items-center gap-2 ">
          <span className="hidden lg:block text-2xl">🏆</span>
          <div className=" flex flex-col  justify-center">
            <h2 className="font-semibold text-lg lg:text-left text-center text-wrap w-2/3">
              {t("review.title1")}
            </h2>
            <p className="hidden lg:block text-sm text-gray-600 text-wrap w-3/4">
              {t("review.description")}
            </p>
          </div>
          <div className="w-[1px] h-full bg-black/10" />
        </div>

        <div className=" text-right flex items-center gap-2">
          <div className="flex flex-col items-center justify-end">
            <p className="font-semibold text-lg ml-1">{averageRating}</p>
            <StarRating rating={averageRating || 1} size={24} />
          </div>
          <div className="w-[1px] h-full bg-black/10" />
          <div className="flex flex-col items-center justify-end">
            <p className="font-semibold text-lg ml-1">{comment}</p>
            <p className="text-xs font-semibold underline ">
              {t("review.Comment")}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full border-[2px] rounded-sm">
        {listReview.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-2 p-4 border-b-[1px] border-separate"
          >
            <div className="flex items-center gap-2">
              <img
                src={review.avatar || ""}
                alt={review.name || ""}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <StarRating rating={review.rating} size={24} />
                <p>{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

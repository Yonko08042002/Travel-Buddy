import { getReviewByTourId } from "application/use-cases/review";
import { getUserById } from "application/use-cases/user";
import StarRating from "shared/components/atoms/start-rating";
import { internalServerErrorResponse } from "shared/helpers/response";

export default async function ShowRating(id: string) {
  const reviews = await getReviewByTourId(id);

  if (!reviews) {
    return internalServerErrorResponse("No tours selected for payment");
  }
  const listReview = await Promise.all(
    reviews.map(async (review) => {
      const user = await getUserById(review.userId);
      return {
        ...user,
        ...review,
      };
    })
  );
  const rating = listReview.reduce((acc, review) => acc + review.rating, 0);
  const comment = listReview.length;
  return (
    <div className=" text-right flex items-center gap-2">
      <div className="flex flex-col items-center justify-end">
        <p className="font-semibold text-lg ml-1">{rating}</p>
        <StarRating rating={rating} size={24} />
      </div>
      <div className="w-[1px] h-full bg-black/10" />
      <div className="flex flex-col items-center justify-end">
        <p className="font-semibold text-lg ml-1">{comment}</p>
        <p className="text-xs font-semibold underline ">Đánh giá</p>
      </div>
    </div>
  );
}

import { getReviews } from "application/use-cases/review";
import ReviewsCarousel from "../../home/components/ReviewsCarousel";
import { configs } from "shared/lib/constant";
import { internalServerErrorResponse } from "shared/helpers/response";
import { getUserById } from "application/use-cases/user";
import { getTourById } from "application/use-cases/tour";
import HeaderReview from "../components/HeaderReview";

export default async function Reviews() {
  const reviews = await getReviews();
  if (!reviews) {
    return internalServerErrorResponse("No tours selected for payment");
  }
  const listReview = await Promise.all(
    reviews.map(async (review) => {
      const user = await getUserById(review.userId);
      const tour = await getTourById(review.tourId);
      return {
        title: tour?.title,
        avatar: user?.avatar,
        name: user?.name,
        ...review,
      };
    })
  );

  return (
    <section className="py-8 md:py-16">
      <div
        className=" lg:p-16 p-4 bg-cover"
        style={{
          backgroundImage: `url(${configs.backgroundReview.src})`,
        }}
      >
        <HeaderReview />
        <ReviewsCarousel reviews={listReview} />
      </div>
    </section>
  );
}

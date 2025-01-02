"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "shared/components/molecules/Carousel";
import StarRating from "shared/components/atoms/start-rating";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ReviewItem {
  id: string;
  createdAt: Date;
  userId: string;
  tourId: string;
  text: string;
  rating: number;
  avatar: string | null | undefined;
  name: string | null | undefined;
  title: string | null | undefined;
}
type ReviewsCarouselProps = {
  reviews: ReviewItem[];
};
export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselPrevious className="absolute left-0 top-1/2 z-40 bg-[#00000080] text-white border-none" />
      <CarouselContent about="" className="p-4 flex gap-4 w-full">
        {reviews.map((review) => (
          <CarouselItem
            key={review.id}
            className="h-full lg:p-4 p-2 basis-1/2  min-w-full  lg:min-w-[400px]  space-y-2 "
          >
            <div className="h-full ">
              <h3 className=" text-white">{review.title}</h3>
              <StarRating size={24} rating={review.rating} />
              <p className=" h-full text-white mt-2 min-h-[50px] max-h-[50px]  italic text-sm line-clamp-4">
                " {review.text}"
              </p>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <img
                src={review.avatar || ""}
                alt={review.name || ""}
                className="w-10 h-10 rounded-full"
              />
              <div className=" text-sm">
                <h3 className="lg:text-lg font-semibold text-white">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {dayjs(review.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute right-0 top-1/2 z-40 bg-[#00000080] text-white border-none" />
    </Carousel>
  );
}

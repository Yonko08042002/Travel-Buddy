import type { Tour } from "@prisma/client";
import StarRating from "shared/components/atoms/start-rating";

interface TourDetailProps {
  tour: Tour;
}
export default function TourReview({ tour }: TourDetailProps) {
  return (
    <div className="lg:w-max w-full">
      <div className="flex gap-2 p-4 justify-between  rounded-lg border-[1px] border-separate">
        <div className="flex items-center gap-2 ">
          <span className="hidden lg:block text-2xl">🏆</span>
          <div className=" flex flex-col  justify-center">
            <h2 className="font-semibold text-lg lg:text-left text-center text-wrap w-2/3">
              Được khách yêu thích nhất
            </h2>
            <p className="hidden lg:block text-sm text-gray-600 text-wrap w-3/4">
              Guests rate this as one of the most popular locations on Buddy
            </p>
          </div>
          <div className="w-[1px] h-full bg-black/10" />
        </div>

        <div className=" text-right flex items-center gap-2">
          <div className="flex flex-col items-center justify-end">
            <p className="font-semibold text-lg ml-1">{tour.duration}</p>
            <StarRating rating={1} size={24} />
          </div>
          <div className="w-[1px] h-full bg-black/10" />
          <div className="flex flex-col items-center justify-end">
            <p className="font-semibold text-lg ml-1">ok</p>
            <p className="text-xs font-semibold underline ">Đánh giá </p>
          </div>
        </div>
      </div>
    </div>
  );
}

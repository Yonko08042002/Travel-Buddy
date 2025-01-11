import BookingCard from "../components/BookingCard";
import { Clock, HeartIcon, Plane } from "lucide-react";
import { Button } from "shared/components/atoms/button";
import TourReview from "../components/TourReview";
import type { Tour } from "@prisma/client";
import { useTranslations } from "next-intl";
import ReviewTourForm from "presentation/review/components/ReviewTourForm";
import ShareButton from "../components/ShareButton";

interface TourDetailProps {
  tour: Tour;
}

export default function TourDetail({ tour }: TourDetailProps) {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-3 md:px-24 lg:py-8 px-2 py-2">
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-xl lg:text-3xl font-bold">{tour?.title}</h1>
        <div className="flex space-x-4">
          <ShareButton />
          <Button variant="outline" size="sm">
            <HeartIcon className="h-4 w-4 mr-2" />
            Lưu
          </Button>
        </div>
      </div>
      <div className="w-full ">
        <img
          width={500}
          height={300}
          className="w-full max-h-96 object-cover max-w-full rounded-xl"
          src={tour.image}
          alt={`Tour of ${tour.title}`}
        />
      </div>
      <div className="mt-4  flex flex-col lg:flex-row justify-between gap-8  w-full">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-lg lg:text-xl font-semibold ">
            {t("Cart_tour.Detail_of")} {tour.title}
          </h1>
          <p className="text-sm lg:text-lg ">{tour.description}</p>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Clock className="w-4 h-4" />
            <span className="">
              {tour.duration} {t("Cart_tour.day")} -
            </span>
            <Plane className="w-4 h-4" />
            <span className="">
              {tour.timeStart
                ? new Date(tour.timeStart).toLocaleString()
                : "N/A"}
            </span>
          </div>

          <TourReview tour={tour} />
          <ReviewTourForm tourId={tour.id} />
        </div>

        <BookingCard tourId={tour.id} />
      </div>
    </div>
  );
}

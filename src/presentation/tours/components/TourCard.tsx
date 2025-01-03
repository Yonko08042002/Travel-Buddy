import { Button } from "shared/components/atoms/button";
import { Card, CardContent, CardHeader } from "shared/components/atoms/card";
import Link from "next/link";
// import StarRating from "shared/components/atoms/start-rating";
import type { Tour } from "domain/tour/tour.schema";
import { useTranslations } from "next-intl";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const t = useTranslations();

  return (
    <Card className="flex flex-row lg:flex-col  rounded-lg shadow-lg">
      <CardHeader className="p-0 overflow-hidden lg:w-full w-1/3 lg:min-w-0  ">
        <img
          src={tour.image}
          alt={tour.title}
          width={400}
          height={300}
          className=" lg:min-w-0 lg:h-48 h-full object-cover rounded-l-lg lg:rounded-t-lg lg:rounded-b-none"
        />
      </CardHeader>
      <CardContent className="w-2/3 lg:w-full flex flex-col gap-1 p-0">
        <div className=" px-4 pt-4">
          <h3 className="text-lg font-bold line-clamp-1">{tour.title}</h3>
          <p className=" text-sm line-clamp-4 min-h-20 ">{tour.description}</p>
        </div>
        <div className="h-full px-4 pb-4 pt-2">
          <div className="flex lg:flex-col flex-row  justify-between gap-2">
            <div className=" flex  flex-col   gap-1">
              <p className=" text-lg  font-bold">
                {tour.price} VNĐ
                <span className="text-base font-medium text-black/70">
                  /{t("Cart_tour.pax")}
                </span>
              </p>
              {/* <div className="flex  items-center gap-2 ">
                <StarRating size={12} rating={tour.rating} />
                <p className="text-sm  text-black/70">{tour.reviews} reviews</p>
              </div> */}
            </div>
            <Link
              href={`/tours/${tour.id}`}
              className="w-1/2 flex justify-between items-center "
            >
              <Button className="w-full bg-primary text-white  rounded-lg hover:bg-primary/80 ">
                {t("buttonWeb.book_now")}
              </Button>
            </Link>
          </div>
          <p className="pt-2 text-xs  text-black/70">*{t("Cart_tour.Note")}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "shared/components/molecules/Carousel";
import CardBestSellerTour from "./CardBestSellerTour";
import { useTranslations } from "next-intl";
import type { TourType } from "@prisma/client";

interface TourItem {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  timeStart: Date | null;
  tourType: TourType;
  tourStyleId: string;
}

interface TourProps {
  tours: TourItem[];
}

export default function ContentBestSellerTours({ tours }: TourProps) {
  const t = useTranslations();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl ">{t("Best_seller_tours.title")}</h2>
      </div>
      <h3 className=" w-1/2 text-xl md:text-3xl font-primary text-primary mb-9">
        {t("Best_seller_tours.description")}
      </h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent className="w-full  flex gap-4 p-1">
          {tours.map((tour) => (
            <CarouselItem
              key={tour.id}
              className=" basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <CardBestSellerTour tour={tour} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 translate-x-1/2" />
      </Carousel>
    </div>
  );
}

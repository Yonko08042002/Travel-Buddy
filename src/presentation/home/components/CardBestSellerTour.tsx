import type { Tour } from "@prisma/client";
import {
  ArrowRight,
  CircleDollarSign,
  Clock,
  MapPin,
  Route,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Badge } from "shared/components/atoms/badge";
import { Button } from "shared/components/atoms/button";
import { Card, CardContent } from "shared/components/atoms/card";

interface TourCardProps {
  tour: Tour;
}
export default function CardBestSellerTour({ tour }: TourCardProps) {
  const t = useTranslations();
  return (
    <Card className="rounded-none group border-0 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="relative ">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-[200px] object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="absolute justify-end top-4 right-4 flex gap-2 flex-wrap">
            {[`${tour.tourType}`].map((badge) => (
              <Badge
                key={badge}
                className={`${
                  badge === "DailyTour"
                    ? "bg-green-500"
                    : badge === "Package tour"
                    ? "bg-blue-500"
                    : "bg-orange-500"
                } text-white`}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-semibold mb-2">{tour.title}</h4>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {tour.duration} {t("Cart_tour.day")}
            </span>
          </div>
          <div className="flex items-start gap-2 text-gray-600 mb-4">
            <Route className="w-4 h-4 mt-1 flex-shrink-0 " />
            <span className="text-sm">{tour.description}</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2  mb-2">
              <p className="text-xl font-bold text-primary ">
                {tour.price} VND
                <span className="text-sm text-gray-600">
                  /{t("Cart_tour.pax")}
                </span>
              </p>
            </div>

            <Link href={`/tours/${tour.id}`}>
              <Button
                variant="ghost"
                className="pl-0 justify-start text-primary hover:text-primary/80"
              >
                {t("buttonWeb.More_detail")}{" "}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

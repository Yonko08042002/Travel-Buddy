"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "shared/components/molecules/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { configs } from "shared/lib/constant";
import Image from "next/image";
import { Button } from "shared/components/atoms/button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const INTRODUCTIONS = [
  {
    id: "introductionbanner1",
    img: configs.introductionBanner.introductionBanner1,
  },
];

export default function Introduction() {
  const t = useTranslations();
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full relative "
    >
      {/* <CarouselPrevious className="absolute left-4 top-1/2 z-40 bg-black text-white border-none" /> */}
      <CarouselContent className=" w-full ">
        {INTRODUCTIONS.map((introduction) => (
          <CarouselItem
            key={introduction.id}
            className="relative text-white lg:h-screen"
          >
            <div
              className="absolute inset-0 z-10 bg-cover bg-center opacity-30 w-full h-full bg-black"
              aria-hidden="true"
            />
            <Image
              width={1200}
              height={40}
              src={introduction.img.src}
              alt="introduction"
              className="w-full h-full "
            />
            <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-primary text-white mb-6">
                  {t("Introduction.title1")} <br />
                  {t("Introduction.title2")}
                </h1>
                <Button className="group flex gap-1 bg-primary hover:bg-primary/90  text-white rounded-none">
                  {t("buttonWeb.book_now")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselNext className="absolute right-4 top-1/2 z-40 bg-black text-white border-none" /> */}
    </Carousel>
  );
}

import { useTranslations } from "next-intl";

export default function HeaderReview() {
  const t = useTranslations();
  return (
    <div>
      {" "}
      <p className="uppercase text-sm md:text-base text-white">
        {t("review.testimonial")}
      </p>
      <h2 className="font-primary text-2xl  md:text-4xl  text-white font-medium  mb-4 lg:mb-6">
        {t("review.What_customers_talk_about_us")}
      </h2>
    </div>
  );
}

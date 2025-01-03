import { getTourStyles } from "application/use-cases/tour-style";
import TourStyleBreadcrumb from "presentation/tour-styles/components/TourStyleBreadcrumb";
import { TourStylesTable } from "presentation/tour-styles/containers/TourStylesTable";

export const metadata = {
  title: "TourStyle",
};

export default async function TourStyle() {
  const tourStyles = await getTourStyles();

  return (
    <section className="w-full">
      <TourStyleBreadcrumb />
      <TourStylesTable data={tourStyles} />
    </section>
  );
}

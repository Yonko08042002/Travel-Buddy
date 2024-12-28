import { getBestSellerTours } from "application/use-cases/tour";

import ContentBestSellerTours from "../components/ContentBestSellerTours";
export default async function BestSellerTours() {
  const tours = await getBestSellerTours();

  return (
    <section className="py-12  px-4 md:px-6 lg:px-8">
      <ContentBestSellerTours tours={tours} />
    </section>
  );
}

import { getDestinations } from "application/use-cases/destination";
import DestinationBreadcrumb from "presentation/destinations/components/DestinationBreadcrumb";
import { DestinationsTable } from "presentation/destinations/containers/DestinationsTable";

export const metadata = {
  title: "Destination",
};

export default async function Destination() {
  const destinations = await getDestinations();
  return (
    <section className="w-full">
      <DestinationBreadcrumb />
      <DestinationsTable data={destinations} />
    </section>
  );
}

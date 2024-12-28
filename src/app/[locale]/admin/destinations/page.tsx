import { getDestinations } from 'application/use-cases/destination';
import { DestinationsTable } from 'presentation/destinations/containers/DestinationsTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from 'shared/components/atoms/breadcrumb';

export const metadata = {
  title: 'Destination'
};

export default async function Destination() {
  const destinations = await getDestinations();
  return (
    <section className='w-full'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/destination'>
              Destinations
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DestinationsTable data={destinations} />
    </section>
  );
}

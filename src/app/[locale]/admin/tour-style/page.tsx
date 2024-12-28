import { getTourStyles } from 'application/use-cases/tour-style';
import { TourStylesTable } from 'presentation/tour-styles/containers/TourStylesTable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from 'shared/components/atoms/breadcrumb';

export const metadata = {
  title: 'TourStyle'
};

export default async function TourStyle() {
  const tourStyles = await getTourStyles();

  return (
    <section className='w-full'>
      <Breadcrumb className='mb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin'>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/admin/tour-styles'>
              Tour Style
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <TourStylesTable data={tourStyles} />
    </section>
  );
}

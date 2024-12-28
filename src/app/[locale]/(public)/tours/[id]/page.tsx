import { getTourById } from 'application/use-cases/tour';
import TourDetail from 'presentation/tours/containers/TourDetail';

export const metadata = {
  title: 'Tour'
};

export default async function TourPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const tour = await getTourById(id);

  if (!tour) {
    return <div>Tour not found</div>;
  }

  return <TourDetail tour={tour} />;
}

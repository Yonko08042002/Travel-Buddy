import BackgroundTour from 'presentation/tours/components/BackgroundTour';
import TourList from 'presentation/tours/containers/TourList';
import SearchTour from 'presentation/tours/components/TourSearch';

export const metadata = {
  title: 'Search tour'
};
export default function ToursPage() {
  return (
    <>
      <BackgroundTour />
      <SearchTour />
      <TourList />
    </>
  );
}

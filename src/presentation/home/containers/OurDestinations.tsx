import { getDestinations } from 'application/use-cases/destination';
import OurDestinationsCarousel from '../components/OurDestinationCarousel';
import HeaderOurDestination from '../components/HeaderOurDestination';

export default async function OurDestinations() {
  const destinations = await getDestinations();
  return (
    <section className='py-8 md:py-16 flex flex-col items-center '>
      <HeaderOurDestination />
      <OurDestinationsCarousel destinations={destinations} />
    </section>
  );
}

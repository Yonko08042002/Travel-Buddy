import { getDestinations } from 'application/use-cases/destination';
import OurDestinationsCarousel from '../components/OurDestinationCarousel';
import { MapPin } from 'lucide-react';

export default async function OurDestinations() {
  const destinations = await getDestinations();
  return (
    <section className='py-8 md:py-16 flex flex-col items-center '>
      <p className='flex gap-1 items-center '>
        OUR DESTINATION <MapPin size={15} />
      </p>
      <h2 className='font-primary text-3xl lg:text-4xl text-center text-primary  mb-4 lg:mb-6'>
        The whole Vietnam in here
      </h2>
      <OurDestinationsCarousel destinations={destinations} />
    </section>
  );
}

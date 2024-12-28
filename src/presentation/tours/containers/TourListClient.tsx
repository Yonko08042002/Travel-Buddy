'use client';

import { useTranslations } from 'next-intl';
import TourCard from '../components/TourCard';
import type { Tour } from '@prisma/client';

export default function TourListClient({ tours }: { tours: Tour[] }) {
  const t = useTranslations('TourList');

  return (
    <div className='container mx-auto lg:p-8 px-2 py-2'>
      <h2 className='text-2xl font-bold mb-8'>{t('explore')}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4'>
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

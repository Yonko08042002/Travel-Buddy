import { configs } from 'shared/lib/constant';
import { useTranslations } from 'next-intl';

export default function BackgroundTour() {
  const t = useTranslations('TourList');

  return (
    <div className=' relative bg-gray-900 py-16 px-8 lg:px-32'>
      <div
        className='absolute inset-0 bg-cover bg-center opacity-50'
        style={{
          backgroundImage: `url(${configs.backgroundLogin.src})`
        }}
      />
      <div className='relative text-center mt-12 text-white'>
        <h1 className='font-primary text-6xl lg:text-7xl font-semibold mb-4'>
          {t('title')}
        </h1>
        <p className='font-primary text-lg lg:text-4xl font-bold mb-6'>
          Travel Buddy
        </p>
      </div>
    </div>
  );
}

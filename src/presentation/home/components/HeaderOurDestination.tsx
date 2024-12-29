import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeaderOurDestination() {
  const t = useTranslations('OUR_DESTINATION');
  return (
    <div>
      <p className='flex gap-1 justify-center items-center text-center'>
        {t('title')} <MapPin size={15} />
      </p>
      <h2 className='font-primary text-3xl lg:text-4xl text-center text-primary  mb-4 lg:mb-6'>
        {t('title1')}
      </h2>
    </div>
  );
}

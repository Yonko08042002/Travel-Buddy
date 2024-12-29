import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from 'shared/components/atoms/button';
import { configs } from 'shared/lib/constant';

export default function OurStory() {
  const t = useTranslations();
  return (
    <section className=' bg-[#EBF0F8] grid grid-cols-1 lg:grid-cols-2  items-center'>
      <Image
        height={500}
        width={1200}
        src={configs.out_story}
        alt='Our Story Image'
        className='w-full h-full object-cover'
      />

      <div className='max-w-2xl w-full space-y-6 p-12 '>
        <h1 className='text-4xl font-serif text-primary'>{t('About.title')}</h1>

        <p className='text-gray-600'>{t('About.passage_one')}</p>

        <p className='text-gray-600'>{t('About.passage_two')}</p>

        <div className='grid grid-cols-3 gap-4'>
          <div className='text-start'>
            <div className='text-3xl font-bold text-primary'>25</div>
            <p className='text-sm text-gray-600 mt-1'>
              {t('About.Destinations')}
            </p>
          </div>
          <div className='text-start'>
            <div className='text-3xl font-bold text-primary'>2500+</div>
            <p className='text-sm text-gray-600 mt-1'>
              {t('About.Tourists_per_year')}
            </p>
          </div>
          <div className='text-start'>
            <div className='text-3xl font-bold text-primary'>120+</div>
            <p className='text-sm text-gray-600 mt-1'>{t('About.Partners')}</p>
          </div>
        </div>

        <Button className='group rounded-none font-medium'>
          {t('buttonWeb.read_more')}
          <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Button>
      </div>
    </section>
  );
}

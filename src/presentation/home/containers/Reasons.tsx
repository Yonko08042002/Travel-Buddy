import { MedalIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { configs } from 'shared/lib/constant';

export default function Reasons() {
  const t = useTranslations('reasons');
  const reasons = [
    {
      id: 'Support',
      title: t('24/7_support.title'),
      image: configs.OUR_SERVICE.icon.icon1,
      description: t('24/7_support.description')
    },
    {
      id: 'Flexible_payment',
      title: t('Flexible_payment.title'),
      image: configs.OUR_SERVICE.icon.icon2,
      description: t('Flexible_payment.description')
    },
    {
      id: 'Service Quality',
      title: t('Service_Quality.title'),
      image: configs.OUR_SERVICE.icon.icon3,
      description: t('Service_Quality.description')
    },
    {
      id: 'Flexibility',
      title: t('Flexibility.title'),
      image: configs.OUR_SERVICE.icon.icon4,
      description: t('Flexibility.description')
    }
  ];

  return (
    <section className='  mx-auto bg-[#EBF0F8] '>
      <Image
        width={1200}
        height={50}
        src={configs.out_story}
        alt='Travel Buddy Team'
        className='lg:hidden w-full h-full object-cover '
      />
      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <div className='space-y-8 p-6 lg:px-16'>
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <h2 className=' font-medium'>OUR SERVICE</h2>
              <MedalIcon size={10} />
            </div>
            <h3 className='text-3xl font-bacasime-antique text-primary'>
              What you can expect from us
            </h3>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {reasons.map((reason) => (
              <div key={reason.id} className='space-y-1'>
                <div className='flex flex-row lg:flex-col gap-1'>
                  {' '}
                  <div className='size-8 lg:size-12 rounded-full items-center justify-center'>
                    <Image
                      className='size-full'
                      src={reason.image}
                      alt={reason.title}
                    />
                  </div>
                  <h4 className='text-xl font-semibold'>{reason.title}</h4>
                </div>
                <p className='text-gray-600'>{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Image
          width={1200}
          height={50}
          src={configs.out_story}
          alt='Travel Buddy Team'
          className='hidden lg:block w-full h-full object-cover '
        />
      </div>
    </section>
  );
}

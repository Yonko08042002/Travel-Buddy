import { MedalIcon } from 'lucide-react';
import Image from 'next/image';
import { configs } from 'shared/lib/constant';

const reasons = [
  {
    id: 'Support',
    title: '24/7 support',
    image: configs.OUR_SERVICE.icon.icon1,
    description:
      ' Always ready to support whenever you need to ensure a seamless and colorful experience.'
  },
  {
    id: 'Flexible_payment',
    title: 'Flexible payment',
    image: configs.OUR_SERVICE.icon.icon2,
    description:
      ' Whatever your style, enjoy a flawless trip with excellent accommodations at competitive prices.'
  },
  {
    id: 'Service Quality',
    title: 'Service Quality',
    image: configs.OUR_SERVICE.icon.icon3,
    description:
      ' Prioritize our services and stay updated with trends to enhance quality. Trust us for a satisfying trip!'
  },
  {
    id: 'Flexibility',
    title: 'Flexibility',
    image: configs.OUR_SERVICE.icon.icon4,
    description:
      ' Personalizing your trip to fit your budget and desires has never been easier!'
  }
];

export default function Reasons() {
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

import Image from 'next/image';
import { configs } from 'shared/lib/constant';

export default function Partners() {
  const partners = [
    {
      name: 'The Emblem Prague Hotel',
      logo: configs.logoPartner.logoPartner1
    },
    {
      name: 'Liberty Hotel Saigon Greenview',
      logo: configs.logoPartner.logoPartner2
    },
    {
      name: 'Melia',
      logo: configs.logoPartner.logoPartner3
    },
    {
      name: 'Cicilia Saigon Center',
      logo: configs.logoPartner.logoPartner4
    },
    {
      name: 'Grand Mercure Danang',
      logo: configs.logoPartner.logoPartner5
    },
    {
      name: 'Silk Path Hotels & Resorts',
      logo: configs.logoPartner.logoPartner6
    },
    {
      name: 'Dolce Hotels and Resorts',
      logo: configs.logoPartner.logoPartner7
    },
    {
      name: 'Stella Maris Beach',
      logo: configs.logoPartner.logoPartner8
    },
    {
      name: 'Ramana Hotels & Resorts',
      logo: configs.logoPartner.logoPartner9
    },
    {
      name: 'Grand Mercure Hotels and Resorts',
      logo: configs.logoPartner.logoPartner10
    },
    {
      name: 'Radisson Red',
      logo: configs.logoPartner.logoPartner11
    },
    {
      name: 'Four Points',
      logo: configs.logoPartner.logoPartner12
    },
    {
      name: 'Equatorial Ho Chi Minh City',
      logo: configs.logoPartner.logoPartner13
    },
    {
      name: 'A25 Hotel',
      logo: configs.logoPartner.logoPartner14
    },
    {
      name: 'Grand Vista',
      logo: configs.logoPartner.logoPartner15
    },
    {
      name: 'Sky Gem Hotels',
      logo: configs.logoPartner.logoPartner16
    },
    {
      name: 'Eden Hotel',
      logo: configs.logoPartner.logoPartner17
    },
    {
      name: 'DLG Hotel',
      logo: configs.logoPartner.logoPartner18
    },
    {
      name: 'DATA Danang',
      logo: configs.logoPartner.logoPartner19
    },
    {
      name: 'BlueSun Hotel',
      logo: configs.logoPartner.logoPartner20
    },
    {
      name: 'VCCI',
      logo: configs.logoPartner.logoPartner21
    }
  ];

  return (
    <section className=' p-4 md:py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 items-center justify-center'>
          {partners.map((partner) => (
            <div
              key={partner.name}
              className='group relative flex items-center justify-center p-2 hover:scale-105'
            >
              <Image
                width={500}
                height={500}
                src={partner.logo.src}
                alt={`${partner.name} logo`}
                className='max-h-12 w-auto object-contain hover:grayscale-0 '
                loading='lazy'
              />
              <div className='absolute inset-0 rounded-lg border border-transparent hover:border-gray-200 transition-colors' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { configs } from 'shared/lib/constant';
import { cn } from 'shared/utils/cn';

const INFO = [
  {
    id: 'HeadOffice',
    Name: 'Da Nang Office',
    Detail:
      '132 Ho Xuan Huong, Khue My Ward, Ngu Hanh Son District, Danang City'
  },
  {
    id: 'HoChiMinhOffice',
    Name: 'Ho Chi Minh Office',
    Detail: '88 Le Lai Street, Ben Thanh Ward, District 1, Ho Chi Minh City'
  },
  {
    id: 'Email',
    Name: 'Email:',
    Detail: 'info@travelbuddyvn.com',
    icons: <Mail className='h-4 w-4 text-gray-400' />
  },
  {
    id: 'Mobile ',
    Name: 'Mobile:',
    Detail: '(+84) 934 993 667',

    icons: <Phone className='h-4 w-4 text-gray-400' />
  }
];

export default function Footer() {
  return (
    <footer className='bg-[#203B64] text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col gap-2 md:flex-row justify-between'>
          <div className='space-y-4'>
            <Link href='/' className='inline-block'>
              <Image
                src={configs.logo_white}
                alt='Travel Buddy'
                width={180}
                height={60}
                className='h-12 md:h-28 w-auto'
              />
            </Link>
            <p className='text-sm leading-relaxed  max-w-md'>
              A team of dedicated travel advisors providing personalized
              services and assistance to ensure that our customers are entirely
              delighted with their journeys to explore Vietnam's splendor.
            </p>
          </div>

          <div>
            <h2 className='text-lg font-semibold mb-4 text-[#6189C5]'>MENU</h2>
            <nav className='space-y-4  md:space-y-8'>
              <Link
                href='/tour'
                className='block text-base hover:text-gray-300 transition-colors'
              >
                Tour
              </Link>
              <Link
                href='/services'
                className='block text-base hover:text-gray-300 transition-colors'
              >
                Services
              </Link>
              <Link
                href='/mice'
                className='block text-base hover:text-gray-300 transition-colors'
              >
                MICE
              </Link>
              <Link
                href='/blog'
                className='block text-base hover:text-gray-300 transition-colors'
              >
                Blog
              </Link>
              <Link
                href='/about'
                className='block text-base hover:text-gray-300 transition-colors'
              >
                About us
              </Link>
            </nav>
          </div>

          <div>
            <h2 className='text-lg font-semibold mb-4 text-[#6189C5]'>
              CONTACT INFO
            </h2>
            <div className='space-y-4'>
              {INFO.map((info) => (
                <div key={info.id} className={cn('')}>
                  <h3 className='font-medium mb-1'>{info.Name}</h3>
                  <p className='text-sm text-gray-300'>{info.Detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 pt-4 border-t border-[#3A6CB6]'>
          <p className='text-xs text-[#3A6CB6] text-start'>
            Copyright © 2024 Travel Buddy Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

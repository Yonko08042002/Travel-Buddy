import { Facebook, Instagram, Mail, Map as MapIcon, Phone } from 'lucide-react';
import { configs } from 'shared/lib/constant';
import { LanguageSelector } from './LanguageSelector';

const items = [
  {
    id: 'Facebook',
    icon: <Facebook size={15} />,
    link: configs.facebook.link
  },
  {
    id: 'Instagram',
    icon: <Instagram size={15} />,
    link: configs.instagram.link
  },
  {
    id: 'Google map',
    icon: <MapIcon size={15} />,
    link: configs.googlemap.link
  }
];

export default function SettingHeader() {
  return (
    <div className=' bg-[#182D4C] text-xs text-white px-2 py-1 lg:px-16   flex justify-end md:justify-between border-b'>
      <div className=' hidden lg:flex  gap-2 items-center'>
        <p className='  flex gap-2 items-center'>
          <Mail size={15} /> {configs.mail}
        </p>
        <div className='w-[1px]  h-2/3 bg-white/80' />
        <p className=' flex gap-2 items-center'>
          <Phone size={15} /> {configs.phoneNumber}
        </p>
      </div>
      <div className=' flex gap-2  items-center '>
        <div className='w-full flex gap-2'>
          {items.map((item) => (
            <a
              href={item.link}
              key={item.id}
              className='flex gap-1 p-1 text-nowrap'
            >
              {item.icon}
              <span className='hidden lg:block'> {item.id}</span>
            </a>
          ))}
        </div>
        <div className='w-[1px]  h-2/3 bg-white/80' />
        <LanguageSelector />
      </div>
    </div>
  );
}

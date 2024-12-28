'use client';
import { Button } from 'shared/components/atoms/button';
import { configs } from 'shared/lib/constant';
import { MessagesSquare, X } from 'lucide-react';
import { useState } from 'react';
import phone from '../../../../public/images/phone.png';
import whatsapp from '../../../../public/images/whatsapp.png';
import zalo from '../../../../public/images/zalo.png';
import instagram from '../../../../public/images/instagram.png';
import messenger from '../../../../public/images/messenger.png';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from 'shared/utils/cn';
import { useTranslations } from 'next-intl';

const SOCIALS = [
  {
    title: 'Phone',
    icon: phone,
    link: configs.phone.link
  },
  {
    title: 'WhatsApp',
    icon: whatsapp,
    link: configs.whatsapp.link
  },
  {
    title: 'Zalo',
    icon: zalo,
    link: configs.zalo.link
  },
  {
    title: 'Facebook Messenger',
    icon: messenger,
    link: configs.messenger.link
  },
  {
    title: 'Instagram',
    icon: instagram,
    link: configs.instagram.link
  }
];

export default function FloatButton() {
  const [show, setShow] = useState(false);
  const t = useTranslations();
  return (
    <div className='fixed bottom-24 right-4 z-50 '>
      <div
        className={cn({
          hidden: !show,
          block: show
        })}
      >
        {SOCIALS.map((social) => (
          <Link href={social.link} key={social.title} className='mb-2 block'>
            <Image
              width={56}
              height={56}
              src={social.icon}
              alt={social.title}
            />
          </Link>
        ))}
      </div>
      <Button
        className={cn(
          'rounded-full bg-[#09873E]  hover:bg-[#09873E] shadow-xl p-4 size-12 md:size-max',
          { 'size-12': show }
        )}
        onClick={() => setShow((isShow) => !isShow)}
      >
        {show ? (
          <X className='text-2xl' />
        ) : (
          <div className='flex gap-1 '>
            <MessagesSquare size={20} />
            <p className='text-sm hidden md:block'>
              {t('buttonWeb.contact_us')}
            </p>
          </div>
        )}
      </Button>
    </div>
  );
}

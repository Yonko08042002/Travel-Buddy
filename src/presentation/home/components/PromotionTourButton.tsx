// components/PromotionTourButton.tsx
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PromotionTourButton() {
  const t = useTranslations('buttonWeb');
  return (
    <Link
      href='/promotional-tours'
      className='flex items-center fixed bottom-4 right-4 z-50 animate-bounce bg-primary py-4 px-4  text-white gap-2 rounded-full cursor-pointer'
    >
      <PartyPopper size={20} />
      <p className='hidden md:block text-sm'>{t('promotion_tour')}</p>
    </Link>
  );
}

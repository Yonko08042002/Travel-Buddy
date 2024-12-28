'use client';

import { routing, usePathname, useRouter } from 'i18n/routing';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { Button } from 'shared/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from 'shared/components/atoms/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'shared/components/atoms/tabs';

export function LanguageSelector() {
  const t = useTranslations('LocaleSwitcher');
  const [currency, setCurrency] = useState('USD');

  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onValueChange(value: (typeof routing.locales)[number]) {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  }
  return (
    <div className='w-full max-w-sm mx-auto '>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex items-center gap-2 text-sm'>
            <Globe className='h-4 w-4' />
            {t('locale', { locale })}/{currency}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[240px]'>
          <Tabs defaultValue='language' className='w-full'>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='language'> Language</TabsTrigger>
              <TabsTrigger value='currency'>Currency</TabsTrigger>
            </TabsList>
            <TabsContent value='language' className='mt-2'>
              <div className='grid gap-1'>
                <div className='grid gap-1'>
                  {routing.locales.map((lang) => (
                    <Button
                      key={lang}
                      variant={locale === lang ? 'secondary' : 'ghost'}
                      className='w-full justify-start'
                      onClick={() => onValueChange(lang)}
                      disabled={isPending}
                    >
                      {t('locale', { locale: lang })}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value='currency' className='mt-2'>
              <div className='grid gap-1'>
                <Button
                  variant={currency === 'USD' ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                  onClick={() => setCurrency('USD')}
                >
                  USD
                </Button>
                <Button
                  variant={currency === 'VND' ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                  onClick={() => setCurrency('VND')}
                >
                  VND
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

import type { Metadata } from 'next';
import { Lora, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from 'shared/utils/cn';
import { Toaster } from 'sonner';
import { configs } from 'shared/lib/constant';
import { ReactQueryClientProvider } from 'shared/providers/ReactQueryClientProvider';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  metadataBase: new URL(configs.domain),
  title: {
    default: configs.title,
    template: `%s | ${configs.title}`
  },
  description: configs.description,
  openGraph: {
    title: configs.title,
    description: configs.description,
    url: configs.domain,
    siteName: configs.title,
    locale: 'en_US',
    type: 'website'
  }
};

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-primary'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-secondary'
});

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale }
}: Props) {
  const messages = await getMessages();

  return (
    <ReactQueryClientProvider>
      <html lang={locale} className={cn(lora.variable, montserrat.variable)}>
        <body className='font-secondary'>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <main>
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster
                richColors
                position='top-right'
                closeButton
                duration={5000}
              />
            </main>
          </NextIntlClientProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}

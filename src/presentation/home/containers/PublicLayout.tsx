import FloatButton from 'shared/components/molecules/FloatButton';
import Footer from 'shared/components/organisms/Footer';
import PromotionTourButton from 'presentation/home/components/PromotionTourButton';
import SettingHeader from 'presentation/home/components/SettingHeader';
import Header from 'presentation/home/containers/Header';
import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingHeader />
      <Header />
      {children}
      <Footer />
      <FloatButton />
      <PromotionTourButton />
    </>
  );
}

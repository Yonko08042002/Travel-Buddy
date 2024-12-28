import { useTranslations } from 'next-intl';
import { configs } from 'shared/lib/constant';

export default function BlogsBackground() {
  const t = useTranslations('BlogList');
  return (
    <div className=' relative bg-gray-900 py-16 px-8 lg:px-32'>
      <div
        className='absolute inset-0 bg-cover bg-center opacity-50'
        style={{
          backgroundImage: `url(${configs.backgroundLogin.src})`
        }}
      />
      <div className='relative text-center mt-12 text-white'>
        <h1 className='font-primary text-4xl lg:text-5xl mb-4 '>
          {t('title')}
        </h1>
        <p className='font-primary text-lg lg:text-xl  mb-6'>{t('explore')}</p>
      </div>
    </div>
  );
}

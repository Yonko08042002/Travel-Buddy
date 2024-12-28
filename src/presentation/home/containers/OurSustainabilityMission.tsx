import { ArrowRight, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from 'shared/components/atoms/button';
import { configs } from 'shared/lib/constant';

export default function OurSustainabilityMission() {
  const t = useTranslations();

  return (
    <section className='relative py-8 md:py-16 '>
      <div
        className='  p-4 bg-cover items-center h-max '
        style={{
          backgroundImage: `url(${configs.background_dreamland.src})`
        }}
      >
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6 flex flex-col items-center'>
              <div className='flex items-center gap-2'>
                <h2 className='text-lg '>
                  {t('OurSustainabilityMission.title')}
                </h2>
                <Globe className='w-5 h-5 ' />
              </div>

              <h3 className='text-4xl text-center font-serif text-primary'>
                Road to the "DREAMLAND"
              </h3>

              <div className='space-y-4 text-gray-600'>
                <p className='text-center'>
                  {t('OurSustainabilityMission.passage_one')}
                </p>

                <p className='text-center'>
                  {t('OurSustainabilityMission.passage_two')}
                </p>

                <p className='text-center'>
                  {t('OurSustainabilityMission.passage_three')}
                </p>
              </div>

              <Button className='group rounded-none font-medium'>
                {t('buttonWeb.read_more')}
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </div>

            <div className=' md:absolute -top-2 right-16 p-6 md:w-1/3 '>
              {' '}
              <div className='relative '>
                <div className='relative transform rotate-3 transition-transform hover:rotate-0'>
                  <div className='bg-white p-4 shadow-xl'>
                    <img
                      src={configs.our_sustainability_mission.src}
                      alt='Travel Buddy team with students'
                      className=' aspect-square'
                    />
                    <p className='text-center mt-4 text-gray-600 font-medium italic'>
                      "Small actions lead to big dreams"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

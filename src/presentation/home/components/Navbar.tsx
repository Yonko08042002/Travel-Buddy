import NavbarMobile, { type Menu } from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Menu');
  const MENUS: Menu[] = [
    {
      id: 'HOME',
      name: t('home'),
      link: '/'
    },
    {
      id: 'TOURS',
      name: t('tours'),
      link: '/tours/',
      type: 'tab',
      children: [
        {
          id: 'PACKAGE_TOURS',
          name: 'Package tours',
          link: '/package-tours',
          type: 'tab',
          children: [
            {
              id: 'BY_DURATION',
              name: 'By duration',
              link: 'by-duration',
              children: [
                {
                  id: 'D4',
                  name: '4 day',
                  link: '/package-tours?day=4'
                },
                {
                  id: 'D5',
                  name: '5 day',
                  link: '/package-tours?day=5'
                },
                {
                  id: 'D6',
                  name: '6 day',
                  link: '/package-tours?day=6'
                },
                {
                  id: 'D7',
                  name: '7 day',
                  link: '/package-tours?day=7'
                },
                {
                  id: 'D8',
                  name: '8 day',
                  link: '/package-tours?day=8'
                },
                {
                  id: 'D9',
                  name: '9 day',
                  link: '/package-tours?day=9'
                },
                {
                  id: 'D10',
                  name: '10 day',
                  link: '/package-tours?day=10'
                },
                {
                  id: 'D10+',
                  name: 'Above 10 day',
                  link: '/package-tours?day=10+'
                }
              ]
            },
            {
              id: 'BY_STYLE',
              name: 'By style',
              link: 'style',
              type: 'tab',
              children: [
                {
                  id: 'S1',
                  name: 'Family Holidays',
                  link: '/package-tours?style=family-holidays'
                },
                {
                  id: 'S2',
                  name: 'Holiday Tours',
                  link: '/package-tours?style=holiday-tours'
                },
                {
                  id: 'S3',
                  name: 'Luxury Tours',
                  link: '/package-tours?style=luxury-tours'
                },
                {
                  id: 'S4',
                  name: 'Leisure Tours',
                  link: '/package-tours?style=leisure-tours'
                },
                {
                  id: 'S5',
                  name: 'Eco Tours',
                  link: '/package-tours?style=eco-tours'
                },
                {
                  id: 'S6',
                  name: 'Education Tours',
                  link: '/package-tours?style=education-tours'
                }
              ]
            },
            {
              id: 'BY_DESTINATION',
              name: 'By destination',
              children: [
                {
                  id: 'ha-noi',
                  name: 'Ha Noi',
                  link: '/package-tours?destination=hanoi'
                },
                {
                  id: 'ha-long',
                  name: 'Ha Long',
                  link: '/package-tours?destination=ha-long'
                },
                {
                  id: 'sa-pa',
                  name: 'Sa pa',
                  link: '/package-tours?destination=sa-pa'
                },
                {
                  id: 'dan-nang',
                  name: 'Da Nang',
                  link: '/package-tours?destination=da-nang'
                },
                {
                  id: 'nha-trang',
                  name: 'Nha Trang',
                  link: '/package-tours?destination=nha-trang'
                },
                {
                  id: 'ho-chi-minh',
                  name: 'Ho Chi Minh City',
                  link: '/package-tours?destination=ho-chi-minh'
                },
                {
                  id: 'me-kong',
                  name: 'Mekong Delta',
                  link: '/package-tours?destination=me-kong'
                },
                {
                  id: 'phu-quoc',
                  name: 'Phu Quoc',
                  link: '/package-tours?destination=phu-quoc'
                }
              ]
            }
          ]
        },
        {
          id: 'DAILY_TOURS',
          name: 'Daily tours',
          isVertical: true,
          children: [
            { id: 'DT1', name: 'Ha Noi city tours', link: '/tours/' },
            { id: 'DT2', name: 'Da Nang city tours', link: '/tours/' },
            { id: 'DT3', name: 'Ho Chi Min city tours', link: '/tours/' }
          ]
        },
        {
          id: 'TAILOR_MADE_TOURS',
          name: 'Tailor-made tours',
          link: '/tailor-made-tours'
        },
        {
          id: 'PROMOTIONAL_TOURS',
          name: 'Promotional tours',
          link: '/promotional-tours'
        }
      ]
    },
    {
      id: 'MICE',
      name: t('mice'),
      type: 'menu',
      isVertical: true,
      children: [
        {
          id: 'DESTINATION',
          name: 'Destination',
          link: '/destinations'
        },
        {
          id: 'SERVICES',
          name: 'Services',
          link: '/services'
        },
        { id: 'M.I.C.E_GROUPS', name: 'M.I.C.E groups', link: '/mice' }
      ]
    },
    {
      id: 'SERVICE',
      name: t('services'),
      type: 'menu',
      isVertical: true,
      children: [
        {
          id: 'VNTICKET_ATTRACTION',
          name: 'Vietnam’s attractions tickets'
        },
        {
          id: 'VNTICKET_ENTRANCE',
          name: 'Vietnam’s entrance tickets'
        },
        {
          id: 'DOMESTIC_AND_INTERNATIONAL_FLIGHT_TICKETS',
          name: 'Domestic and international flight tickets'
        },
        {
          id: 'HOTEL_RESERVATION',
          name: 'Hotel reservation'
        },
        {
          id: 'CRUISE',
          name: 'Cruise'
        },
        {
          id: 'AIRPORT_SHUTTLE_SERVICES',
          name: 'Airport shuttle services'
        },
        {
          id: 'CAR_DISPOSAL',
          name: 'Car disposal'
        },
        {
          id: 'APPLYING_FOR_VISA',
          name: 'Applying for visa'
        }
      ]
    },
    {
      id: 'BLOG',
      name: t('blog'),
      link: '/blogs'
    },

    {
      id: 'ABOUT_US',
      name: t('about_us'),
      isVertical: true,
      type: 'menu',
      children: [
        {
          id: 'OUR_STORY',
          name: 'Our story',
          link: '/about-us/our-story'
        },

        {
          id: 'VISION',
          name: 'Vision',
          link: '/about-us/vision'
        },

        {
          id: 'MISSION',
          name: 'Mission',
          link: '/about-us/mission'
        },

        {
          id: 'OUR_PHILOSOPHY',
          name: 'Our philosophy',
          link: '/about-us/our-philosophy'
        },

        {
          id: 'CORE_VALUES',
          name: 'Core values',
          link: '/about-us/core-values'
        },

        {
          id: 'ABOUT_TEAM',
          name: 'About team',
          link: '/about-us/about-team'
        }
      ]
    },
    {
      id: ' MEMBERSHIP',
      name: t('membership'),
      link: '/Membership'
    }
  ];
  return (
    <>
      <NavbarDesktop menus={MENUS} />
      <NavbarMobile menus={MENUS} />
    </>
  );
}

import { ChevronDown } from 'lucide-react';
import type { Menu } from './NavbarMobile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from 'shared/components/atoms/hover-card';
import TabMenu from './TabMenu';
import Link from 'next/link';
import VerticalMenu from './MenuVertical';

interface NavbarDesktopProps {
  menus: Menu[];
}

export default function NavbarDesktop({ menus }: NavbarDesktopProps) {
  return (
    <div className='hidden lg:flex gap-1 justify-center items-center'>
      {menus.map((item) => (
        <HoverCard key={item.id}>
          <HoverCardTrigger>
            <Link
              href={item?.link || '/'}
              className='py-3 px-4 flex items-center gap-1 font-medium cursor-pointer text-gray-600 hover:text-primary hover:underline'
            >
              {item.name}
              {item?.children?.length && <ChevronDown size={15} />}
            </Link>
          </HoverCardTrigger>

          {item?.children?.length && (
            <HoverCardContent className='mt-2 w-full p-0 rounded-xl '>
              {item.type === 'tab' ? (
                <TabMenu menus={item.children} />
              ) : (
                <VerticalMenu menus={item.children} />
              )}
            </HoverCardContent>
          )}
        </HoverCard>
      ))}
    </div>
  );
}

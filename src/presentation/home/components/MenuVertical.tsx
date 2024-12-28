import Link from 'next/link';
import type { Menu } from './NavbarMobile';
import { Button } from 'shared/components/atoms/button';

interface VerticalMenuProps {
  menus: Menu[];
}

export default function VerticalMenu({ menus }: VerticalMenuProps) {
  return (
    <div className=' py-4 px-2 flex flex-col'>
      {menus.map((item) => (
        <Link
          href={item.link ?? ''}
          className=' rounded-sm font-medium cursor-pointer  '
          key={item.id}
        >
          <Button
            variant={'link'}
            className='w-full text-base text-black justify-start hover:no-underline hover:bg-primary/30'
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}

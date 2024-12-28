import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'shared/components/atoms/tabs';
import type { Menu } from './NavbarMobile';
import { cn } from 'shared/utils/cn';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TabMenuProps {
  menus: Menu[];
}

export default function TabMenu({ menus }: TabMenuProps) {
  return (
    <div>
      <Tabs defaultValue={menus[0]?.id} className='flex h-full'>
        <TabsList className='p-4 h-full flex flex-col bg-white px-2'>
          {menus.map((child) => (
            <TabsTrigger
              key={child.id}
              value={child.id}
              className='flex w-full text-base justify-start items-center hover:bg-secondary/10 gap-1 font-bold  cursor-pointer data-[state=active]:bg-primary/90 data-[state=active]:text-white '
            >
              {child?.children?.length ? (
                <p>{child.name}</p>
              ) : (
                <Link href={child.link ?? ''}>{child.name}</Link>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {menus.map((child) => (
          <TabsContent
            key={child.id}
            value={child.id}
            className='px-4 py-4 mt-0  border-l-[1px] border-secondary rounded-none min-w-[520px]'
          >
            <div
              className={cn('flex gap-4', {
                'flex-col ': child.isVertical
              })}
            >
              {child?.children?.map((grandchild) => (
                <div key={grandchild.id} className='pr-8'>
                  <h3
                    className={cn(
                      'text-base text-gray-600 font-semibold px-2',
                      {
                        'cursor-pointer hover:text-primary hover:underline ':
                          child.isVertical
                      }
                    )}
                  >
                    {grandchild.name}
                  </h3>
                  <div className='flex flex-col mt-2 space-y-1 '>
                    {grandchild.children?.map((greatGrandchild) => (
                      <Link
                        key={greatGrandchild.id}
                        href={greatGrandchild.link ?? ''}
                        className='py-2 px-2 w-full text-gray-400  hover:text-primary hover:underline'
                      >
                        {greatGrandchild.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {child?.children?.length ? (
              <Link
                className='mt-6 flex justify-start items-center  text-primary text-lg font-semibold hover:underline '
                key={child.id}
                href={child.link ?? ''}
              >
                See to {child.name} <ChevronRight />
              </Link>
            ) : (
              <></>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

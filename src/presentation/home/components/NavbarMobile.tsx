'use client';
import { useState } from 'react';
import { Button } from 'shared/components/atoms/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from 'shared/components/atoms/sheet';
import { AlignJustify, ChevronRight } from 'lucide-react';

export interface Menu {
  id: string;
  name: string;
  type?: string;
  isVertical?: boolean;
  link?: string;
  children?: Menu[];
}

interface NavbarMobileProps {
  menus: Menu[];
}

export default function NavbarMobile({ menus }: NavbarMobileProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuToggle = (menuId: string) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
  };

  return (
    <div className='lg:hidden'>
      <Sheet>
        <SheetTrigger>
          <Button size={'sm'} variant='outline' className='text-gray-600'>
            <AlignJustify />
          </Button>
        </SheetTrigger>
        <SheetContent className=' flex flex-col justify-between bg-white px-0 pt-10 '>
          <div className='flex flex-col max-h-[calc(100vh-10rem)] overflow-y-auto'>
            {menus.map((item) => (
              <div key={item.id} className='px-4 py-3'>
                <button
                  type='button'
                  className='cursor-pointer hover:text-primary flex justify-between items-center w-full text-left font-bold uppercase text-gray-600'
                  onClick={() => handleMenuToggle(item.id)}
                >
                  <span>{item.name}</span>
                  {item.children && (
                    <ChevronRight
                      className={openMenu === item.id ? 'rotate-90' : ''}
                    />
                  )}
                </button>
                {item.children && openMenu === item.id && (
                  <div className='ml-4 mt-2 '>
                    {item.children.map((child) => (
                      <div key={child.id} className='mb-2'>
                        <p className='text-md text-gray-600 font-semibold'>
                          {child.name}
                        </p>
                        <div className='ml-4 flex flex-col space-y-1'>
                          {child.children?.map((child) => (
                            <div key={child.id}>
                              <h3 className='text-sm text-gray-600 font-semibold'>
                                {child.name}
                              </h3>
                              <div className='flex flex-col mt-2 space-y-1'>
                                {child.children?.map((child) => (
                                  <a
                                    key={child.id}
                                    href={child.link}
                                    className='py-2 px-4 w-full text-gray-500 hover:bg-slate-200'
                                  >
                                    {child.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='ml-4 flex flex-col space-y-1'>
                          {child.children?.map((child) => (
                            <a
                              key={child.id}
                              href={child.link}
                              className='py-2 px-4 w-full text-gray-500 hover:bg-slate-200'
                            >
                              {child.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

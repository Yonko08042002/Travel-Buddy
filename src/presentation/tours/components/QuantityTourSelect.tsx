'use client';

import { Button } from 'shared/components/atoms/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import GuestCounter from './GuestCounter';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'shared/components/atoms/popover';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface QuantityTourSelectProps {
  onChange?: (data: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  register?: UseFormRegisterReturn<'quantity'>;
}

export default function QuantityTourSelect({
  onChange,
  register
}: QuantityTourSelectProps) {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange({ adults, children, infants });
    }
  }, [adults, children, infants, onChange]);

  const increment = (
    setter: Dispatch<SetStateAction<number>>,
    value: number
  ) => {
    setter(value + 1);
  };

  const decrement = (
    setter: Dispatch<SetStateAction<number>>,
    value: number
  ) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='w-full' asChild>
        <div
          className='border py-2 px-3 rounded-lg flex justify-between items-center cursor-pointer'
          {...register} // Đăng ký trường với react-hook-form
        >
          <span className='text-sm'>
            {adults} adults, {children} children, {infants} infants
          </span>
          {open ? (
            <ChevronUp className='h-4 w-4 text-gray-500' />
          ) : (
            <ChevronDown className='h-4 w-4 text-gray-500' />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        className='z-50 w-full min-w-[21rem] bg-white border rounded-lg shadow-lg p-4'
      >
        <div className='flex flex-col gap-4'>
          <GuestCounter
            label='Adults'
            description='From 11 years old above'
            count={adults}
            increment={() => increment(setAdults, adults)}
            decrement={() => decrement(setAdults, adults)}
          />
          <GuestCounter
            label='Children'
            description='From 5 – below 11 years old'
            count={children}
            increment={() => increment(setChildren, children)}
            decrement={() => decrement(setChildren, children)}
          />
          <GuestCounter
            label='Infants'
            description='below 5 years old'
            count={infants}
            increment={() => increment(setInfants, infants)}
            decrement={() => decrement(setInfants, infants)}
          />
        </div>
        <div className='flex justify-end mt-4'>
          <Button
            className='border-none underline font-semibold'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Đóng
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

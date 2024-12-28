'use client';

import { Button } from 'shared/components/atoms/button';
import { Checkbox } from 'shared/components/atoms/checkbox';
import { ShowerHead, Utensils } from 'lucide-react';
import { useState } from 'react';

export default function ActivitiesCard() {
  // State to manage the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle button click
  const handleChooseClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200'>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 p-4'>
          <img
            src='https://via.placeholder.com/400x300'
            alt='Room'
            className='w-full h-56 object-cover rounded-lg'
          />
        </div>

        {/* Room Details */}
        <div className='flex flex-col justify-between w-full md:w-1/2 p-4'>
          <div className='flex flex-col gap-3'>
            <div className='pb-2 flex justify-between items-center border-b'>
              <h3 className='text-xl font-semibold'>Name Activity</h3>
              <Checkbox
                id='terms'
                checked={isChecked}
                onCheckedChange={(checked) => {
                  if (checked === 'indeterminate') {
                    setIsChecked(false);
                  } else {
                    setIsChecked(checked);
                  }
                }}
              />
            </div>
            <div className='py-2'>
              <div className='flex justify-between items-start py-2'>
                <div className='w-2/3'>
                  <p className='text-sm text-wrap text-secondary'>
                    description
                  </p>
                </div>
                <label htmlFor='terms' className='text-right'>
                  <Button
                    className='bg-destructive text-white py-1 px-4 rounded hover:bg-destructive/50 focus:outline-none'
                    onClick={handleChooseClick}
                  >
                    Choose
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-wrap space-x-4 mt-4 text-sm text-gray-600'>
              <div className='flex items-center mb-2 md:mb-0'>
                <ShowerHead className='mr-2' /> Play
              </div>
              <div className='flex items-center'>
                <Utensils className='mr-2' /> Eat
              </div>
            </div>
            <div className='mt-4 text-primary hover:text-primary cursor-pointer'>
              <p>See Activity Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

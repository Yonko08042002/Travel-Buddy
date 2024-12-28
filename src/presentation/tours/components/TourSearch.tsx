'use client';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from 'shared/components/atoms/button';
import SelectLocalTour from './LocalTourSelect';
import SelectDayTour from './DayTourSelect';
import SelectCalendar from './CalendarSelect';

export default function TourSearch() {
  return (
    <div className=' lg:sticky lg:top-[70px] lg:z-30  py-4 px-2 lg:px-28 flex justify-center items-center  '>
      <form className='   w-full rounded-lg bg-white flex flex-col lg:flex-row items-center p-4 gap-4 border-[1px] shadow-xl '>
        <div className='w-full flex items-center bg-white rounded-md border border-gray-300 px-3 py-2 gap-2  '>
          <SelectLocalTour />
          <MapPin className='text-gray-400 ' />
        </div>

        <div className='w-full  flex items-center bg-white rounded-md border border-gray-300 px-3 py-2 gap-2'>
          <SelectCalendar />
          <Calendar className='text-gray-400 ' />
        </div>

        <div className='w-full  flex items-center bg-white rounded-md border border-gray-300 px-3 py-2 gap-2'>
          <SelectDayTour />
          <Calendar className='text-gray-400' />
        </div>

        <Button className='w-full lg:w-max flex gap-2 items-center justify-center bg-primary rounded-md lg:rounded-full lg:p-2  p-4 text-white'>
          <p className='lg:hidden text-lg'>Search</p>
          <Search />
        </Button>
      </form>
    </div>
  );
}

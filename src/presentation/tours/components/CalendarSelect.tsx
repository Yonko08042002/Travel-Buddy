import { Button } from 'shared/components/atoms/button';
import { Calendar } from 'shared/components/molecules/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'shared/components/atoms/popover';
import { cn } from 'shared/utils/cn';
import { format } from 'date-fns';
import React from 'react';

export default function CalendarSelect() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full flex justify-start px-3 text-left font-normal  hover:bg-white hover:text-primary text-black border-',
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'PPP') : 'Select date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  );
}

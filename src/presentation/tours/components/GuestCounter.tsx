import { Button } from 'shared/components/atoms/button';
import { Minus, Plus } from 'lucide-react';

interface GuestCounterProps {
  label: string;
  description: string;
  count: number;
  increment: () => void;
  decrement: () => void;
}

export default function GuestCounter({
  label,
  description,
  count,
  increment,
  decrement
}: GuestCounterProps) {
  return (
    <div className='flex justify-between items-center py-2'>
      <div className=''>
        <p className='font-medium'>{label}</p>
        <p className='text-sm text-gray-500'>{description}</p>
      </div>
      <div className=' flex items-center space-x-2'>
        <Button
          className='rounded-full'
          variant='outline'
          size='icon'
          onClick={decrement}
        >
          <Minus className='size-4 ' />
        </Button>
        <span className='w-2'>{count}</span>
        <Button
          className='rounded-full'
          variant='outline'
          size='icon'
          onClick={increment}
        >
          <Plus className='size-4 ' />
        </Button>
      </div>
    </div>
  );
}

'use client';
import type { Destination } from '@prisma/client';
import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from 'shared/components/atoms/tabs';
import { cn } from 'shared/utils/cn';

interface OurDestinationsCarouselProps {
  destinations: Destination[];
}

export default function OurDestinationsCarousel({
  destinations
}: OurDestinationsCarouselProps) {
  const [activeTab, setActiveTab] = useState(destinations[0]?.id || '');

  return (
    <Tabs
      defaultValue={destinations[0]?.id}
      className='w-full'
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className='bg-transparent justify-start h-full w-full overflow-x-scroll'>
        {destinations.map((destination) => (
          <TabsTrigger
            key={destination.id}
            value={destination.id}
            className={cn(
              'text-gray-600 font-semibold hover:text-gray-800 focus:text-blue-500 rounded-none border-b-2 border-transparent',
              activeTab === destination.id ? 'border-blue-500' : ''
            )}
          >
            {destination.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {destinations.map((destination) => (
        <TabsContent
          key={destination.id}
          value={destination.id}
          className='relative h-96 lg:h-[500px]  bg-cover bg-center p-6'
          style={{ backgroundImage: `url(${destination.image})` }}
        >
          <div className='absolute inset-0 bg-black bg-opacity-30' />
          <div className='relative p-4 text-white'>
            <h3 className='text-2xl font-bold'>{destination.title}</h3>
            <p>{destination.description}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

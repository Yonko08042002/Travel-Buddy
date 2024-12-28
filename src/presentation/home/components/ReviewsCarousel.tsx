'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from 'shared/components/molecules/Carousel';
import StarRating from 'shared/components/atoms/start-rating';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Review } from 'domain/review/review.schema';

dayjs.extend(relativeTime);

interface ReviewsCarouselProps {
  reviews: Review[];
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className='w-full '
    >
      <CarouselPrevious className='absolute left-0 top-1/2 z-40 bg-[#00000080] text-white border-none' />
      <CarouselContent about='' className='p-4 flex gap-4 w-full'>
        {reviews.map((review) => (
          <CarouselItem
            key={review.id}
            className='h-full lg:p-4 p-2 basis-1/2  min-w-full  lg:min-w-[400px]  space-y-2 '
          >
            <div className='h-full '>
              <StarRating size={24} rating={review.rating} />
              <p className=' h-full text-white mt-2 min-h-[100px] max-h-[100px]  italic text-sm line-clamp-4'>
                " {review.text}"
              </p>
            </div>
            <div className='flex  items-center mb-4'>
              <div className='lg:mr-4 mr-1 bg-primary text-white rounded-full h-10 w-10 flex items-center justify-center font-bold'>
                {review.authorName.charAt(0)}
              </div>
              <div className=' text-sm'>
                <h3 className='lg:text-lg font-semibold text-white'>
                  {review.authorName}
                </h3>
                <p className='text-sm text-gray-500'>
                  {dayjs.unix(Number(review.createdAt)).fromNow()}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className='absolute right-0 top-1/2 z-40 bg-[#00000080] text-white border-none' />
    </Carousel>
  );
}

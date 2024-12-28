import { getVideos } from 'application/use-cases/video';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from 'shared/components/molecules/Carousel';

export default async function Videos() {
  const videos = await getVideos();
  return (
    <div className='py-8 px-2 lg:p-12 lg:py-16  flex flex-col  '>
      <h2 className='font-primary text-3xl lg:text-4xl  text-primary  mb-4 lg:mb-6'>
        Videos
      </h2>
      <Carousel className='w-full'>
        <CarouselContent className=' py-4 flex gap-4 w-full '>
          {videos.map((video) => (
            <CarouselItem
              key={video.id}
              className='md:basis-1/2 lg:basis-1/4 shadow-md rounded-xl overflow-hidden'
            >
              <iframe
                title={video.name}
                width='100%'
                height='200'
                src={video.link}
              />
              <p className='p-2  font-semibold'>{video.name}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute top-1/2 transform -translate-y-1/2 left-2 lg:left-4 bg-[#00000080] text-white border-none p-2  rounded-full ' />
        <CarouselNext className='absolute top-1/2 transform -translate-y-1/2 right-2 lg:right-4 bg-[#00000080] text-white border-none p-2 rounded-full ' />
      </Carousel>
    </div>
  );
}

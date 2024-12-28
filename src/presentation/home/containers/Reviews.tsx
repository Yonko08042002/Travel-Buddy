import { getReviews } from 'application/use-cases/review';
import ReviewsCarousel from '../components/ReviewsCarousel';
import { configs } from 'shared/lib/constant';

export default async function Reviews() {
  const reviews = await getReviews();
  return (
    <section className='py-8 md:py-16'>
      <div
        className=' lg:p-16 p-4 bg-cover'
        style={{
          backgroundImage: `url(${configs.backgroundReview.src})`
        }}
      >
        <p className='uppercase text-sm md:text-base text-white'>testimonial</p>
        <h2 className='font-primary text-2xl  md:text-4xl  text-white font-medium  mb-4 lg:mb-6'>
          What customers talk about us
        </h2>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}

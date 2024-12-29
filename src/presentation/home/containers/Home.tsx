import Introduction from '../components/Introduction';
import OurDestinations from './OurDestinations';
import OurStory from './OurStory';
import Reasons from './Reasons';
import Reviews from './Reviews';
import Videos from '../components/Videos';
import BestSellerTours from './BestSellerTours';
import Partners from './Partners';
import OurSustainabilityMission from './OurSustainabilityMission';
import Blogs from './Blogs';

export default function HomeContainer() {
  return (
    <>
      <Introduction />
      <OurStory />
      <BestSellerTours />
      <Reasons />
      <OurDestinations />
      <Partners />
      <Reviews />
      <Blogs />
      <OurSustainabilityMission />
      <Videos />
    </>
  );
}

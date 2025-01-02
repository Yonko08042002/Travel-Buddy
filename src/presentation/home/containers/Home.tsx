import Introduction from "../components/Introduction";
import OurDestinations from "./OurDestinations";
import OurStory from "./OurStory";
import Reasons from "./Reasons";
import Videos from "../components/Videos";
import BestSellerTours from "./BestSellerTours";
import Partners from "./Partners";
import OurSustainabilityMission from "./OurSustainabilityMission";
import Blogs from "./Blogs";
import Reviews from "presentation/review/container/Reviews";

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

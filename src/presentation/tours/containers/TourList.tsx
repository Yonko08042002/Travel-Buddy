import { getBestSellerTours } from 'application/use-cases/tour';
import TourListClient from './TourListClient';

export default async function TourList() {
  const tours = await getBestSellerTours();
  return <TourListClient tours={tours} />;
}

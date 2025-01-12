import { getPurchaseByIdUser } from 'application/use-cases/purchase';
import { getTourById } from 'application/use-cases/tour';
import type { UserWithRoles } from 'application/use-cases/user';

import PurchaseTable from './PurchaseTable';

interface UserProps {
  user: UserWithRoles | null;
}

interface PurchaseWithTour {
  id?: string;
  image?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  tourStyleId?: string;
  timeStart?: Date | null;
  amount: number;
  createdAt: Date;
}

export default async function PurchaseUser({ user }: UserProps) {
  if (!user) {
    return null;
  }

  const purchases = await getPurchaseByIdUser(user.id);
  if (!purchases || purchases.length === 0) {
    return <div>No purchases found.</div>;
  }

  const listPurchase: PurchaseWithTour[] = await Promise.all(
    purchases.map(async (purchase) => {
      const tour = await getTourById(purchase.tourId);
      return {
        ...tour,
        amount: purchase.amount,
        createdAt: purchase.createdAt
      };
    })
  );

  return (
    <div className='w-full '>
      <PurchaseTable data={listPurchase} />
    </div>
  );
}

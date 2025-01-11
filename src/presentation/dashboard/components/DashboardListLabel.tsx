import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from 'shared/components/atoms/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import type { User } from '@prisma/client';
interface ListSale {
  id: string;
  stripePurchaseId: string;
  amount: number;
  userId: string;
  tourId: string;
  createdAt: Date;
  title: string | undefined;
  avatar: string | null | undefined;
  email: string | undefined;
  price: number;
}

type DashboardProps = {
  sales: ListSale[];
  users: User[];
};
export default function DashboardListLabel({ sales, users }: DashboardProps) {
  const totalPrice = sales.reduce(
    (acc, sale) => acc + sale.amount * sale.price,
    0
  );
  const totalUsers = users.length;
  const totalAmount = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalSales = sales.length;

  return (
    <div className='mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='bg-green-600 border-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white'>
            Total Revenue
          </CardTitle>
          <DollarSign className='h-4 w-4 text-white' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'> {totalPrice} VND</div>
        </CardContent>
      </Card>
      <Card className='bg-primary border-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white'>
            Subscriptions
          </CardTitle>
          <Users className='h-4 w-4 text-white' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'> {totalUsers}</div>
        </CardContent>
      </Card>
      <Card className='bg-green-600 border-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white'>
            Sales
          </CardTitle>
          <CreditCard className='h-4 w-4 text-white' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'> {totalAmount}</div>
        </CardContent>
      </Card>
      <Card className='bg-primary border-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-white'>
            Transaction
          </CardTitle>
          <Activity className='h-4 w-4 text-white' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-white'> {totalSales}</div>
        </CardContent>
      </Card>
    </div>
  );
}

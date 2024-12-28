import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from 'shared/components/atoms/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from 'shared/components/atoms/card';

export const metadata = {
  title: 'Checkout Success Page'
};

export default function CheckoutSuccesPage({
  searchParams
}: {
  searchParams: { session_id: string; tour_id: string };
}) {
  const { session_id } = searchParams;

  return (
    <div className='container mx-auto py-12 px-4'>
      <Card className='max-w-2xl mx-auto'>
        <CardHeader className='text-center'>
          <CheckCircle className='size-16 text-green-500 mx-auto mb-4' />
          <CardTitle className='text-3xl font-bold text-green-700'>
            Purchase Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className='text-center space-y-6'>
          <p className='text-xl text-gray-600'>
            Thank you for enrolling our tour. We hope you enjoy it!
          </p>

          <div className='bg-gray-100 p-4 rounded-md'>
            <p className='text-sm text-gray-500'>
              Transaction ID: {session_id}
            </p>
          </div>
          <div className='flex justify-center gap-4'>
            <Link href='/tours'>
              <Button variant='outline' className='w-full sm:w-auto'>
                Browse More Tours
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';
import type { TourType } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from 'shared/components/atoms/button';
import { toast } from 'sonner';

interface CheckoutItem {
  amount: number | null;
  id?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  duration?: number | undefined;
  tourType?: TourType | undefined;
  tourStyleId?: string | undefined;
  timeStart?: Date | null | undefined;
}

interface CheckoutListProps {
  items: CheckoutItem[];
}
export function Checkout({ items }: CheckoutListProps) {
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  if (!items || items.length === 0) {
    return (
      <div className='p-8 text-center'>
        <p> fail </p>
      </div>
    );
  }
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.amount ?? 0) * (item.price ?? 0),
    0
  );
  async function checkout() {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to checkout');
      }

      const { checkoutUrl } = await response.json();

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('Checkout URL is not available');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='h-screen p-8 flex gap-2'>
        <ul className='space-y-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto'>
          {items.map((item) => (
            <li
              key={item.id}
              className='border p-4 rounded-md flex gap-4 items-center'
            >
              <img
                src={item.image}
                alt={item.title}
                className='w-24 h-24 object-cover rounded-md'
              />
              <div>
                <h3 className='font-semibold text-lg'>{item.title}</h3>
                <p className='text-sm text-gray-600'>{item.description}</p>
                <p>
                  {t('Cart_tour.price')}: {item.price?.toLocaleString('vi-VN')}{' '}
                  VND
                </p>
                <p>
                  {t('Cart_tour.Amount')}: {item.amount}
                </p>
              </div>
            </li>
          ))}
          <p className='py-2 border-t-[2px] text-lg text-red-600 w-full text-right'>
            Tổng Giá: {totalPrice.toLocaleString('VND')} VND
          </p>
        </ul>
        <Button onClick={checkout} disabled={loading}>
          {loading
            ? `${t('buttonWeb.placing')}...`
            : `${t('buttonWeb.Place_order')}`}
        </Button>
      </div>
    </>
  );
}

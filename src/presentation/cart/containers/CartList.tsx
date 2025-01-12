'use client';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from 'shared/components/atoms/button';
import { Input } from 'shared/components/atoms/input';

interface CartItem {
  amount: number | null;
  id?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

interface CartListProps {
  carts: CartItem[];
}

interface UpdateForm {
  amount: number;
}

export function CartList({ carts }: CartListProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(carts);
  const t = useTranslations();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className='p-8 text-center'>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<UpdateForm> = async (data, event) => {
    const formElement = event?.target as HTMLFormElement;
    const tourId = formElement?.dataset?.tourId;

    setLoading(tourId ?? null);
    setError(null);

    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tourId,
          amount: data.amount
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to update cart');
      }

      const updatedCartTour = await response.json();
      carts = cartItems.map((cart) =>
        cart.id === tourId ? { ...cart, amount: updatedCartTour.amount } : cart
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  const removeCartItem = async (tourId: string) => {
    setLoading(tourId);
    setError(null);
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Error.delete_failed');
      }

      const updatedCartResponse = await fetch('/api/cart', { method: 'GET' });

      if (!updatedCartResponse.ok) {
        throw new Error('Error.fetch_cart_failed');
      }

      const updatedCart = await updatedCartResponse.json();
      setCartItems(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error.generic');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='h-screen p-8  flex gap-2'>
      <ul className='space-y-4 w-full max-h-[calc(100vh-200px)] overflow-y-auto'>
        {carts.map((cart) => {
          const { register, handleSubmit, setValue, getValues, formState } =
            // biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
            useForm<UpdateForm>({
              defaultValues: {
                amount: cart.amount || 1
              }
            });

          const changeAmount = (amountChange: number) => {
            const currentAmount = getValues('amount');
            const newAmount = Math.max(1, currentAmount + amountChange);
            setValue('amount', newAmount);
          };

          return (
            <form
              onSubmit={handleSubmit(onSubmit)}
              data-tour-id={cart.id}
              key={cart.id}
              className='relative w-full border p-4 pr-8 rounded-md flex gap-4 items-center'
            >
              <img
                src={cart.image}
                alt={cart.title}
                className='w-24 h-24 object-cover rounded-md'
              />
              <div className='w-full flex justify-between'>
                <div className=' flex flex-col gap-2 w-5/6'>
                  <h3 className='font-semibold text-lg'>{cart.title}</h3>
                  <p className=' text-sm text-gray-600'>{cart.description}</p>
                </div>
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-4'>
                    <Button
                      type='submit'
                      onClick={() => changeAmount(-1)}
                      disabled={loading === cart.id}
                    >
                      -
                    </Button>

                    <Input
                      className='w-16 text-center'
                      id='amount'
                      {...register('amount', {
                        valueAsNumber: true,
                        required: 'Amount is required',
                        min: { value: 1, message: 'Amount must be at least 1' }
                      })}
                      type='number'
                      disabled={loading === cart.id}
                    />

                    <Button type='submit' onClick={() => changeAmount(1)}>
                      +
                    </Button>
                  </div>
                  <p className='text-red-500'>
                    {t('Cart_tour.price')}: {cart.price?.toLocaleString('VND')}{' '}
                    VND
                  </p>
                  <Button
                    className='absolute right-0 top-0 border-none p-0 h-max'
                    variant={'outline'}
                    onClick={() => removeCartItem(cart.id ?? '')}
                    disabled={loading === cart.id}
                  >
                    <X />
                  </Button>
                  {formState.errors.amount && (
                    <p className='text-sm mt-2 text-red-500'>
                      {formState.errors.amount.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          );
        })}
      </ul>
      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}{' '}
      <div className='text-right mt-4'>
        <Link href='/checkout'>
          <Button>{t('buttonWeb.check_out')}</Button>
        </Link>
      </div>
    </div>
  );
}

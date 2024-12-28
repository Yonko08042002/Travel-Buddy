'use client';

import { Input } from 'shared/components/atoms/input';
import InputPassword from 'shared/components/molecules/InputPassword';
import { configs } from 'shared/lib/constant';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { LoadingButton } from 'shared/components/molecules/LoadingButton';
import { RegisterSchema } from 'application/schemas/register';
import { GoogleButton } from 'shared/components/molecules/GoogleButton';
import { FacebookButton } from 'shared/components/molecules/FacebookButton';
import { signIn } from 'next-auth/react';

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoginLoading, setIsSocialLoginLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        })
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error);
      }

      toast.success('Registered successfully');
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = () => {
    setIsSocialLoginLoading(true);
    signIn('google');
  };

  const handleSignInWithFacebook = () => {
    setIsSocialLoginLoading(true);
    signIn('facebook');
  };

  return (
    <div className='justify-center items-center h-screen flex '>
      <div className='p-5 lg:px-10 lg:py-16 gap w-full md:w-1/2 h-full bg-white flex flex-col items-center overflow-y-auto'>
        <Image
          className='w-32 max-w-full'
          src={configs.logo}
          alt='logo Travel Buddy'
        />

        <form
          onSubmit={handleSubmit(handleRegister)}
          className='mt-6 px-1 lg:px-4 w-full flex flex-col gap-3'
        >
          <h1 className='text-3xl text-primary text-medium text-start font-bacasime-antique font-normal'>
            Create your account
          </h1>
          <div className='w-full flex gap-4'>
            <div className='w-full flex flex-col gap-1'>
              <p className='text-black text-sm font-semibold'>Name</p>
              <Input placeholder='Enter your name ' {...register('name')} />
              {errors.name?.message && (
                <span className='text-red-500 text-sm'>
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-black text-sm font-semibold'>Email</p>
            <Input placeholder='Enter your email ' {...register('email')} />
            {errors.email?.message && (
              <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
          <InputPassword
            label='Password'
            placeholder='Enter password'
            {...register('password')}
          />
          {errors.password?.message && (
            <span className='text-red-500 text-sm'>
              {errors.password.message}
            </span>
          )}

          <LoadingButton
            className='mt-8 w-full rounded-none '
            type='submit'
            loading={isLoading}
          >
            Create an account
          </LoadingButton>
          <p className='w-full text-center text-sm text-gray-600'>OR</p>
          <div className='flex flex-col md:flex-row gap-4 '>
            <GoogleButton
              type='button'
              onClick={handleSignInWithGoogle}
              loading={isSocialLoginLoading}
            >
              Sign in with Google
            </GoogleButton>
            <FacebookButton
              type='button'
              onClick={handleSignInWithFacebook}
              loading={isSocialLoginLoading}
            >
              Sign in with Facebook
            </FacebookButton>
          </div>
        </form>
        <div className='mt-8 flex justify-center gap-2 text-sm'>
          <p>Already have an account?</p>
          <Link
            href={'/login'}
            className='text-primary font-semibold hover:underline'
          >
            Sign in
          </Link>
        </div>
      </div>
      <div className='hidden lg:block md:w-1/2 h-full relative'>
        <Image
          className='w-full h-full object-cover'
          src={configs.backgroundLogin}
          alt='bgr Travel Buddy'
        />
      </div>
    </div>
  );
};

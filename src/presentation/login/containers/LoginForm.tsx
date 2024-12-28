"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { configs } from "shared/lib/constant";
import Image from "next/image";
import { Input } from "shared/components/atoms/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputPassword from "shared/components/molecules/InputPassword";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "shared/components/molecules/LoadingButton";
import { FacebookButton } from "shared/components/molecules/FacebookButton";
import { GoogleButton } from "shared/components/molecules/GoogleButton";
import { LoginSchema } from "application/schemas/login";
import { Button } from "shared/components/atoms/button";
import { useTranslations } from "next-intl";

export const LoginForm = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoginLoading, setIsSocialLoginLoading] = useState(false);
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      const callbackUrl = searchParams.get("from") || "/admin";

      toast.success("Login successfully!");
      push(callbackUrl);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithFacebook = () => {
    setIsSocialLoginLoading(true);
    signIn("facebook");
  };

  const handleSignInWithGoogle = () => {
    setIsSocialLoginLoading(true);
    signIn("google");
  };

  return (
    <div className="justify-center items-center h-screen flex">
      <div className="p-5 lg:px-10 lg:py-16 gap w-full md:w-1/2 h-full bg-white flex flex-col items-center">
        <Image
          className="w-32 max-w-full"
          src={configs.logo}
          alt="logo Travel Buddy"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 px-1 lg:px-4 w-full flex flex-col gap-3"
        >
          <h1 className="text-3xl text-primary text-medium text-start font-bacasime-antique font-normal">
            Login to your account
          </h1>
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-black text-sm font-semibold">Email</p>
            <Input
              placeholder="Enter your email "
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-destructive text-sm">
                {errors.email?.message}
              </span>
            )}
          </div>
          <InputPassword
            label="Password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password?.message && (
            <span className="text-destructive text-sm">
              {errors.password?.message}
            </span>
          )}
          <Button
            variant={"link"}
            className="w-max text-black text-sm font-semibold p-0"
          >
            Forgot password?
          </Button>

          <LoadingButton
            className="mt-8 w-full rounded-none"
            type="submit"
            loading={isLoading}
          >
            Sign in
          </LoadingButton>
          <p className="w-full text-center text-sm text-gray-600">OR</p>
          <div className="flex flex-col md:flex-row gap-4 ">
            <GoogleButton
              type="button"
              onClick={handleSignInWithGoogle}
              loading={isSocialLoginLoading}
            >
              Sign in with Google
            </GoogleButton>
            <FacebookButton
              type="button"
              onClick={handleSignInWithFacebook}
              loading={isSocialLoginLoading}
            >
              Sign in with Facebook
            </FacebookButton>
          </div>
        </form>

        <div className="mt-8 flex justify-center gap-2 text-sm">
          <p>Don't you have an account?</p>
          <Link
            href={"/register"}
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div className="hidden lg:block md:w-1/2 h-full relative">
        <Image
          className="w-full h-full object-cover"
          src={configs.backgroundLogin}
          alt="bgr Travel Buddy"
        />
      </div>
    </div>
  );
};

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import Link from "next/link";
import { ButtonSignIn } from '@/components/ui';

type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      // callbackUrl: "http://localhost:3000/dashboard",
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Inicio de sesión satisfactorio.");
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Failed! Check you input and try again");
      toast.error("¡Fallido! Comprueba tu entrada y vuelve a intentarlo.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Welcome, Back!</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
            {error}
          </p>
        )}
        <div className="flex flex-col my-2">
          <Input type="text" placeholder="Email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col my-2">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex justify-end mb-5">
          <Link
            href="/auth/forget-password"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            forgot password?
          </Link>
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Login"}
        </Button>
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">dont have account?</p>
          <Link
            href="/auth/register"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Register
          </Link>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ButtonSignIn icon={RiGoogleFill} provider="google">
            Google
          </ButtonSignIn>
          <ButtonSignIn icon={RiFacebookFill} provider="facebook">
            Facebook
          </ButtonSignIn>
          <ButtonSignIn icon={RiGithubFill} provider="github">
            Github
          </ButtonSignIn>
        </div>
      </form>
    </div>
  );
}

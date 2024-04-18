"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";
import { signIn } from "next-auth/react";
import AuthButton from '@/components/ui/buttonSignIn';

type LoginData = {
  email: string;
  password: string;
};

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Verificamos si el resultado de signIn es definido y si tiene un error
    if (res && res.error) {
      // Si hay un error, lo establecemos en el estado
      setError(res.error.toString());
    } else {
      // Si no hay error o res es undefined, redirigimos al usuario a la página de dashboard
      router.push("/dashboard");
      router.refresh();
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
        <Input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs relative left-1 -top-5">{errors.email.message}</span>
        )}
        <Input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs relative left-1 -top-5">
            {errors.password.message}
          </span>
        )}
        <div className="flex justify-end mb-5">
          <button
            type="button"
            onClick={() => router.push("/auth/forgot-password")}
            className="text-gray-500 hover:text-primary hover:font-semibold transition-colors duration-300"
          >
            forgot password?
          </button>
        </div>
        <Button type="submit" label="Login" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">dont have account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Register
          </button>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <AuthButton icon={RiGoogleFill} provider="google">Google</AuthButton>
          <AuthButton icon={RiFacebookFill} provider="facebook">Facebook</AuthButton>
          <AuthButton icon={RiGithubFill} provider="github">Github</AuthButton>
        </div>
      </form>
    </div>
  );
};

export default Form;

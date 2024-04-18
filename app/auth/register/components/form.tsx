"use client";

import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import AuthButton from "@/components/ui/buttonSignIn";
import { RiGoogleFill, RiFacebookFill, RiGithubFill } from "react-icons/ri";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form: FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }

    console.log(res);
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Register</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email and password to enter the application
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
        />
        {errors.username && (
          <span className="text-red-500 text-xs relative left-1 -top-5">
            {errors.username.message}
          </span>
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
        <Input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-xs relative left-1 -top-5">
            {errors.confirmPassword.message}
          </span>
        )}
        <Button type="submit" label="Create account" />
        <div className="mt-5 mb-10 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="font-semibold hover:text-primary transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div className="mb-5">
          <hr className="border-2" />
          <div className="flex justify-center">
            <span className="bg-white px-8 -mt-3">or</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <AuthButton icon={RiGoogleFill} provider="google">
            Google
          </AuthButton>
          <AuthButton icon={RiFacebookFill} provider="facebook">
            Facebook
          </AuthButton>
          <AuthButton icon={RiGithubFill} provider="github">
            Github
          </AuthButton>
        </div>
      </form>
    </div>
  );
};

export default Form;

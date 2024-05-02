"use client";

import { Button, Input } from "@/components/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/schemas/authSchema";
import { toast } from "sonner";

type ForgetPasswordData = {
  email: string;
};

export default function ForgotPasswordForm () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ForgetPasswordData> = async (data) => {

    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Por favor revisar link en tu bandeja de correo.");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Fallido! Comprueba tu entrada y vuelve a intentarlo.");
      }
    } catch (error) {
      toast.error("¡Fallido! Comprueba tu entrada y vuelve a intentarlo.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Forgot password?</h2>
        <p className="text-gray-500 text-sm">
          Please enter your email to create new password
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-2">
          <Input type="text" placeholder="Email" {...register("email")}/>
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
        </Button>
        <div className="mt-5 mb-5 flex items-center justify-center gap-x-2">
          <p className="text-gray-500">have account?</p>
          <Link
            href="/auth/login"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
        <div className="flex items-center justify-center gap-x-2">
          <p className="text-gray-500">Dont have account?</p>
          <Link
            href="/auth/register"
            className="font-semibold hover:text-primary-600 transition-colors duration-300"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

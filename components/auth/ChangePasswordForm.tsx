"use client";

import { Button, Input } from "@/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/authSchema";
import { toast } from "sonner";

type ChangePasswordData = {
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
    const token = searchParams.get("token");

    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Agregamos el token al encabezado de autorización
        },
      });

      if (res.ok) {
        toast.success("Se cambió la contraseña correctamente.");
        router.push("/auth/login");
        router.refresh();
      } else {
        throw new Error("Fallido! Comprueba tu entrada y vuelve a intentarlo.");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      toast.error("¡Fallido! Comprueba tu entrada y vuelve a intentarlo.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Change password</h2>
        <p className="text-gray-500 text-sm">
          Please enter your new password to enter the application
        </p>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-2">
          <Input
            type="password"
            placeholder="Nueva contraseña"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-xs">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="flex flex-col my-2">
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Cambiar Contraseña"}
        </Button>
      </form>
    </div>
  );
}

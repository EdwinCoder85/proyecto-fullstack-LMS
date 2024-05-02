"use client";

import React from "react";
import { Card, Label, Button, Input, Textarea } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createCategorySchema } from "@/schemas/categorySchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
  description: string;
};

export default function CategoryForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Categoría creada");
        router.push("/dashboard/categories");
        router.refresh();
      } else {
        toast.error("Error al crear categoría");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al crear categoría");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-96">
          <Label>Nombre de Categoría</Label>
          <Input type="text" placeholder="Nombre" {...register("name")} />
          {errors.name && (
            <span className="text-red-500 text-xs relative left-1">
              {errors.name.message}
            </span>
          )}
          <Label>Descripción de Categoría</Label>
          <Textarea
            rows={5}
            placeholder="Describe tu categoria"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-xs relative left-1">
              {errors.description.message}
            </span>
          )}
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Crear Categoría"}
        </Button>
      </form>
    </Card>
  );
}

"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCategorySchema } from "@/schemas/categorySchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  id: string;
  name: string;
  description: string;
};

export default function Edit({ id, name, description }: FormData) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    description: description,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Categoría actualizada");
        router.push("/dashboard/categories");
        router.refresh();
      } else {
        toast.error("Error al actualizar categoría");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar categoría");
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-96">
          <Label>Nombre de la Categoría</Label>
            <Input
              type="text"
              placeholder="Nombre"
              {...register("name")}
              defaultValue={formData.name}
            />
            {errors.name && (
              <span className="text-red-500 text-xs relative left-1">
                {errors.name.message}
              </span>
            )}
            <Label>Descripción de la Categoría</Label>
            <Textarea
              rows={5}
              placeholder="Describe tu categoria"
              {...register("description")}
              defaultValue={formData.description}
            />
            {errors.description && (
              <span className="text-red-500 text-xs relative left-1">
                {errors.description.message}
              </span>
            )}
          </div>
            <Button
              type="submit"
              className="block mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Actualizar Categoría"}
            </Button>
          </form>
      </Card>
    </section>
  );
}

"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createProductSchema } from "@/schemas/courseSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Category } from "@prisma/client";
import { ChangeEvent, useState } from "react";

interface Props {
  categories: Category[];
}

type FormData = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  categories: string;
  vote: number;
  bestSeller?: boolean;
};

export default function CourseForm({ categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      oldPrice: 0,
      vote: 1,
      bestSeller: false,
    },
  });
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>();
  const [selectedFile, setSelectedFile] = useState<string>(
    "Seleccionar archivo"
  );

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setFile(e.target.files?.[0]);
    } else {
      setSelectedFile("Seleccionar archivo");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await result.json();
        data.imageUrl = uploadData.secure_url;
      }

      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/dashboard/courses");
      router.refresh();

      if (res.ok) {
        toast.success("Curso creado");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-x-4">
          <div className="w-96">
            <Label>Nombre del Curso</Label>
            <Input
              type="text"
              placeholder="Nombre"
              {...register("title")}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">
                {errors.title.message}
              </span>
            )}
            <Label>Descripción</Label>
            <Textarea
              rows={5}
              placeholder="Describe tu curso"
              {...register("description")}
              disabled={isSubmitting}
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
            <Label>Precio Actual</Label>
            <Input
              type="number"
              step="any"
              {...register("price", {
                setValueAs: (value) => Number(value),
              })}
              placeholder="12.00"
            />
            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
            <Label>Precio Antiguo</Label>
            <Input
              type="number"
              step="0.01"
              {...register("oldPrice", {
                setValueAs: (value) => Number(value),
              })}
              placeholder="12.00"
            />
            {errors.oldPrice && (
              <span className="text-red-500 text-xs">
                {errors.oldPrice.message}
              </span>
            )}
            <Label>Voto</Label>
            <Input
              type="number"
              {...register("vote", {
                setValueAs: (value) => Number(value),
              })}
              placeholder="1"
            />
            {errors.vote && (
              <span className="text-red-500 text-xs">
                {errors.vote.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <Label>Categoría</Label>
            <select
              className="bg-gray-100 rounded-xl w-full px-4 py-3 mb-2 outline-none"
              {...register("categories")}
            >
              {categories.map((category) => (
                <option className="" key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && (
              <span className="text-red-500 text-xs">
                {errors.categories.message}
              </span>
            )}
            <div className="flex items-center gap-x-4">
              <Input
                type="checkbox"
                className="border text-lg rounded w-6 h-6 border-gray-200 text-blue-600 focus:ring-0 focus:outline-none focus:ring-offset-0 disabled:text-gray-200 disabled:cursor-not-allowed"
                {...register("bestSeller")}
              />
              <Label>¿Es el curso más vendido?</Label>
              {errors.bestSeller && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.bestSeller.message}
                </p>
              )}
            </div>
            <Label>Imagen</Label>
            <Input
              type="file"
              {...register("imageUrl", {
                required: true,
                onChange: handleFileInputChange,
              })}
            />
            <div className="flex gap-x-4">
              {errors.imageUrl ? (
                <span className="text-red-500 text-xs">
                  {errors.imageUrl.message}
                </span>
              ) : (
                <span
                  className="mt-1 text-sm text-primary dark:text-gray-900"
                  id="imageUrl_error"
                >
                  JPG, JPGE, PNG o WEBP (10MB Max).
                </span>
              )}
            </div>
            <div className="bg-gray-100 rounded-xl p-4 my-4 h-60">
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Uploaded file"
                  className="w-80 h-40 object-cover mx-auto"
                  width={100}
                  height={100}
                />
              )}
              {selectedFile === "Seleccionar archivo" ? (
                <label
                  htmlFor="photo"
                  className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-secondInk
            text-slate-700 hover:bg-secondInk-700 text-center transition-colors"
                >
                  Seleccionar archivos
                </label>
              ) : (
                <label
                  htmlFor="photo"
                  className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-thirdInk-300
            text-secondInk hover:bg-thirdInk-700 text-center transition-colors"
                >
                  {selectedFile}
                </label>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="block mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Crear Curso"}
        </Button>
      </form>
    </Card>
  );
}

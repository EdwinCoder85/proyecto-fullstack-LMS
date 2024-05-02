"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import Select from "react-select";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createProductSchema } from "@/schemas/courseSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Category } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

interface FormData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice: number;
  categoryId: string;
  vote: string;
  categories: Category[];
  bestSeller?: boolean;
}

export default function Edit({
  id,
  title,
  description,
  imageUrl,
  price,
  oldPrice,
  categoryId,
  vote,
  categories,
  bestSeller,
}: FormData) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: id,
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    oldPrice: oldPrice,
    categoryId: categoryId,
    vote: vote,
    categories: categories,
    bestSeller: bestSeller,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    formData.categoryId
  );
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    formData.imageUrl
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createProductSchema),
  });

  const [file, setFile] = useState<File | undefined>();
  const [selectedFile, setSelectedFile] = useState<string>(
    "Seleccionar archivo"
  );

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(formData.imageUrl);
    }
  }, [file, formData.imageUrl]);

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

      const res = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Curso actualizado");
        router.push("/dashboard/courses");
        router.refresh();
      } else {
        toast.error("Error al actualizar curso");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar curso");
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setFile(e.target.files?.[0]);
    } else {
      setSelectedFile("Seleccionar archivo");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form className="w-full select-none" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-4">
            <div className="w-96">
              <Label>Nombre del Curso</Label>
              <Input
                type="text"
                placeholder="Nombre"
                {...register("title")}
                defaultValue={formData.title}
              />
              {errors.title && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.title.message}
                </span>
              )}
              <Label>Descripción</Label>
              <Textarea
                rows={5}
                placeholder="Describe tu curso"
                {...register("description")}
                defaultValue={formData.description}
              />
              {errors.description && (
                <span className="text-red-500 text-xs relative left-1">
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
                defaultValue={formData.price}
              />
              {errors.price && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.price.message}
                </span>
              )}
              <Label>Precio Antiguo</Label>
              <Input
                type="number"
                step="any"
                {...register("oldPrice", {
                  setValueAs: (value) => Number(value),
                })}
                placeholder="12.00"
                defaultValue={formData.oldPrice}
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
                defaultValue={formData.vote}
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
                value={selectedCategory}
                {...register("categories")}
                // {...register("categories", {
                //   required: true,
                //   onChange: handleChange,
                // })}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option className="" key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categories && (
                <span className="text-red-500 text-xs relative left-1">
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
              {/* <Input
            type="file"
            {...register("imageUrl", {
              required: true,
              onChange: handleFileInputChange,
            })}
          /> */}
              <Input
                type="file"
                {...register("imageUrl")}
                onChange={handleFileInputChange}
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
                {previewUrl && (
                  <div className="bg-gray-100 rounded-xl p-4 my-4">
                    <Image
                      src={previewUrl}
                      alt="Imagen cargada"
                      className="w-80 h-40 object-cover mx-auto"
                      width={400}
                      height={400}
                    />
                  </div>
                )}
                {selectedFile === "Seleccionar archivo" ? (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-secondInk
            text-white hover:bg-secondInk-700 cursor-pointer text-center transition-colors"
                  >
                    Seleccionar archivo
                  </label>
                ) : (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-thirdInk-300
            text-secondInk hover:bg-thirdInk-700 cursor-pointer text-center transition-colors"
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
    </section>
  );
}

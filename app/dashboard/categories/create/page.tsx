import CategoryForm from "@/components/categories/CategoryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextfull - Crear Categoría",
  description: "Crear una nueva categoría",
};

export default function CategoryPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <CategoryForm />
    </section>
  );
}
import CourseForm from "@/components/courses/CourseForm";
import { Metadata } from "next";
import prisma from "@/libs/db";

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

export default async function CoursePage() {
  const categories  = await prisma.category.findMany();

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <CourseForm categories ={categories} />
    </section>
  );
}
import { Metadata } from "next";
import prisma from "@/libs/db";
import Edit from '../Edit';

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

interface Params {
  params: { id: string };
}

export default async function CoursePage({ params: { id } }: Params) {
  const categories  = await prisma.category.findMany();

  try {
    const course = await prisma.course.findUnique({
      where:{
          id: id
      }
  })

  if(!course){
      return <div>Course id not fount</div>
  }
  return(
      <div>
          <Edit {...course } categories ={categories}  />
      </div>
  )
  } catch (error) {
    console.log("Error", error);
    return <div>Error fetching course</div>
  }
}
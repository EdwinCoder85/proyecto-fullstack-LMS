import prisma from '@/libs/db';
import { Metadata } from "next";
import Edit from '../Edit';

export const metadata: Metadata = {
  title: "Nextfull - Actualizar Categoría",
  description: "Actualizar una nueva categoría",
};

interface Params {
  params: { id: string };
}

export default async function CategoryPage({ params: { id } }: Params) {
  // return (
  //   <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
  //     <CategoryForm />
  //   </section>
  // );
  try {
    const category = await prisma.category.findUnique({
      where:{
          id: id
      }
  })

  if(!category){
      return <div>Product id not fount</div>
  }

  return(
      <div>
          <Edit {...category} />
      </div>
  )
  } catch (error) {
    console.log("Error", error);
    return <div>Error fetching product</div>
  }
}
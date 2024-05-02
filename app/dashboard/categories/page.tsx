import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import prisma from "@/libs/db";
import { Button } from "@/components/ui";
import CategoriesTable from "@/components/categories/CategoriesTable";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nextfull - Lista de Categoría",
  description: "Lista de Categoría",
};

export default async function DashboardCategoriesPage() {
  const session = await auth();
  const categories = await prisma.category.findMany();
  // Obtener la fecha de creación de la primera categoría
  const createdAt = categories[0].createdAt;

  // Formatear la fecha en un formato corto (dd/mm/yyyy)
  // const formattedDate = new Date(createdAt).toLocaleDateString('es-ES'); // Cambia 'es-ES' según el idioma que prefieras
  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Agregar la fecha formateada a cada objeto de categoría
  const updatedCategories = categories.map((category) => ({
    ...category,
    formattedCreatedAt: formattedDate,
  }));

  if (!session) {
    redirect("/auth/login");
  }

  // if (session.user.role !== "admin") {
  //   redirect("/dashboard");
  // }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 h-[calc(100vh-5.4rem)] w-[calc(100vw-15rem)] overflow-y-scroll select-none">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl text-center font-bold leading-6 text-primary-600">
            Lista de Categorias
          </h1>
          {/* <p className="mt-2 text-sm text-gray-100">Lista de categorias</p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button href="/dashboard/categories/create">Crea Categoria</Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <CategoriesTable categories={updatedCategories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

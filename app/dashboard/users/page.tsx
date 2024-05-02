import prisma from "@/libs/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";
import { auth } from "@/auth.config";
import UserTable from "@/components/users/UsersTable";

export const dynamic = "force-dynamic";

export default async function DashboardUsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany();
  // Obtener la fecha de creación de la primera categoría
  const createdAt = users[0].createdAt;

  // Formatear la fecha en un formato corto (dd/mm/yyyy)
  // const formattedDate = new Date(createdAt).toLocaleDateString('es-ES'); // Cambia 'es-ES' según el idioma que prefieras
  const formattedDate = new Date(createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Agregar la fecha formateada a cada objeto de categoría
  const updatedUsers = users.map((user) => ({
    ...user,
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
            Lista de usuarios
          </h1>
          {/* <p className="mt-2 text-sm text-primary">Lista de usuarios</p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button href="/dashboard/users/create">Crea Usuario</Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <UserTable users={updatedUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

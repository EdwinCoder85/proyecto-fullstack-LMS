import { auth } from "@/auth.config";
import prisma from "@/libs/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";
import CourseTable from "@/components/courses/CoursesTable";

export const dynamic = "force-dynamic";

// async function loadProducts() {
//   const session = await auth();
//   const courses = await prisma.course.findMany({
//     where: {
//       userId: session?.user.id,
//     },
// include: {
//   courseCategory: {
//     include: {
//       category: true,
//     },
//   },
// },
//   });
//   return courses;
// }

export default async function DashboardProductsPage() {
  // const courses = await loadProducts();
  const session = await auth();
  const courses = await prisma.course.findMany();

  const updatedCourses = await Promise.all(
    courses.map(async (course) => {
      const category = await prisma.category.findFirst({
        where: { id: course.categoryId },
      });
      return {
        ...course,
        categoryName: category?.name, // Añade la propiedad categoryName al objeto course
      };
    })
  );

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
            Lista de cursos
          </h1>
          {/* <p className="mt-2 text-sm text-gray-100">Lista de cursos</p> */}
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button href="/dashboard/courses/create">Crea Curso</Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <CourseTable courses={updatedCourses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

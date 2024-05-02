import UserForm from '@/components/users/UserForm';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

export default async function CoursePage() {

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <UserForm/>
    </section>
  );
}
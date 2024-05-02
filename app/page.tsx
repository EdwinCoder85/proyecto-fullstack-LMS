import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Main from "../components/home/Main";
import Courses from "../components/home/Courses";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <section className="h-[calc(100vh-7rem)] select-none">
      <Suspense fallback={<p>Loading feed...</p>}>
        <Main />
      </Suspense>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Courses />
      </Suspense>
    </section>
  );
}

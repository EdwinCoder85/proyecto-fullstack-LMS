import Courses from "@/components/Courses";
import Main from "@/components/Main";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="h-[calc(100vh-7rem)] ">
      {/* <div>
        <h1 className="text-primary font-bold text-5xl">Home Page</h1>
      </div> */}
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
      <Main />
      <Courses />
    </section>
  );
}

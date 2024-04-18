import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

import Link from "next/link";
import { RiHome3Line, RiFirefoxLine, RiLayoutGridLine, RiTeamLine, RiLiveLine, RiDownload2Line, RiSettings3Line, RiCheckboxBlankCircleLine, RiMenu3Fill, RiCloseLine } from "react-icons/ri";

export default async function Dashboard() {

const session = await getServerSession(authOptions)
console.log(session)

if (!session) {
  redirect("/api/auth/signin")
}

  return (
    <section className="w-full flex justify-center items-center bg-slate-300">
      hola
    </section>
  );
}

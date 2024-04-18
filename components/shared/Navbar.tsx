"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

function Navbar() {
  const { data: session, status } = useSession();
  console.log(session)

  return (
    <nav className="flex justify-between items-center bg-primary text-white px-10 py-3">
      <h1 className="text-xl font-bold">Course Programming</h1>

      <ul className="flex items-center justify-center gap-x-8">
        {!session?.user? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">
                <button className="text-primary font-bold bg-white rounded-xl border-2 border-primary px-4 py-2 block mb-2">
                  Signin
                </button>
              </Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button
                className="text-primary font-bold bg-white rounded-xl border-2 border-primary px-4 py-2 mb-2"
                onClick={() => {
                  signOut();
                }}
              >
                Signout
              </button>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <Image
                  src={
                    session?.user?.image
                      ? session.user.image
                      : "https://img.freepik.com/vector-gratis/error-404-persona-que-busca-ilustracion-concepto_114360-7912.jpg?t=st=1712087552~exp=1712091152~hmac=9968e4efc742bb18b70fb25c9ebaff380f86d4ec0687fa2a763e565e760d9d66&w=1380"
                  }
                  height={96}
                  width={96}
                  alt=""
                  className="ml-6 w-10 h-10 rounded-full cursor-pointer"
                />
                <p>{session?.user?.name}</p>
              </div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

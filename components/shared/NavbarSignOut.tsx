"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function NavbarSignOut() {
  const { data: session } = useSession();

  return (
    <nav className="w-full flex justify-between items-center bg-primary-600 text-white px-10 py-3 z-50">
      <h1 className="text-xl font-bold">Course Programming</h1>

      <ul className="flex items-center justify-center gap-x-8">
        <li>
          <button
            className="text-primary-600 font-bold bg-white rounded-xl border-2 border-primary-600 px-4 py-2 mb-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </li>
        <li>
          {session?.user ? (
            <>
              <div className="flex items-center gap-x-2">
                <Image
                  src={
                    session?.user.image
                      ? session.user.image
                      : "https://img.freepik.com/vector-gratis/error-404-persona-que-busca-ilustracion-concepto_114360-7912.jpg?t=st=1712087552~exp=1712091152~hmac=9968e4efc742bb18b70fb25c9ebaff380f86d4ec0687fa2a763e565e760d9d66&w=1380"
                  }
                  height={96}
                  width={96}
                  alt=""
                  className="ml-6 w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col items-end">
                  <p>{session?.user.email}</p>
                  <p className="font-bold">role: {session?.user.role}</p>
                </div>
              </div>
            </>
          ) : (
            "...loading"
          )}
        </li>
      </ul>
    </nav>
  );
}

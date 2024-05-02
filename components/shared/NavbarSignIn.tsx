"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function NavbarSignIn() {

    return (
      <nav className="w-full flex justify-between items-center bg-primary-600 text-white px-10 py-3 z-50">
        <h1 className="text-xl font-bold">Course Programming</h1>

        <ul className="flex items-center justify-center gap-x-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <button
              className="text-primary-600 font-bold bg-white rounded-xl border-2 border-primary-600 px-4 py-2 mb-2"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
          <li>
            <Link href="/auth/register">Register</Link>
          </li>
        </ul>
      </nav>
    );
}

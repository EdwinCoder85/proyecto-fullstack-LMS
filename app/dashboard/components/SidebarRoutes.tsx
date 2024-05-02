"use client";

import { dashboardRoutes } from "@/routes/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames } from "@/libs/classNames";
import { useSession } from "next-auth/react";

export function SidebarRoutes() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div className="flex flex-col w-full gap-y-4">
          {dashboardRoutes.map(
            (item) =>
              item.roles.includes(session?.user.role || "") && (
                <li key={item.text} className="list-none">
                  <Link
                    href={item.href}
                    className={classNames(
                      pathname === item.href
                        ? "bg-white text-primary-600"
                        : "text-primary-600 hover:text-white hover:bg-primary-600",
                      "group flex gap-3 rounded-xl transition-colors py-2 px4 text-base leading-6 font-bold"
                    )}
                  >
                    <item.icon
                      className="mx-4 h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.text}
                  </Link>
                </li>
              )
          )}
        </div>
      ) : (
        "...loading"
      )}
    </>
  );
}

import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export function Button({ children, className, href, ...props }: Props) {
  if (href) {
    return (
      <Link
        href={href}
        className={twMerge(
          "block bg-primary-600 py-2 px-3 rounded-xl text-center text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors duration-300",
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={twMerge(
        "block rounded-md bg-primary-600 py-2 px-3 text-center text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

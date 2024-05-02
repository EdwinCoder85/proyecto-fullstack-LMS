import { ReactNode } from "react";
import Navbar from "@/components/shared/NavbarSignIn";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Toaster } from "sonner";
import { auth } from "@/auth.config";
import NavbarSignOut from "@/components/shared/NavbarSignOut";
import NavbarSignIn from "@/components/shared/NavbarSignIn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();

  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          {session ? <NavbarSignOut /> : <NavbarSignIn />}
          {children}
          <Toaster richColors />
        </body>
      </html>
    </Providers>
  );
}

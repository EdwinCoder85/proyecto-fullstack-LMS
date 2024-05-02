
import { FC, ReactNode } from "react";
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import SwiperAuth from '@/components/swiper/swiper';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {

  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 p-5 mx-auto">
      <section className="hidden h-full lg:h-[calc(100vh-7rem)] lg:flex flex-col items-center justify-center gap-y-5 bg-primary-600 rounded-2xl ">
        <SwiperAuth />
        <div>
          <h3 className="text-white text-4xl font-semibold text-center my-5">
            Help You Switch Careers <br /> To Become a Programmer
          </h3>
          <p className="text-gray-300 text-center text-xl">
            Additional Classes that you can learn
          </p>
          <p className="text-gray-300 text-center">anywhere and anytime!</p>
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;

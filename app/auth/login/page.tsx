import Logo from "@/components/shared/Logo";
import type { Metadata } from 'next';
import LoginForm from '../../../components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Auth',
  description: 'Login | Auth'
}

export default function Login() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Logo />
      <LoginForm />
    </section>
  );
}

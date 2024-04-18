import Logo from "@/components/shared/logo";
import Form from './components/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | Auth',
  description: 'Forgot Password | Auth'
}

export default function ForgotPassword() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Logo />
      <Form />
    </section>
  );
}
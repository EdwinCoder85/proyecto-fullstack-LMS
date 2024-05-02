import Logo from '@/components/shared/Logo';
import type { Metadata } from 'next';
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | Auth',
  description: 'Forgot Password | Auth'
}

export default function ForgotPassword() {
  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Logo />
      <ChangePasswordForm />
    </section>
  );
}
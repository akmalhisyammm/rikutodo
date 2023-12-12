import { APP_NAME, APP_URL } from '@/constants/meta';
import { AuthLayout } from '@/components/layouts';
import { SignUpForm } from '@/components/organisms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  alternates: {
    canonical: '/auth/sign-up',
  },
  openGraph: {
    title: `Sign Up | ${APP_NAME}`,
    url: `${APP_URL}/auth/sign-up`,
  },
};

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;

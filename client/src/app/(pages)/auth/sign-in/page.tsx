import { APP_NAME, APP_URL } from '@/constants/meta';
import { AuthLayout } from '@/components/layouts';
import { SignInForm } from '@/components/organisms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  alternates: {
    canonical: '/auth/sign-in',
  },
  openGraph: {
    title: `Sign In | ${APP_NAME}`,
    description: 'Sign in to your account',
    url: `${APP_URL}/auth/sign-in`,
  },
};

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignIn;

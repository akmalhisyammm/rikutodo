import { APP_NAME, APP_URL } from '@/constants/meta';
import { SignInPage } from '@/components/templates';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  alternates: {
    canonical: '/auth/sign-in',
  },
  openGraph: {
    title: `Sign In | ${APP_NAME}`,
    url: `${APP_URL}/auth/sign-in`,
  },
};

const SignIn = () => {
  return <SignInPage />;
};

export default SignIn;

import { APP_NAME, APP_URL } from '@/constants/meta';
import { HomePage } from '@/components/templates';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  alternates: {
    canonical: '/home',
  },
  openGraph: {
    title: `Home | ${APP_NAME}`,
    url: `${APP_URL}/home`,
  },
};

const Home = () => {
  return <HomePage />;
};

export default Home;

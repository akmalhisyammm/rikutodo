import { APP_NAME, APP_URL } from '@/constants/meta';
import { NotFoundPage } from '@/components/templates';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  alternates: {
    canonical: '/*',
  },
  openGraph: {
    title: `Not Found | ${APP_NAME}`,
    url: `${APP_URL}/*`,
  },
};

const NotFound = () => {
  return <NotFoundPage />;
};

export default NotFound;

import { Open_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { Providers } from '@/app/providers';
import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/constants/meta';

import type { Metadata } from 'next';

type RootLayoutProps = {
  children: React.ReactNode;
};

const font = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    card: 'summary_large_image',
    creator: '@akmalhisyammm',
  },
  authors: {
    name: 'Muhammad Akmal Hisyam',
    url: 'https://akmalhisyam.my.id',
  },
  keywords: ['todo', 'tasks', 'organizer', 'daily', 'planner'],
  creator: 'Muhammad Akmal Hisyam',
  publisher: 'Muhammad Akmal Hisyam',
  generator: 'Next.js',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={font.variable}>
        <NextTopLoader color="#3182CE" showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

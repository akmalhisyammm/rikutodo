import { Open_Sans } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME, APP_URL } from '@/constants/meta';
import { TodoProvider } from '@/contexts/todo';
import { UserProvider } from '@/contexts/user';
import Providers from '@/app/providers';

import type { Metadata } from 'next';

type RootLayoutProps = {
  children: React.ReactNode;
};

const font = Open_Sans({ subsets: ['latin'] });

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
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <UserProvider>
            <TodoProvider>{children}</TodoProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;

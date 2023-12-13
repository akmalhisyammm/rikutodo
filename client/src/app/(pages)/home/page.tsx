import { APP_NAME, APP_URL } from '@/constants/meta';
import { MainLayout } from '@/components/layouts';
import { TodoList, UserGreeting } from '@/components/organisms';

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

const Todos = () => {
  return (
    <MainLayout>
      <UserGreeting />
      <TodoList />
    </MainLayout>
  );
};

export default Todos;

import { APP_NAME, APP_URL } from '@/constants/meta';
import { MainLayout } from '@/components/layouts';
import { TodoFilter, TodoList, UserGreeting } from '@/components/organisms';

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
      <TodoFilter />
      <TodoList />
    </MainLayout>
  );
};

export default Todos;

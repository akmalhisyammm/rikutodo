import { MainLayout } from '@/components/layouts';
import { UserGreeting, TodoList } from '@/components/organisms';

const HomePage = () => {
  return (
    <MainLayout>
      <UserGreeting />
      <TodoList />
    </MainLayout>
  );
};

export default HomePage;

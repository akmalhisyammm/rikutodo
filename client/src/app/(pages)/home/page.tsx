import { MainLayout } from '@/components/layouts';
import { TodoFilter, TodoList, UserGreeting } from '@/components/organisms';

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

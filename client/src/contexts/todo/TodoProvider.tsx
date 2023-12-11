'use client';

import { useContext, useEffect, useMemo, useState } from 'react';

import { TodoContext } from './TodoContext';
import { UserContext } from '@/contexts/user';
import { deleteFetcher, getFetcher, patchFetcher, postFetcher } from '@/utils/fetcher';
import { todoSchema } from '@/utils/schema';

import type { InferType } from 'yup';
import type { Todo } from '@/types/todo';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAuthenticated } = useContext(UserContext);

  const createTodo = async (payload: InferType<typeof todoSchema>) => {
    setIsLoading(true);

    const response = await postFetcher('/api/todos', payload).finally(() => setIsLoading(false));

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    const updatedTodos = [...todos, response.data];

    setTodos(updatedTodos);
  };

  const updateTodo = async (
    id: string,
    payload: InferType<typeof todoSchema> | { isCompleted: boolean },
  ) => {
    setIsLoading(true);

    const response = await patchFetcher(`/api/todos/${id}`, payload).finally(() =>
      setIsLoading(false),
    );

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    const updatedTodos = todos.map((todo) => (todo._id === id ? response.data : todo));

    setTodos(updatedTodos);
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);

    const response = await deleteFetcher(`/api/todos/${id}`).finally(() => setIsLoading(false));

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    const updatedTodos = todos.filter((todo) => todo._id !== id);

    setTodos(updatedTodos);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    getFetcher('/api/todos')
      .then((res) => setTodos(res.status === 'success' ? res.data : []))
      .finally(() => setIsInitializing(false));
  }, [isAuthenticated]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const memoizedValue = useMemo(
    () => ({ todos, isInitializing, isLoading, createTodo, updateTodo, deleteTodo }),
    [todos, isInitializing, isLoading],
  );

  return <TodoContext.Provider value={memoizedValue}>{children}</TodoContext.Provider>;
};

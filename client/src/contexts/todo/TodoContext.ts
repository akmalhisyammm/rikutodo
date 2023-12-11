'use client';

import { createContext } from 'react';

import { todoSchema } from '@/utils/schema';

import type { InferType } from 'yup';
import type { Todo } from '@/types/todo';

type Context = {
  todos: Todo[];
  isInitializing: boolean;
  isLoading: boolean;
  createTodo: (payload: InferType<typeof todoSchema>) => Promise<void | null>;
  updateTodo: (
    id: string,
    payload: InferType<typeof todoSchema> | { isCompleted: boolean },
  ) => Promise<void | null>;
  deleteTodo: (id: string) => Promise<void | null>;
};

export const TodoContext = createContext<Context>({
  todos: [],
  isInitializing: true,
  isLoading: false,
  createTodo: async () => null,
  updateTodo: async () => null,
  deleteTodo: async () => null,
});

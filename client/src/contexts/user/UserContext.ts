'use client';

import { createContext } from 'react';

import {
  changePasswordSchema,
  changeProfileSchema,
  signInSchema,
  signUpSchema,
} from '@/utils/schema';

import type { InferType } from 'yup';
import type { User } from '@/types/user';

type Context = {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  signUp: (payload: InferType<typeof signUpSchema>) => Promise<void | null>;
  signIn: (payload: InferType<typeof signInSchema>) => Promise<void | null>;
  signOut: () => Promise<void | null>;
  changeProfile: (payload: InferType<typeof changeProfileSchema>) => Promise<void | null>;
  changePassword: (payload: InferType<typeof changePasswordSchema>) => Promise<void | null>;
};

export const UserContext = createContext<Context>({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  isLoading: false,
  signUp: async () => null,
  signIn: async () => null,
  signOut: async () => null,
  changeProfile: async () => null,
  changePassword: async () => null,
});

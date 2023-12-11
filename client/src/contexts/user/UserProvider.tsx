'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { UserContext } from './UserContext';
import { getFetcher, patchFetcher, postFetcher } from '@/utils/fetcher';
import {
  changePasswordSchema,
  changeProfileSchema,
  signInSchema,
  signUpSchema,
} from '@/utils/schema';

import type { InferType } from 'yup';
import type { User } from '@/types/user';

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();

  const signUp = async (payload: InferType<typeof signUpSchema>) => {
    setIsLoading(true);

    const response = await postFetcher('/api/auth/register', payload).finally(() =>
      setIsLoading(false),
    );

    if (response.status === 'fail') {
      throw new Error(response.message);
    }
  };

  const signIn = async (payload: InferType<typeof signInSchema>) => {
    setIsLoading(true);

    const response = await postFetcher('/api/auth/login', payload).finally(() =>
      setIsLoading(false),
    );

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    setUser(response.data);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    setIsLoading(true);

    const response = await postFetcher('/api/auth/logout', {
      key: process.env.NEXT_PUBLIC_LOGOUT_KEY,
    }).finally(() => setIsLoading(false));

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  const changeProfile = async (payload: InferType<typeof changeProfileSchema>) => {
    setIsLoading(true);

    const response = await patchFetcher('/api/users/me/change-profile', payload).finally(() =>
      setIsLoading(false),
    );

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    setUser(response.data);
  };

  const changePassword = async (payload: InferType<typeof changePasswordSchema>) => {
    setIsLoading(true);

    const response = await patchFetcher('/api/users/me/change-password', payload).finally(() =>
      setIsLoading(false),
    );

    if (response.status === 'fail') {
      throw new Error(response.message);
    }

    setUser(response.data);
  };

  useEffect(() => {
    if (!pathname.startsWith('/home')) {
      return;
    }

    getFetcher('/api/users/me')
      .then((res) => {
        if (res.status === 'success') {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      })
      .finally(() => setIsInitializing(false));
  }, [pathname]);

  const memoizedValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isInitializing,
      isLoading,
      signUp,
      signIn,
      signOut,
      changeProfile,
      changePassword,
    }),
    [user, isAuthenticated, isInitializing, isLoading],
  );

  return <UserContext.Provider value={memoizedValue}>{children}</UserContext.Provider>;
};

'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { TodoProvider } from '@/contexts/todo';
import { UserProvider } from '@/contexts/user';
import { theme } from '@/styles/theme';

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <TodoProvider>{children}</TodoProvider>
        </UserProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

'use client';

import { Box, VStack, useColorMode } from '@chakra-ui/react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      minHeight="100vh"
      justifyContent="center"
      padding={4}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Box
        as="main"
        textAlign="center"
        width={['full', 400, 500]}
        paddingX={8}
        paddingY={10}
        borderWidth={1}
        borderRadius={12}
        backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        {children}
      </Box>
    </VStack>
  );
};

export default AuthLayout;

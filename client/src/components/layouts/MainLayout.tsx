'use client';

import { Box, Container, useColorMode } from '@chakra-ui/react';

import { Footer, Header } from '@/components/organisms';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      minHeight="100vh"
      paddingBottom={100}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Header />

      <Container
        maxWidth="container.lg"
        position="relative"
        top={85}
        paddingBottom={4}
        centerContent>
        <Box as="main" width="full" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Container>
    </Box>
  );
};

export default MainLayout;

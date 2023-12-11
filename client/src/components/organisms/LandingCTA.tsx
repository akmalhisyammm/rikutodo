'use client';

import { Button, HStack, Heading, VStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { CustomHeading } from '@/components/atoms';

const LandingCTA = () => {
  const router = useRouter();

  return (
    <VStack justifyContent="center" paddingY={24} gap={4}>
      <VStack>
        <HStack gap={4}>
          <CustomHeading as="h1" size={['xl', '3xl', '3xl']} paddingBottom={2}>
            Organize
          </CustomHeading>
          <Heading as="h1" size={['xl', '3xl', '3xl']} paddingBottom={2}>
            your
          </Heading>
        </HStack>
        <CustomHeading as="h1" size={['xl', '3xl', '3xl']} paddingBottom={2}>
          daily tasks
        </CustomHeading>
        <Text marginY={2}>
          Keep track of your daily tasks and never forget to do anything again.
        </Text>
      </VStack>

      <HStack gap={4}>
        <Button
          colorScheme="blue"
          variant="outline"
          size="lg"
          onClick={() => router.push('/auth/sign-in')}>
          Sign In
        </Button>
        <Button colorScheme="blue" size="lg" onClick={() => router.push('/auth/sign-up')}>
          Sign Up
        </Button>
      </HStack>
    </VStack>
  );
};

export default LandingCTA;

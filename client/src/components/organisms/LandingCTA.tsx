'use client';

import { Button, HStack, Heading, VStack, Text } from '@chakra-ui/react';

import { BrandHeading, RouteLink } from '@/components/atoms';

const LandingCTA = () => {
  return (
    <VStack justifyContent="center" textAlign="center" paddingY={32} gap={4}>
      <VStack>
        <HStack gap={4}>
          <BrandHeading as="h1" size="3xl" paddingBottom={2}>
            Organize
          </BrandHeading>
          <Heading as="h1" size="3xl" paddingBottom={2}>
            your
          </Heading>
        </HStack>
        <BrandHeading as="h1" size="3xl" paddingBottom={2}>
          daily tasks
        </BrandHeading>
        <Text marginY={4}>
          Keep track of your daily tasks and never forget to do anything again.
        </Text>
      </VStack>

      <HStack gap={4}>
        <RouteLink href="/auth/sign-in">
          <Button colorScheme="blue" variant="outline" size="lg">
            Sign In
          </Button>
        </RouteLink>
        <RouteLink href="/auth/sign-up">
          <Button colorScheme="blue" size="lg">
            Sign Up
          </Button>
        </RouteLink>
      </HStack>
    </VStack>
  );
};

export default LandingCTA;

import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { FaHome, FaRedo } from 'react-icons/fa';

import { BrandHeading, RouteLink } from '@/components/atoms';

type ErrorPageProps = {
  onReset: () => void;
};

const ErrorPage = ({ onReset }: ErrorPageProps) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      height="100vh"
      gap={2}
      padding={4}>
      <BrandHeading as="h2" size="2xl" padding={[0, 2]}>
        500 | Error
      </BrandHeading>
      <Text>Something went wrong.</Text>
      <HStack marginY={8} gap={4}>
        <Button colorScheme="red" size="lg" leftIcon={<FaRedo />} onClick={onReset}>
          Try Again
        </Button>
        <RouteLink href="/">
          <Button colorScheme="blue" size="lg" leftIcon={<FaHome />}>
            Back to Home
          </Button>
        </RouteLink>
      </HStack>
    </Flex>
  );
};

export default ErrorPage;

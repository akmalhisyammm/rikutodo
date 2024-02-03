'use client';

import { Link, Text, VStack, useColorMode } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      as="footer"
      position="relative"
      width="full"
      borderTopWidth={1}
      borderColor={colorMode === 'light' ? 'gray.400' : 'gray.500'}
      paddingY={4}
      gap={4}>
      <Text>
        {new Date().getFullYear()} &bull;{' '}
        <Link
          href="https://akmalhisyam.my.id"
          paddingY={3}
          _hover={{ color: colorMode === 'light' ? 'blue.500' : 'blue.200' }}
          isExternal>
          Muhammad Akmal Hisyam
        </Link>
      </Text>
    </VStack>
  );
};

export default Footer;

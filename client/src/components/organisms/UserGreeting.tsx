'use client';

import { useContext } from 'react';
import { HStack, Heading } from '@chakra-ui/react';

import { UserContext } from '@/contexts/user';
import { BrandHeading } from '@/components/atoms';
import { greetingMessage } from '@/utils/greeting';

const UserGreeting = () => {
  const { user } = useContext(UserContext);

  return (
    <HStack paddingY={2} justifyContent="center" flexWrap="wrap">
      <Heading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingMessage(user?.username || '')
          .split(' ')
          .slice(0, 2)
          .join(' ')}
      </Heading>
      <BrandHeading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingMessage(user?.username || '').split(' ')[2]}
      </BrandHeading>
      <Heading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingMessage(user?.username || '').split(' ')[3]}
      </Heading>
    </HStack>
  );
};

export default UserGreeting;

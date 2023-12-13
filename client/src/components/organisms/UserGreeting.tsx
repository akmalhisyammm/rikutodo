'use client';

import { useContext } from 'react';
import { HStack, Heading } from '@chakra-ui/react';

import { UserContext } from '@/contexts/user';
import { CustomHeading } from '@/components/atoms';
import { greetingByTime } from '@/utils/greeting';

const UserGreeting = () => {
  const { user } = useContext(UserContext);

  return (
    <HStack paddingY={2} justifyContent="center" flexWrap="wrap">
      <Heading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingByTime(user?.username || '')
          .split(' ')
          .slice(0, 2)
          .join(' ')}
      </Heading>
      <CustomHeading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingByTime(user?.username || '').split(' ')[2]}
      </CustomHeading>
      <Heading as="h1" size={['lg', 'xl', 'xl']}>
        {greetingByTime(user?.username || '').split(' ')[3]}
      </Heading>
    </HStack>
  );
};

export default UserGreeting;

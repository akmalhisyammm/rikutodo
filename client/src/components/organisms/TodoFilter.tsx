'use client';

import { useContext } from 'react';
import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

import { TodoContext } from '@/contexts/todo';

const TodoFilter = () => {
  const { colorMode } = useColorMode();
  const { isLoading } = useContext(TodoContext);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value ? `?search=${e.target.value}` : '';

    router.push(pathname + query);
  };

  const onSortClick = () => {
    const query = !sort || sort === 'asc' ? '?sort=desc' : '?sort=asc';

    router.push(pathname + query);
  };

  return (
    <HStack marginBottom={4}>
      <InputGroup backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <InputLeftElement pointerEvents="none">
          <FaSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search todo..."
          paddingLeft={10}
          value={keyword}
          isDisabled={isLoading}
          onChange={onKeywordChange}
        />
      </InputGroup>

      <IconButton
        aria-label="Sort todo"
        icon={!sort || sort === 'asc' ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
        isDisabled={isLoading}
        onClick={onSortClick}
      />
    </HStack>
  );
};

export default TodoFilter;

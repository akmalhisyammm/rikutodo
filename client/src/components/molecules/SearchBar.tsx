import { InputGroup, InputLeftElement, Input, useColorMode } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  value: string;
  isDisabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ value, isDisabled, onChange }: SearchBarProps) => {
  const { colorMode } = useColorMode();

  return (
    <InputGroup backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
      <InputLeftElement pointerEvents="none">
        <FaSearch />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search todo..."
        paddingLeft={10}
        value={value}
        isDisabled={isDisabled}
        onChange={onChange}
      />
    </InputGroup>
  );
};

export default SearchBar;

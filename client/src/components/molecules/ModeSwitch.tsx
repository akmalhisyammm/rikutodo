import { HStack, Switch, Text } from '@chakra-ui/react';

type ModeSwitchProps = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onSwitch: () => void;
};

const ModeSwitch = ({ isChecked, isDisabled, onSwitch }: ModeSwitchProps) => {
  return (
    <HStack justifyContent="center">
      <Text
        as="small"
        fontWeight={isChecked ? 500 : 700}
        color={isChecked ? 'inherit' : 'green.400'}>
        Read-Only
      </Text>
      <Switch
        colorScheme="green"
        paddingX={1}
        paddingY={6}
        isChecked={isChecked}
        isDisabled={isDisabled}
        onChange={onSwitch}
      />
      <Text
        as="small"
        fontWeight={isChecked ? 700 : 500}
        color={isChecked ? 'green.400' : 'inherit'}>
        CRUD
      </Text>
    </HStack>
  );
};

export default ModeSwitch;

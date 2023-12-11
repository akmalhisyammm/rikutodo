import { HStack, Switch, Text } from '@chakra-ui/react';

type ModeSwitchProps = {
  isChecked?: boolean;
  isDisabled?: boolean;
  onSwitch: () => void;
};

const ModeSwitch = ({ isChecked, isDisabled, onSwitch }: ModeSwitchProps) => {
  return (
    <HStack justifyContent="center" padding={2}>
      <Text
        as="small"
        fontWeight={isChecked ? 400 : 700}
        color={isChecked ? 'inherit' : 'green.400'}>
        Read-Only
      </Text>
      <Switch
        colorScheme="green"
        isChecked={isChecked}
        isDisabled={isDisabled}
        onChange={onSwitch}
      />
      <Text
        as="small"
        fontWeight={isChecked ? 700 : 400}
        color={isChecked ? 'green.400' : 'inherit'}>
        CRUD
      </Text>
    </HStack>
  );
};

export default ModeSwitch;

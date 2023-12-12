'use client';

import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

type ConfirmationAlertProps = {
  title: string;
  description?: string;
  actionText: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmationAlert = ({
  title,
  description,
  actionText,
  isOpen,
  onConfirm,
  onClose,
}: ConfirmationAlertProps) => {
  const alertCancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={alertCancelRef}
      motionPreset="slideInBottom"
      onClose={onClose}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent margin={4}>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={alertCancelRef} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" marginLeft={2} onClick={onConfirm}>
            {actionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlert;

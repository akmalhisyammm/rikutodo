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
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmationAlert = ({
  title,
  description,
  isOpen,
  isLoading,
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

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogBody>{description}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={alertCancelRef} isDisabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            marginLeft={2}
            loadingText="Deleting"
            isLoading={isLoading}
            onClick={onConfirm}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlert;

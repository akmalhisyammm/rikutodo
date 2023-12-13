'use client';

import { useContext } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { UserContext } from '@/contexts/user';
import { changePasswordSchema } from '@/utils/schema';

import type { InferType } from 'yup';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const { signOut, changePassword, isLoading } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<InferType<typeof changePasswordSchema>>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(changePasswordSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onChangePassword = (payload: InferType<typeof changePasswordSchema>) => {
    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      changePassword(payload)
        .then(() => {
          onCloseModal();
          signOut()
            .then(() => setTimeout(() => resolve(router.replace('/auth/sign-in')), 1000))
            .catch((err) =>
              toast({
                title: 'Sign out failed!',
                description: err.message,
                status: 'error',
                duration: 2000,
              }),
            );
        })
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Saving changes...' },
      success: {
        title: 'Password has been changed!',
        description: 'You have successfully changed your password, please sign in again.',
        duration: 2000,
      },
      error: {
        title: 'Failed to change password!',
        description: response.catch((err) => err.message),
        duration: 2000,
      },
    });

    response.catch((err) => {
      if (err.message.toLowerCase().includes('expired')) {
        router.replace('/auth/sign-in');
      }
    });
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent as="form" margin={4} onSubmit={handleSubmit(onChangePassword)}>
        <ModalHeader>Change Password</ModalHeader>

        <ModalBody>
          <VStack marginY={2} gap={4}>
            <FormControl isInvalid={!!errors.currentPassword} isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input type="password" placeholder="••••••••" {...register('currentPassword')} />
              {errors.currentPassword && (
                <FormErrorMessage>{errors.currentPassword.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password} isRequired>
              <FormLabel>New Password</FormLabel>
              <Input type="password" placeholder="••••••••" {...register('password')} />
              {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.passwordConfirm} isRequired>
              <FormLabel>New Password Confirmation</FormLabel>
              <Input type="password" placeholder="••••••••" {...register('passwordConfirm')} />
              {errors.passwordConfirm && (
                <FormErrorMessage>{errors.passwordConfirm.message}</FormErrorMessage>
              )}
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button type="button" mr={2} onClick={onCloseModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="green"
            loadingText="Saving"
            isLoading={isLoading || isSubmitting}
            isDisabled={!isDirty || !isValid}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;

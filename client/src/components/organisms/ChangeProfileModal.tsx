'use client';

import { useContext, useEffect } from 'react';
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
import { changeProfileSchema } from '@/utils/schema';

import type { InferType } from 'yup';

type ChangeProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangeProfileModal = ({ isOpen, onClose }: ChangeProfileModalProps) => {
  const { user, changeProfile, isLoading } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<InferType<typeof changeProfileSchema>>({
    mode: 'onChange',
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
    resolver: yupResolver(changeProfileSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const onChangeProfile = (payload: InferType<typeof changeProfileSchema>) => {
    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      changeProfile(payload)
        .then(() => setTimeout(() => resolve(onClose()), 1000))
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Saving changes...' },
      success: {
        title: 'Profile has been changed!',
        description: 'You have successfully changed your profile.',
        duration: 2000,
      },
      error: {
        title: 'Failed to change profile!',
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

  useEffect(() => {
    if (!user) return;

    reset({ username: user.username, email: user.email });
  }, [user, reset]);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" margin={4} onSubmit={handleSubmit(onChangeProfile)}>
        <ModalHeader>Change Profile</ModalHeader>

        <ModalBody>
          <VStack marginY={2} gap={4}>
            <FormControl isInvalid={!!errors.username} isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" placeholder="Sakura48" {...register('username')} />
              {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="sakura.miyawaki@example.com"
                {...register('email')}
              />
              {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button type="button" mr={2} onClick={onClose}>
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

export default ChangeProfileModal;

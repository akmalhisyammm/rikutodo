'use client';

import { useContext } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { UserContext } from '@/contexts/user';
import { signInSchema } from '@/utils/schema';

import type { InferType } from 'yup';

const SignInForm = () => {
  const { signIn, isLoading } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<InferType<typeof signInSchema>>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(signInSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const onSignIn = (payload: InferType<typeof signInSchema>) => {
    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      signIn(payload)
        .then(() => setTimeout(() => resolve(router.push('/home')), 1000))
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Signing in...' },
      success: {
        title: 'Sign in success!',
        description: 'You have successfully signed in.',
        duration: 2000,
      },
      error: {
        title: 'Sign in failed!',
        description: response.catch((err) => err.message),
        duration: 2000,
      },
    });
  };

  return (
    <VStack gap={8}>
      <Heading>Sign In</Heading>

      <VStack as="form" alignItems="stretch" width="full" gap={4} onSubmit={handleSubmit(onSignIn)}>
        <FormControl isInvalid={!!errors.username} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Rikud0u" {...register('username')} />
          {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          loadingText="Signing In"
          isLoading={isLoading || isSubmitting}
          isDisabled={!isDirty || !isValid}>
          Sign In
        </Button>
      </VStack>

      <Text>
        Don&apos;t have an account?{' '}
        <Button variant="link" colorScheme="blue" onClick={() => router.push('/auth/sign-up')}>
          Sign Up
        </Button>
      </Text>
    </VStack>
  );
};

export default SignInForm;

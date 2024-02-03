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
import { RouteLink } from '@/components/atoms';
import { signUpSchema } from '@/utils/schema';

import type { InferType } from 'yup';

const SignUpForm = () => {
  const { signUp, isLoading } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<InferType<typeof signUpSchema>>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const onSignUp = (payload: InferType<typeof signUpSchema>) => {
    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      signUp(payload)
        .then(() => setTimeout(() => resolve(router.push('/auth/sign-in')), 1000))
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Signing up...' },
      success: {
        title: 'Sign up success!',
        description: 'You have successfully signed up, please sign in to continue.',
        duration: 2000,
      },
      error: {
        title: 'Sign up failed!',
        description: response.catch((err) => err.message),
        duration: 2000,
      },
    });
  };

  return (
    <VStack gap={8}>
      <Heading>Sign Up</Heading>

      <VStack as="form" alignItems="stretch" width="full" gap={4} onSubmit={handleSubmit(onSignUp)}>
        <FormControl isInvalid={!!errors.username} isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Rikud0u" {...register('username')} />
          {errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="hagoromo@example.com" {...register('email')} />
          {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.passwordConfirm} isRequired>
          <FormLabel>Password Confirmation</FormLabel>
          <Input type="password" placeholder="••••••••" {...register('passwordConfirm')} />
          {errors.passwordConfirm && (
            <FormErrorMessage>{errors.passwordConfirm.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          loadingText="Signing Up"
          isLoading={isLoading || isSubmitting}
          isDisabled={!isDirty || !isValid}>
          Sign Up
        </Button>
      </VStack>

      <Text>
        Already have an account?{' '}
        <RouteLink href="/auth/sign-in">
          <Button variant="link" colorScheme="blue">
            Sign In
          </Button>
        </RouteLink>
      </Text>
    </VStack>
  );
};

export default SignUpForm;

'use client';

import { useContext, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaSave, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

import { TodoContext } from '@/contexts/todo';
import { todoSchema } from '@/utils/schema';

import type { InferType } from 'yup';
import type { Todo } from '@/types/todo';

type TodoCardProps = {
  mode: 'read' | 'create' | 'update';
  data?: Todo;
  isEditable?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
  onClose: () => void;
};

const TodoCard = ({ mode, data, isEditable, onUpdate, onDelete, onClose }: TodoCardProps) => {
  const { colorMode } = useColorMode();
  const { createTodo, updateTodo, isLoading } = useContext(TodoContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<InferType<typeof todoSchema>>({
    mode: 'onBlur',
    defaultValues: {
      title: data?.title || '',
    },
    resolver: yupResolver(todoSchema),
  });

  const router = useRouter();
  const toast = useToast();

  const onSubmitTodo = async (payload: InferType<typeof todoSchema>) => {
    try {
      switch (mode) {
        case 'create': {
          await createTodo({ title: payload.title });

          toast({
            title: 'Todo has been created!',
            description: 'You have successfully created a new todo.',
            status: 'success',
            duration: 2000,
          });

          break;
        }
        case 'update': {
          if (!data) break;

          await updateTodo(data._id, { title: payload.title });

          toast({
            title: 'Todo has been updated!',
            description: 'You have successfully updated a todo.',
            status: 'success',
            duration: 2000,
          });
        }
      }

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: `Failed to ${mode === 'create' ? 'create' : 'update'} todo!`,
          description: err.message,
          status: 'error',
          duration: 2000,
        });

        if (err.message.toLowerCase().includes('expired')) {
          router.replace('/auth/sign-in');
        }
      }
    }
  };

  const onSwitchTodo = () => {
    if (!data) return;

    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      updateTodo(data._id, { isCompleted: !data.isCompleted })
        .then(() => resolve())
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: {
        title: 'Switching todo...',
      },
      success: {
        title: 'Todo has been switched!',
        description: `You have successfully switched a todo to ${
          data.isCompleted ? 'uncompleted' : 'completed'
        }.`,
        duration: 2000,
      },
      error: {
        title: 'Failed to switch todo!',
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
    if (!data) return;

    reset({ title: data.title });
  }, [data, reset]);

  return mode === 'read' && !!data ? (
    <HStack
      justifyContent="space-between"
      borderWidth={1}
      borderRadius={6}
      gap={4}
      backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
      <Checkbox
        textDecoration={data.isCompleted ? 'line-through' : 'none'}
        wordBreak="break-word"
        width="full"
        height="full"
        paddingX={4}
        paddingY={6}
        isChecked={data.isCompleted}
        isDisabled={isLoading || isSubmitting}
        onChange={onSwitchTodo}>
        {data.title}
      </Checkbox>
      {isEditable && (
        <HStack padding={4}>
          <IconButton
            aria-label="Edit todo"
            colorScheme="yellow"
            icon={<FaEdit />}
            isDisabled={isLoading || isSubmitting}
            onClick={onUpdate}
          />
          <IconButton
            aria-label="Delete todo"
            colorScheme="red"
            icon={<FaTrash />}
            isDisabled={isLoading || isSubmitting}
            onClick={onDelete}
          />
        </HStack>
      )}
    </HStack>
  ) : (
    <HStack
      as="form"
      justifyContent="space-between"
      padding={4}
      borderWidth={1}
      borderRadius={6}
      onSubmit={handleSubmit(onSubmitTodo)}>
      <FormControl isInvalid={!!errors.title} isRequired>
        <Input
          type="text"
          placeholder="Title"
          isDisabled={isLoading || isSubmitting}
          {...register('title')}
        />
        {errors.title && <FormErrorMessage>{errors.title.message}</FormErrorMessage>}
      </FormControl>
      <HStack>
        <IconButton
          type="submit"
          aria-label="Save todo"
          colorScheme="green"
          icon={<FaSave />}
          isLoading={isLoading || isSubmitting}
          isDisabled={!isDirty || !isValid}
        />
        <IconButton
          aria-label="Cancel todo"
          icon={<FaTimes />}
          onClick={onClose}
          isDisabled={isLoading || isSubmitting}
        />
      </HStack>
    </HStack>
  );
};

export default TodoCard;

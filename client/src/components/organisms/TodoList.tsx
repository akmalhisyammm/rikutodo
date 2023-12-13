'use client';

import { useContext, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  IconButton,
  Skeleton,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaPlus, FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

import { TodoContext } from '@/contexts/todo';
import { ConfirmationAlert, ModeSwitch, SearchBar, TodoCard } from '@/components/molecules';

const TodoList = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const { todos, deleteTodo, isInitializing, isLoading } = useContext(TodoContext);

  const router = useRouter();
  const toast = useToast();

  const onBeforeCreateTodo = () => {
    setEditId(null);
    setDeleteId(null);
    setIsAdding(true);
  };

  const onBeforeUpdateTodo = (id: string) => {
    setIsAdding(false);
    setDeleteId(null);
    setEditId(id);
  };

  const onBeforeDeleteTodo = (id: string) => {
    setIsAdding(false);
    setEditId(null);
    setDeleteId(id);
  };

  const onConfirmDeleteTodo = () => {
    if (!deleteId) return;

    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      deleteTodo(deleteId)
        .then(() => resolve())
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Deleting todo...' },
      success: {
        title: 'Todo has been deleted!',
        description: 'You have successfully deleted a todo.',
        duration: 2000,
      },
      error: {
        title: 'Failed to delete todo!',
        description: response.catch((err) => err.message),
        duration: 2000,
      },
    });

    setDeleteId(null);

    response.catch((err) => {
      if (err.message.toLowerCase().includes('expired')) {
        router.replace('/auth/sign-in');
      }
    });
  };

  const onSwitchMode = () => {
    setIsAdding(false);
    setEditId(null);
    setDeleteId(null);
    setIsEditable(!isEditable);
  };

  return (
    <Box>
      <ModeSwitch isChecked={isEditable} isDisabled={isLoading} onSwitch={onSwitchMode} />

      <HStack>
        <SearchBar
          value={searchKeyword}
          isDisabled={isLoading}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <IconButton
          aria-label="Sort todo"
          icon={!isDescending ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
          isDisabled={isLoading}
          onClick={() => setIsDescending(!isDescending)}
        />
      </HStack>

      <Box marginY={4}>
        <Skeleton borderRadius={6} isLoaded={!isInitializing}>
          <VStack alignItems="stretch" spacing={4} marginBottom={4} gap={2}>
            {todos.filter(
              (todo) =>
                !todo.isCompleted && todo.title.toLowerCase().includes(searchKeyword.toLowerCase()),
            ).length ? (
              todos
                .filter(
                  (todo) =>
                    !todo.isCompleted &&
                    todo.title.toLowerCase().includes(searchKeyword.toLowerCase()),
                )
                .sort((a, b) =>
                  !isDescending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
                )
                .map((todo) => (
                  <TodoCard
                    key={todo._id}
                    mode={todo._id === editId ? 'update' : 'read'}
                    data={todo}
                    isEditable={isEditable}
                    onUpdate={() => onBeforeUpdateTodo(todo._id)}
                    onDelete={() => onBeforeDeleteTodo(todo._id)}
                    onClose={() => setEditId(null)}
                  />
                ))
            ) : (
              <Text textAlign="center" paddingY={4}>
                No uncompleted todos found.
              </Text>
            )}

            {isAdding ? (
              <TodoCard mode="create" onClose={() => setIsAdding(false)} />
            ) : isEditable ? (
              <Button
                colorScheme="blue"
                variant="outline"
                leftIcon={<FaPlus />}
                isDisabled={isLoading}
                onClick={onBeforeCreateTodo}>
                Add New Todo
              </Button>
            ) : (
              <Text as="small" textAlign="center">
                Switch to <strong>CRUD</strong> mode to add, edit, and delete todo.
              </Text>
            )}
          </VStack>
        </Skeleton>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Completed (
                {
                  todos.filter(
                    (todo) =>
                      todo.isCompleted &&
                      todo.title.toLowerCase().includes(searchKeyword.toLowerCase()),
                  ).length
                }
                )
              </Box>
              <FaChevronDown />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Skeleton borderRadius={6} isLoaded={!isInitializing}>
                <VStack alignItems="stretch" spacing={4} marginBottom={4} gap={2}>
                  {todos.filter(
                    (todo) =>
                      todo.isCompleted &&
                      todo.title.toLowerCase().includes(searchKeyword.toLowerCase()),
                  ).length ? (
                    todos
                      .filter(
                        (todo) =>
                          todo.isCompleted &&
                          todo.title.toLowerCase().includes(searchKeyword.toLowerCase()),
                      )
                      .sort((a, b) =>
                        !isDescending
                          ? a.title.localeCompare(b.title)
                          : b.title.localeCompare(a.title),
                      )
                      .map((todo) => (
                        <TodoCard
                          key={todo._id}
                          mode={todo._id === editId ? 'update' : 'read'}
                          data={todo}
                          isEditable={isEditable}
                          onUpdate={() => onBeforeUpdateTodo(todo._id)}
                          onDelete={() => onBeforeDeleteTodo(todo._id)}
                          onClose={() => setEditId(null)}
                        />
                      ))
                  ) : (
                    <Text textAlign="center">No completed todos found.</Text>
                  )}
                </VStack>
              </Skeleton>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <ConfirmationAlert
        title="Delete Todo"
        description="Are you sure you want to delete this todo?"
        actionText="Delete"
        isOpen={!!deleteId}
        onConfirm={onConfirmDeleteTodo}
        onClose={() => setDeleteId(null)}
      />
    </Box>
  );
};

export default TodoList;

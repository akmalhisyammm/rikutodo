'use client';

import { useContext } from 'react';
import {
  Box,
  Container,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { BiMenu } from 'react-icons/bi';
import { FaEdit, FaKey, FaSignOutAlt } from 'react-icons/fa';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import { UserContext } from '@/contexts/user';
import { BrandHeading } from '@/components/atoms';
import { ChangePasswordModal, ChangeProfileModal } from '@/components/organisms';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useContext(UserContext);

  const changeProfileModal = useDisclosure();
  const changePasswordModal = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const onSignOut = () => {
    const response: Promise<void | Error> = new Promise((resolve, reject) => {
      signOut()
        .then(() => setTimeout(() => resolve(router.push('/')), 1000))
        .catch((err) => reject(err));
    });

    toast.promise(response, {
      loading: { title: 'Signing out...' },
      success: {
        title: 'Sign out success!',
        description: 'You have successfully signed out.',
        duration: 2000,
      },
      error: {
        title: 'Sign out failed!',
        description: response.catch((err) => err.message),
        duration: 2000,
      },
    });
  };

  return (
    <Box
      as="header"
      width="full"
      height={85}
      backgroundColor={colorMode === 'light' ? 'rgba(247, 250, 252, 0.8)' : 'rgba(23, 25, 35, 0.8)'}
      backdropFilter="blur(10px)"
      position="fixed"
      zIndex={5}>
      <Container as="nav" maxWidth="container.lg" height="full" paddingY={2} centerContent>
        <HStack justifyContent="space-between" width="full">
          <HStack>
            <Image src="/icons/icon-512x512.png" alt="Logo" width={70} />
            <Box>
              <BrandHeading as="h3" size="md">
                Rikutodo
              </BrandHeading>
              <Text as="small">Online Task Manager</Text>
            </Box>
          </HStack>
          <HStack>
            <IconButton
              aria-label="Theme toggle"
              borderRadius="full"
              icon={colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
              onClick={toggleColorMode}
            />

            {!!user && (
              <>
                <Menu isLazy>
                  <MenuButton
                    as={IconButton}
                    aria-label="User menu"
                    borderRadius="full"
                    icon={<BiMenu />}
                  />
                  <MenuList>
                    <MenuItem icon={<FaEdit />} onClick={changeProfileModal.onOpen}>
                      Change Profile
                    </MenuItem>
                    <MenuItem icon={<FaKey />} onClick={changePasswordModal.onOpen}>
                      Change Password
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem color="red.400" icon={<FaSignOutAlt />} onClick={onSignOut}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>

                <ChangeProfileModal
                  isOpen={changeProfileModal.isOpen}
                  onClose={changeProfileModal.onClose}
                />
                <ChangePasswordModal
                  isOpen={changePasswordModal.isOpen}
                  onClose={changePasswordModal.onClose}
                />
              </>
            )}
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;

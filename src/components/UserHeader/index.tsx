import Link from 'next/link';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const UseHeader = () => {
  const [user, setUser] = React.useState<{
    name: string;
    jwtToken: string;
    id: string;
    email: string;
  } | null>(null);
  const router = useRouter();

  const handleUserLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('login');
  };

  React.useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <header className="flex justify-between gap-5 items-center">
      <Link
        href="profile"
        className="flex gap-2 items-center text-white font-poppins text-xl font-semibold cursor-pointer"
      >
        <FaRegUser />
        {user?.name}
      </Link>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              bg="#6d28d9"
              fontFamily="Poppins, sans-serif"
              textTransform="uppercase"
              fontSize="16px"
              color="#ffffff"
              className="cursor-pointer"
              isActive={isOpen}
              _expanded={{ bg: '#ffffff', color: '#000000' }}
              _hover={{ bg: '#ffffff', color: '#000000' }}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {isOpen ? 'Fechar' : 'menu'}
            </MenuButton>
            <MenuList>
              <MenuItem
                className="cursor-pointer w-32"
                maxWidth="max-content"
                bg="transparent"
                _hover={{ bg: 'transparent' }}
              >
                <Link
                  href="/profile"
                  className="flex gap-2 items-center cursor-pointer text-lg font-poppins text-black"
                >
                  <FaRegUser />
                  Perfil / editar
                </Link>
              </MenuItem>
              <MenuItem
                onClick={handleUserLogout}
                maxWidth="max-content"
                className="cursor-pointer mt-2"
                bg="transparent"
                _hover={{ bg: 'transparent' }}
              >
                <span className="flex gap-2 items-center cursor-pointer text-lg font-poppins text-black">
                  <RiLogoutBoxRLine />
                  Sair
                </span>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </header>
  );
};

export default UseHeader;

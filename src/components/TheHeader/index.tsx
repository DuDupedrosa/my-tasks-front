import Link from 'next/link';
import React from 'react';
import ButtonLading from '../Buttons/ButtonLading';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';

const TheHeader = () => {
  return (
    <header className="flex justify-between gap-5 items-center">
      <Link href="/">
        <span className="block text-white font-poppins text-3xl cursor-pointer font-bold">
          TaskBlog
        </span>
      </Link>
      <div className="md:block hidden">
        <ButtonLading outline={true} text={'Entrar'} />
      </div>
      <div className="md:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="IconButton" aria-label="Customise options">
              <GiHamburgerMenu size="32" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="DropdownMenuContent"
              sideOffset={5}
            >
              <DropdownMenu.Item className="DropdownMenuItem">
                <span className="font-roboto text-violet-700 text-base font-normal">
                  Entrar
                </span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};

export default TheHeader;

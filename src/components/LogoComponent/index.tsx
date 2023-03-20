import Link from 'next/link';
import React from 'react';
import LogoIcon from '../../assets/icons/task-icon.svg';
import Image from 'next/image';

interface LogoComponentProps {
  isLink: boolean;
}

const LogoComponent = ({ isLink }: LogoComponentProps) => {
  return (
    <>
      {isLink ? (
        <Link href="/" className="flex gap-2 items-center">
          <Image src={LogoIcon} alt="task icon" />
          <span className="block text-white font-poppins text-3xl cursor-pointer font-bold">
            TaskHub
          </span>
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <Image src={LogoIcon} alt="task icon" />
          <span className="block text-white font-poppins text-3xl cursor-pointer font-bold">
            TaskHub
          </span>
        </div>
      )}
    </>
  );
};

export default LogoComponent;

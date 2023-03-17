import React from 'react';

interface ButtonProps {
  outline: boolean;
  text: string;
}

const ButtonLading = ({ outline, text }: ButtonProps) => {
  return (
    <button
      className={`
    font-poppins
    font-medium
    text-white
    text-lg
    text-center
    p-3
    rounded-md
    ${
      outline
        ? 'bg-transparent hover:bg-violet-700 border-solid border-2 border-violet-700'
        : 'bg-violet-700 border-solid border-2 border-transparent hover:border-white'
    }
    md:min-w-buttonLading
    transition-all
    cursor-pointer
    w-52
    `}
    >
      {text}
    </button>
  );
};

export default ButtonLading;

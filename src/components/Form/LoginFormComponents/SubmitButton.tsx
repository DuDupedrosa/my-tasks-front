import React from 'react';

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="
      font-poppins
      text-lg
      text-white 
      tracking-wide 
      pt-2
      pb-2
      w-full 
      bg-violet-700 
      text-center 
      rounded-md 
      cursor-pointer
      hover:bg-violet-900
      transition-all
      "
    >
      {label}
    </button>
  );
};

export default SubmitButton;

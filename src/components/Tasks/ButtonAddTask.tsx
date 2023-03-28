import React from 'react';
import { BiPlus } from 'react-icons/bi';

const ButtonAddTask = () => {
  return (
    <button className="cursor-pointer bg-violet-700 text-base text-black rounded-lg p-2">
      <BiPlus size="38" />
    </button>
  );
};

export default ButtonAddTask;

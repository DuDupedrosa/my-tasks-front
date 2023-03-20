import React from 'react';

interface InputLoginProps {
  type: string;
  label: string;
  name: string;
}

const LoginInput = ({ type, label, name }: InputLoginProps) => {
  return (
    <div>
      <label
        className="block mb-2 font-medium font-poppins text-white text-base tracking-wide"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full font-roboto text-base text-white p-2 rounded-md border-solid border-2 border-violet-800 bg-slate-900"
      />
    </div>
  );
};

export default LoginInput;

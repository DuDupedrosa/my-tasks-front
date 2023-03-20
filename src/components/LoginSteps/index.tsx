import React from 'react';
import LoginInput from '../Form/LoginFormComponents/input';
import SubmitButton from '../Form/LoginFormComponents/SubmitButton';
import LogoComponent from '../LogoComponent';
import TheHeader from '../TheHeader';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { requiredInputErrorDefaultMessage } from '@/helper/messages';
import {
  InputStyles,
  LabelInputStyles,
} from '../Form/LoginFormComponents/styles/input';
import { requiredInputMessageStyles } from '@/styles/form/requiredInputMessage';

type InputsTypes = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>();

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    console.log('%c⧭', 'color: #ff0000', data);
  };

  return (
    <div className="min-h-screen bg-main md:pl-14 md:pr-14 pt-10 pb-12 pl-5 pr-5">
      <TheHeader />
      <div className="grid md:justify-center items-center min-h-screen">
        <div className="bg-gray-800 md:w-116 w-full p-5 rounded-lg animate-animeTop transition-all">
          <div className="flex justify-center mb-8">
            <LogoComponent isLink={false} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label htmlFor="email" className={LabelInputStyles}>
                Email
              </label>
              <input
                type="email"
                className={InputStyles}
                id="email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <span className={requiredInputMessageStyles}>
                  {requiredInputErrorDefaultMessage}
                </span>
              )}
            </div>
            <div className="mt-5">
              <label htmlFor="password" className={LabelInputStyles}>
                Senha
              </label>
              <input
                type="password"
                className={InputStyles}
                id="password"
                {...register('password', { required: true, minLength: 8 })}
              />
              {errors.password && (
                <span className={requiredInputMessageStyles}>
                  {requiredInputErrorDefaultMessage}
                </span>
              )}
            </div>
            <div className="mt-8">
              <SubmitButton label="Entrar" />
            </div>
          </form>
          <div className="mt-8 flex justify-between">
            <Link
              href="login/register"
              className="decoration-solid underline font-poppins text-sm text-violet-500 font-normal tracking-wide hover:text-violet-700 transition-all"
            >
              Primeiro acesso?
            </Link>
            <Link
              href="login/forget"
              className="decoration-solid underline font-poppins text-sm text-violet-500 font-normal tracking-wide hover:text-violet-700 transition-all"
            >
              Perdeu senha?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

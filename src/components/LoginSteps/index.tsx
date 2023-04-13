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
import { useLoginUser } from './api/login/useLoginMutation';
import {
  errorDefaultToast,
  errorDefaultToastMessage,
} from '../Toast/DefaultToasts';
import { useRouter } from 'next/router';
import { AiFillEye } from 'react-icons/ai';
import ErrorMessageInputDefault from '../Form/ErrorMessageInputDefault';

type InputsTypes = {
  email: string;
  password: string;
};

const Login = () => {
  const useLoginMutation = useLoginUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>();

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    useLoginMutation.mutate(data);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // controle da request
  React.useEffect(() => {
    if (
      useLoginMutation.isError &&
      // @ts-ignore
      useLoginMutation.error.response.status === 404
    ) {
      errorDefaultToast(
        'Ops! Credenciais inválidas, por favor, cheque seu email e senha novamente.'
      );
    } else if (useLoginMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
    }
  }, [useLoginMutation.isError]);

  React.useEffect(() => {
    if (useLoginMutation.isSuccess) {
      localStorage.setItem('token', useLoginMutation.data.jwtToken);
      localStorage.setItem('user', JSON.stringify(useLoginMutation.data));
      router.push('/tasks');
    }
  }, [useLoginMutation.isSuccess]);

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
              {errors.email && <ErrorMessageInputDefault />}
            </div>
            <div className="mt-5">
              <label htmlFor="password" className={LabelInputStyles}>
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={InputStyles}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                />
                <AiFillEye
                  color="#ffffff"
                  className="absolute top-2 right-4 cursor-pointer"
                  onClick={handleShowPassword}
                  size="24"
                />
              </div>
              {errors.password && <ErrorMessageInputDefault />}
            </div>
            <div className="mt-8">
              <SubmitButton
                label="Entrar"
                loading={useLoginMutation.isLoading}
                loadingColor={'#ffffff'}
              />
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
              href="/login"
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

import React from 'react';
import SubmitButton from '../Form/LoginFormComponents/SubmitButton';
import LogoComponent from '../LogoComponent';
import TheHeader from '../TheHeader';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  InputStyles,
  LabelInputStyles,
} from '../Form/LoginFormComponents/styles/input';
import { useCreateUser } from './api/register/usePostRegister';
import {
  errorDefaultToast,
  errorDefaultToastMessage,
} from '../Toast/DefaultToasts';
import { useRouter } from 'next/router';
import { AiFillEye } from 'react-icons/ai';
import TooltipComponent from '../Tooltip';
import ErrorMessageInputDefault from '../Form/ErrorMessageInputDefault';

type InputsTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const createUserMutation = useCreateUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [samePassword, setSamePassword] = React.useState(true);
  const [submitSamePasswordChange, setSubmitSamePasswordChange] =
    React.useState(false);
  const [disabledInputPassword, setDisabledInputPassword] =
    React.useState(true);

  const handleDisabledInputPassword = (e: React.FormEvent<HTMLDivElement>) => {
    //@ts-ignore
    if (e.target.value.length >= 8) {
      setDisabledInputPassword(false);
    } else {
      setDisabledInputPassword(true);
    }
  };

  const handleConfirmPassword = (e: React.FormEvent<HTMLDivElement>) => {
    if (submitSamePasswordChange) {
      const password = getValues('password');
      const confirmPassword = getValues('confirmPassword');

      if (confirmPassword === password && password === confirmPassword) {
        setSamePassword(true);
      } else {
        setSamePassword(false);
      }
    }
  };

  const handleCheckSamePassword = () => {
    if (submitSamePasswordChange) {
      const password = getValues('password');
      const confirmPassword = getValues('confirmPassword');

      if (confirmPassword === password && password === confirmPassword) {
        setSamePassword(true);
      } else {
        setSamePassword(false);
      }
    }
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>();

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    if (
      data.password !== data.confirmPassword &&
      data.confirmPassword !== data.password
    ) {
      setSubmitSamePasswordChange(true);
      setSamePassword(false);
    } else {
      setSubmitSamePasswordChange(false);
      createUserMutation.mutate(data);
    }
  };

  // controlando os estados da requisição
  React.useEffect(() => {
    if (createUserMutation.isSuccess) {
      localStorage.setItem('token', createUserMutation.data.jwtToken);
      localStorage.setItem('user', JSON.stringify(createUserMutation.data));
      router.push('/tasks');
    }
  }, [createUserMutation.isSuccess]);

  React.useEffect(() => {
    if (
      createUserMutation.isError &&
      // @ts-ignore
      createUserMutation.error.response.status === 422
    ) {
      errorDefaultToast('Usuário já cadastrado');
    } else if (createUserMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
    }
  }, [createUserMutation.isError]);

  return (
    <div className="min-h-screen bg-main md:pl-14 md:pr-14 pt-10 pb-12 pl-5 pr-5">
      <TheHeader />
      <div className="grid md:justify-center items-center min-h-screen">
        <div className="bg-gray-800 w-full md:w-116 p-5 rounded-lg animate-animeLeft transition-all">
          <div className="flex justify-center mb-8">
            <LogoComponent isLink={false} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className={LabelInputStyles}>
                Nome
              </label>
              <input
                type="text"
                className={InputStyles}
                id="name"
                {...register('name', { required: true })}
              />
              {errors.name && <ErrorMessageInputDefault />}
            </div>
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
              <label
                htmlFor="password"
                className={`flex items-center gap-2 ${LabelInputStyles}`}
              >
                Senha
                <TooltipComponent content="A senha precisa ter no mínimo 8 caracteres" />
              </label>
              <div
                className="relative"
                onChange={(e) => {
                  handleCheckSamePassword();
                  handleDisabledInputPassword(e);
                }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={InputStyles}
                  id="password"
                  {...register('password', { required: true, minLength: 8 })}
                />
                <AiFillEye
                  color="#ffffff"
                  className="absolute top-2 right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  size="24"
                />
              </div>
              {errors.password && <ErrorMessageInputDefault />}
            </div>
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className={`flex items-center gap-2 ${LabelInputStyles}`}
              >
                Confirmar senha
                <TooltipComponent content="Preencha o campo acima primeiro" />
              </label>
              <div
                className="relative"
                onChange={(e) => handleConfirmPassword(e)}
              >
                <input
                  disabled={disabledInputPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={InputStyles}
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: true,
                    minLength: 8,
                  })}
                />
                <AiFillEye
                  color={disabledInputPassword ? '#cccccc' : '#ffffff'}
                  className={`absolute top-2 right-4 ${
                    true ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  size="24"
                />
              </div>
              {errors.confirmPassword && <ErrorMessageInputDefault />}
              {!samePassword && (
                <ErrorMessageInputDefault message="As senhas não são iguais" />
              )}
            </div>
            <div className="mt-8">
              <SubmitButton
                label="Entrar"
                loadingColor="#ffffff"
                loading={createUserMutation.isLoading}
              />
            </div>
          </form>
          <div className="mt-8 flex justify-between">
            <Link
              href="login"
              className="decoration-solid underline font-poppins text-sm text-violet-500 font-normal tracking-wide hover:text-violet-700 transition-all"
            >
              Já tem cadastro?
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

export default Register;

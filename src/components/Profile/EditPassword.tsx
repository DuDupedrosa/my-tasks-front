import React from 'react';
import { TaskInput, TaskLabel } from '../Form/Task/styles/input';
import ErrorMessageInputDefault from '../Form/ErrorMessageInputDefault';
import { useEditPassword } from '@/api/editPasswordApi/usePostEditPassword';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../Form/LoginFormComponents/SubmitButton';
import { AiFillEye } from 'react-icons/ai';

import {
  errorDefaultToast,
  errorDefaultToastMessage,
  successDefaultToast,
} from '../Toast/DefaultToasts';

type EditPasswordFormType = {
  currentPassword: string;
  newPassword: string;
};

const EditPassword = () => {
  const useEditPasswordMutation = useEditPassword();
  const [showCurrentPassword, setShowCurrentPassword] =
    React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditPasswordFormType>();

  const onSubmit: SubmitHandler<EditPasswordFormType> = (data) => {
    useEditPasswordMutation.mutate(data);
  };

  React.useEffect(() => {
    if (useEditPasswordMutation.isSuccess) {
      successDefaultToast('Senha alterada com sucesso');
      setValue('currentPassword', '');
      setValue('newPassword', '');
    }
  }, [useEditPasswordMutation.isSuccess]);

  React.useEffect(() => {
    if (
      useEditPasswordMutation.isError &&
      // @ts-ignore
      useEditPasswordMutation.error.response.status === 422
    ) {
      errorDefaultToast('A senha atual não está correta');
    } else if (useEditPasswordMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
    }
  }, [useEditPasswordMutation.isError]);

  return (
    <div className="mt-20">
      <h1 className="font-poppins text-black font-bold text-2xl">
        Editar senha:
      </h1>
      <form
        className="mt-6 md:mt-12  md:max-w-[50%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="currentPassword" className={TaskLabel}>
            Senha atual:
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              id="currentPassword"
              className={TaskInput}
              {...register('currentPassword', { required: true })}
            />
            <AiFillEye
              className="absolute top-2 right-4 cursor-pointer text-violet-700"
              onClick={handleShowCurrentPassword}
              size="24"
            />
          </div>
          {errors.currentPassword && <ErrorMessageInputDefault />}
        </div>
        <div className="mt-5">
          <label htmlFor="newPassword" className={TaskLabel}>
            Nova senha
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              className={TaskInput}
              {...register('newPassword', { required: true })}
            />
            <AiFillEye
              className="absolute top-2 right-4 cursor-pointer text-violet-700"
              onClick={handleShowNewPassword}
              size="24"
            />
          </div>
          {errors.newPassword && <ErrorMessageInputDefault />}
        </div>
        <div className="max-w-[220px] mt-8">
          <SubmitButton
            label="Salvar"
            loading={useEditPasswordMutation.isLoading}
            loadingColor="#ffffff"
            loadingSize="24"
          />
        </div>
      </form>
    </div>
  );
};

export default EditPassword;

import { useGetUser } from '@/api/profileApi/useGetUser';
import { useEditUser } from '@/api/profileApi/usePutEditUser';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  errorDefaultToast,
  errorDefaultToastMessage,
  successDefaultMessage,
  successDefaultToast,
} from '../Toast/DefaultToasts';
import LoadingCircularProgress from '../LoadingCircularProgress';
import { TaskInput, TaskLabel } from '../Form/Task/styles/input';
import ErrorMessageInputDefault from '../Form/ErrorMessageInputDefault';
import SubmitButton from '../Form/LoginFormComponents/SubmitButton';

type UserFormType = {
  name: string;
  email: string;
};

interface UserEdit {
  name: string;
  email: string;
  _id: string | null;
}

const EditProfile = () => {
  const getUserMutation = useGetUser();
  const editUserMutation = useEditUser();
  const [userId, setUserId] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormType>();

  const onSubmit: SubmitHandler<UserFormType> = (data) => {
    let payload: UserEdit = { ...data, _id: null };
    payload._id = userId;

    editUserMutation.mutate(payload);
  };

  React.useEffect(() => {
    if (getUserMutation.isSuccess) {
      const { email, name, _id } = getUserMutation.data;

      setValue('email', email);
      setValue('name', name);
      setUserId(_id);
    }
  }, [getUserMutation.isSuccess]);

  // controle das requests
  React.useEffect(() => {
    if (getUserMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
    }
  }, [getUserMutation.isError]);

  React.useEffect(() => {
    if (editUserMutation.isSuccess) {
      successDefaultToast(successDefaultMessage);
    }
  }, [editUserMutation.isSuccess]);

  React.useEffect(() => {
    if (editUserMutation.isError) {
      errorDefaultToast(errorDefaultToastMessage);
    }
  }, [editUserMutation.isError]);

  return (
    <div className="mt-20">
      <h1 className="font-poppins text-black font-bold text-2xl">
        Meu cadastro:
      </h1>
      {getUserMutation.isLoading && <LoadingCircularProgress />}
      {!getUserMutation.isLoading && (
        <form
          className="mt-6 md:mt-12  md:max-w-[50%]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="name" className={TaskLabel}>
              Usuário
            </label>
            <input
              type="text"
              id="name"
              className={TaskInput}
              {...register('name', { required: true })}
            />
            {errors.name && <ErrorMessageInputDefault />}
          </div>
          <div className="mt-5">
            <label htmlFor="email" className={TaskLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={TaskInput}
              {...register('email', { required: true })}
            />
            {errors.email && <ErrorMessageInputDefault />}
          </div>
          <div className="max-w-[220px] mt-8">
            <SubmitButton
              label="Editar"
              loading={editUserMutation.isLoading}
              loadingColor="#ffffff"
              loadingSize="24"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProfile;

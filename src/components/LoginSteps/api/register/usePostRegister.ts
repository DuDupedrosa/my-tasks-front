import { http } from '@/pages/api/http';
import { useMutation } from 'react-query';

const createUser = async (payload: object) => {
  const { data } = await http.post(`users/create`, payload);
  return data;
};

export const useCreateUser = () => {
  return useMutation((payload: object) => {
    return createUser(payload);
  });
};

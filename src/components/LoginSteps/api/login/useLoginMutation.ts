import { http } from '@/pages/api/http';
import { useMutation } from 'react-query';

const userLogin = async (payload: object) => {
  const { data } = await http.post(`users/login`, payload);
  return data;
};

export const useLoginUser = () => {
  return useMutation((payload: object) => {
    return userLogin(payload);
  });
};

import { http } from '@/pages/api/http';
import { useMutation, useQueryClient } from 'react-query';

const editPassword = async (payload: object) => {
  const token = localStorage.getItem('token');

  const { data } = await http.post(`users/edit/password`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditPassword = () => {
  return useMutation((payload: object) => {
    return editPassword(payload);
  });
};

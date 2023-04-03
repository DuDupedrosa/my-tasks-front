import { http } from '@/pages/api/http';
import { useMutation, useQueryClient } from 'react-query';

const editUser = async (payload: object) => {
  const token = localStorage.getItem('token');

  const { data } = await http.put(`users/edit`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return editUser(payload);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['getUser']);
      },
    }
  );
};

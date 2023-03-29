import { http } from '@/pages/api/http';
import { useMutation, useQueryClient } from 'react-query';

const createTask = async (payload: object) => {
  const token = localStorage.getItem('token');

  const { data } = await http.post(`tasks`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return createTask(payload);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['getTasksToDo']);
      },
    }
  );
};

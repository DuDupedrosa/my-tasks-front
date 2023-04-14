import { http } from '@/pages/api/http';
import { useMutation, useQueryClient } from 'react-query';

const editTask = async (payload: object) => {
  const token = localStorage.getItem('token');

  const { data } = await http.put(`tasks`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: object) => {
      return editTask(payload);
    },
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(['getTasksToDo']);
        queryClient.invalidateQueries(['getTaskProgress']);
        queryClient.invalidateQueries(['getTasksFinalized']);
      },
    }
  );
};

import { taskStatus } from '@/components/enums/tasksStatusEnum';
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
        // invalidando o get de acordo com a task adicionada para não invalidar todas as requisições de uma vez
        if (response.status === taskStatus.PENDING) {
          queryClient.invalidateQueries(['getTasksToDo']);
        } else if (response.status === taskStatus.IN_PROGRESS) {
          queryClient.invalidateQueries(['getTaskProgress']);
        } else if (response.status === taskStatus.FINALIZED) {
          queryClient.invalidateQueries(['getTasksFinalized']);
        }
      },
    }
  );
};

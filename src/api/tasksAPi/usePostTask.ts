import { taskStatus } from '@/components/enums/tasksStatusEnum';
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
      onSuccess: (response) => {
        // invalidando o get de acordo com a task adicionada para não invalidar todas as requisições de uma vez
        if (response.status === taskStatus.PENDING) {
          queryClient.invalidateQueries(['getTasksToDo']);
        } else if (response.status === taskStatus.IN_PROGRESS) {
          queryClient.invalidateQueries(['getTaskProgress']);
        } else if (response.status === taskStatus.FINALIZED) {
          queryClient.invalidateQueries(['getTasksFinalized']);
        }

        // sempre invalida o patch que diz se tem task ou não
        queryClient.invalidateQueries(['checkUserAlreadyTask']);
      },
    }
  );
};

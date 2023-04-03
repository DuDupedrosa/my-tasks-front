import { taskStatus } from '@/components/enums/tasksStatusEnum';
import { http } from '@/pages/api/http';
import { useMutation, useQueryClient } from 'react-query';

const deleteTask = async (id: string) => {
  const token = localStorage.getItem('token');
  const { data } = await http.delete(`tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return deleteTask(id);
    },
    {
      onSuccess: (response) => {
        if (response.status === taskStatus.PENDING) {
          queryClient.invalidateQueries(['getTasksToDo']);
        } else if (response.status === taskStatus.IN_PROGRESS) {
          queryClient.invalidateQueries(['getTaskProgress']);
        } else if (response.status === taskStatus.FINALIZED) {
          queryClient.invalidateQueries(['getTasksFinalized']);
        }

        queryClient.invalidateQueries(['checkUserAlreadyTask']);
      },
    }
  );
};

import { http } from '@/pages/api/http';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const getTasksToDo = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`tasks/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetTasksToDo = () => {
  return useQuery(['getTasksToDo'], getTasksToDo);
};

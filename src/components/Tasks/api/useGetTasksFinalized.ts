import { http } from '@/pages/api/http';
import { useQuery } from 'react-query';

const getTasksFinalized = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`tasks/finalized`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetTasksFinalized = () => {
  return useQuery(['getTasksFinalized'], getTasksFinalized);
};

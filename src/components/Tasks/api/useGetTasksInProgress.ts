import { http } from '@/pages/api/http';
import { useQuery } from 'react-query';

const getTaskProgress = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`tasks/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetTaskProgress = () => {
  return useQuery(['getTaskProgress'], getTaskProgress);
};

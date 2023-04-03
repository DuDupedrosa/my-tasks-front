import { http } from '@/pages/api/http';
import { useQuery } from 'react-query';

const getUser = async () => {
  const token = localStorage.getItem('token');
  const { data } = await http.get(`users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetUser = () => {
  return useQuery(['getUser'], getUser);
};

import { http } from '@/pages/api/http';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const checkUserAlreadyTask = async () => {
  const token = localStorage.getItem('token');

  const { data } = await http.get(`tasks/alreadytasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCheckUserAlreadyTask = () => {
  return useQuery(['checkUserAlreadyTask'], checkUserAlreadyTask);
};

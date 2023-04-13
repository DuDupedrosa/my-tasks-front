// import Router from 'next/router';
import { errorDefaultToast } from '@/components/Toast/DefaultToasts';
import axios from 'axios';

export const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errStatus = error.response.data.statusCode;

    if (errStatus === 401) {
      window.location.href = '/login';
      localStorage.removeItem('token');
      localStorage.setItem('unauthorized', 'true');
      errorDefaultToast('Você não tem permissão para acessar essa página');
    }
    return Promise.reject(error);
  }
);

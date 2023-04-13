import '@/styles/globals.css';
import '@/styles/headerMobileMenu.css';
import '@/styles/Tooltip.css';
import '@/styles/tabs/taskTabs.css';
import '@/styles/dialogs/dialogGeneral.css';

import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css'; // O estilo do Toastify
import { ToastContainer } from 'react-toastify'; // Importamos o Toastify
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import React from 'react';
import { alertDefaultToast } from '@/components/Toast/DefaultToasts';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // toast padrão quando dá 401
  React.useEffect(() => {
    const unauthorized = localStorage.getItem('unauthorized');

    if (unauthorized === 'true') {
      alertDefaultToast('Faça seu login, para acessar a plataforma.');
      localStorage.removeItem('unauthorized');
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ToastContainer autoClose={3000} />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

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

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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

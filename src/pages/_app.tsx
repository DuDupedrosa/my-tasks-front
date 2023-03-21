import '@/styles/globals.css';
import '@/styles/headerMobileMenu.css';
import '@/styles/Tooltip.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.css'; // O estilo do Toastify
import { ToastContainer } from 'react-toastify'; // Importamos o Toastify

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
        <ToastContainer autoClose={3000} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

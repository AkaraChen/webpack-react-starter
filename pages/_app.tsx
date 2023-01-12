import React from 'react';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="m-auto max-w-xl p-4">
          <RouterProvider router={router} />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
export default App;

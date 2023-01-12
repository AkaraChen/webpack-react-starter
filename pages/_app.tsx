import React from 'react';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return <ChakraProvider>
    <div className="max-w-xl m-auto p-4">
      <RouterProvider router={router} />
    </div>
  </ChakraProvider>;
};
export default App;

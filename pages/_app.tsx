import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-auto max-w-xl p-4">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
};
export default App;

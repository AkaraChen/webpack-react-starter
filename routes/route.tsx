import { createBrowserRouter } from 'react-router-dom';
import { Error } from './error';
import Index from '@/pages/index';

export const router = createBrowserRouter([
  { path: '/', element: <Index />, errorElement: <Error /> }
]);

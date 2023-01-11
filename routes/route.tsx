import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Index from '../pages/index';
import { Error } from './error';

export const router = createBrowserRouter([
  { path: '/', element: <Index />, errorElement: <Error /> }
]);

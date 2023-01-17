import { useRouteError } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components';

export const Error: React.FC = () => {
  const error = useRouteError() as {
    statusText: string;
    message: string;
    status: number;
  };
  const { status, message, statusText } = error;
  const navigate = useNavigate();

  return (
    <div className="m-auto flex h-screen max-w-2xl flex-col items-center justify-center space-y-3">
      <h1 className="text-3xl">{`${status} ${statusText}`}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{message}</p>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </div>
  );
};

import { useRouteError } from 'react-router-dom';
import React from 'react';
import { Button, Heading, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export const Error: React.FC = () => {
  const error = useRouteError() as {
    statusText: string;
    message: string;
    status: number;
  };
  const { status, message, statusText } = error;
  const navigate = useNavigate();

  return (
    <div className="m-auto flex h-screen max-w-2xl flex-col items-center justify-center space-y-2">
      <Heading>{`${status} ${statusText}`}</Heading>
      <Text fontSize={'xl'}>Sorry, an unexpected error has occurred.</Text>
      <Text fontSize={'xl'}>{message}</Text>
      <Button
        colorScheme="blue"
        aria-label="Back to Home"
        leftIcon={<ChevronLeftIcon />}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </div>
  );
};

import React from 'react';

interface IOptions {
  children: JSX.Element;
}

export const Button: React.FC<IOptions> = ({ children }) => {
  return <button className="text-blue-500">{children}</button>;
};

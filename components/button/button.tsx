import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export type ButtonOptions = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export const Button: React.FC<ButtonOptions> = properties => {
  const { children } = properties;
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 text-white"
      {...properties}
    >
      {children}
    </button>
  );
};

import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

export type ButtonOptions = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};

export const Button: React.FC<ButtonOptions> = properties => {
  const { children } = properties;
  return (
    <button
      className="rounded bg-gradient-to-r from-blue-500 to-blue-700 
      px-4 py-2 text-white transition-all hover:shadow-lg"
      {...properties}
    >
      {children}
    </button>
  );
};

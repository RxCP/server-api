import React from 'react';

interface ButtonCloseProps extends React.HTMLAttributes<HTMLElement> {
  className: string;
}

function ButtonClose({ className, ...rest }: ButtonCloseProps) {
  return (
    <button
      aria-label="Close"
      {...rest}
      className={`${className} text-gray-300 hover:text-white transition ease-in-out duration-150`}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default ButtonClose;

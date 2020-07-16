import React from 'react';

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: string;
  className?: string;
  addClass?: string;
  placeholder?: string;
  name: string;
  register: ({ required }: { required?: boolean }) => RefReturn;
};

const TextInput: React.FC<InputProps> = ({
  type = 'text',
  register,
  className,
  name,
  addClass,
  placeholder,
  required,
}) => {
  const finalClass = className
    ? className
    : 'w-full p-2 border border-gray-600 border-solid outline-none';
  return (
    <input
      type={type}
      ref={register({ required })}
      name={name}
      className={`${finalClass} ${addClass}`}
      placeholder={placeholder}
    />
  );
};

export default TextInput;

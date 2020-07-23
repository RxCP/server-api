import React from 'react';
import PropTypes from 'prop-types';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  active?: boolean;
  bg?: string;
  color?: string;
  size?: 'sm' | 'lg';
  disabled?: boolean;
  text: string;
  full?: boolean;
  isloading?: boolean;
}

function Button({
  bg,
  color,
  isloading,
  disabled,
  text,
  full,
  size,
  ...rest
}: ButtonProps) {
  const classes = [];

  if (bg) {
    classes.push(bg);
  }

  if (color) {
    classes.push(color);
  }

  if (isloading) {
    classes.push('cursor-wait');
  }

  if (disabled) {
    bg && classes.splice(classes.indexOf(bg), 1);
    classes.push('bg-gray-300 text-gray-500');
  }

  switch (size) {
    case 'sm':
      classes.push('px-3 py-2 text-sm');
      break;
    default:
      classes.push('px-4 py-2');
      break;
  }

  if (full) {
    classes.push('w-full');
  }

  return (
    <>
      <button
        {...rest}
        className={`focus:outline-none cursor-pointer ${classes.join(' ')}`}
      >
        {text}
      </button>
    </>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string,
  full: PropTypes.bool,
  color: PropTypes.string,
  isloading: PropTypes.bool,
};

Button.defaultProps = {
  bg: 'bg-primary',
  color: 'text-white',
  type: 'button',
  text: undefined,
  full: false,
  isloading: false,
};

export default Button;

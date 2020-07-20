import React from 'react';

interface HeadingProps {
  size: '1' | '2' | '3' | '4' | '5' | '6';
  text: string;
}

function Heading({ size, text }: HeadingProps) {
  return (
    <>
      {size === '1' && <h1 className="text-4xl font-heading">{text}</h1>}
      {size === '2' && <h2 className="text-3xl font-heading">{text}</h2>}
      {size === '3' && <h3 className="text-2xl font-heading">{text}</h3>}
      {size === '4' && <h4 className="text-xl font-heading">{text}</h4>}
      {size === '5' && <h5 className="text-lg font-heading">{text}</h5>}
      {size === '6' && <h6 className="text-md font-heading">{text}</h6>}
    </>
  );
}

export default Heading;

import React from 'react';
import Heading from '@/components/patterns/atoms/Heading';

function StyleguidePage() {
  return (
    <>
      <Heading size="1" text="Styleguide" />

      <Heading size="2" text="Headings" />
      <div>
        <Heading size="1" text="Heading 1" />
        <Heading size="2" text="Heading 2" />
        <Heading size="3" text="Heading 3" />
        <Heading size="4" text="Heading 4" />
        <Heading size="5" text="Heading 5" />
        <Heading size="6" text="Heading 6" />
      </div>
    </>
  );
}

export default StyleguidePage;

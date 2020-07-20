import React from 'react';

interface MainContentProps {
  children: any;
}

function MainContent({ children }: MainContentProps) {
  return (
    <>
      <div className="p-5 flex-auto bg-gray-200">
        <div className="bg-white p-5">{children}</div>
      </div>
    </>
  );
}

export default MainContent;

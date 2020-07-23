import React from 'react';
import { createPortal } from 'react-dom';

interface OffCanvasProps {
  position: 'left' | 'right';
  open: boolean;
}

const OffCanvas: React.FC<OffCanvasProps> = ({ position, open, children }) => {
  const domnodes = window.document.getElementById('portal-root') as HTMLElement;
  let openClass = 'right-0';

  if (!open) {
    openClass = '-right-2/12';
    document.body.classList.remove('offcanvas-open');
  } else {
    document.body.classList.add('offcanvas-open');
  }

  return createPortal(
    <div
      className={`fixed top-0	bg-white px-5 py-5 h-full w-2/12 shadow transition-right duration-500 ease-in-out ${openClass}`}
    >
      {children}
    </div>,
    domnodes,
  );
};

export default OffCanvas;

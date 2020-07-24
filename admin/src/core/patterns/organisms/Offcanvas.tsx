import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface OffCanvasProps {
  position: 'left' | 'right'; // make this work
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const OffCanvas: React.FC<OffCanvasProps> = ({
  position,
  openState,
  setOpenState,
  children,
}) => {
  const domnodes = window.document.getElementById('portal-root') as HTMLElement;
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const classes = {
    open: 'right-0',
    close: '-right-2/12',
    bodyClassOpen: 'offcanvas--open',
  };
  let openClass = openState ? classes.open : classes.close;

  /**
   * Toggle `offcanvas--open` class on/off on <body>
   *  used in closing the offcanvas in onBodyClick()
   * @return void
   */
  function toggleClassOnBody(open: boolean, toggleClass: string) {
    open
      ? document.body.classList.add(toggleClass)
      : document.body.classList.remove(toggleClass);
  }

  /**
   * Handles on <body> click event,
   *  - we need to close the offcanvas as well when the user clicks outside the offcanvas
   * @return void
   */
  function onBodyClick() {
    // close the off canvas if open
    if (
      document.body.classList.contains(classes.bodyClassOpen) &&
      offcanvasRef.current &&
      offcanvasRef.current.classList.contains(classes.open)
    ) {
      document.body.classList.remove(classes.bodyClassOpen);
      offcanvasRef.current.classList.remove(classes.open);
      offcanvasRef.current.classList.add(classes.close);
      setOpenState(!openState);
    }
  }

  toggleClassOnBody(openState, classes.bodyClassOpen);

  useEffect(() => {
    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  });

  return createPortal(
    <div
      ref={offcanvasRef}
      className={`fixed top-0	bg-white px-5 py-5 h-full w-2/12 shadow transition-right duration-500 ease-in-out ${openClass}`}
    >
      <button onClick={() => setOpenState(false)}>x</button>
      {children}
    </div>,
    domnodes,
  );
};

export default OffCanvas;

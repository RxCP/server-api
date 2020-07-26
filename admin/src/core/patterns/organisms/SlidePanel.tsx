import ButtonClose from '@patterns/molecules/button/ButtonClose';
import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface SlidePanelBaseProps {
  position?: 'left' | 'right';
  widthSize?: string;
  children?: React.ReactNode;
}

interface SlidePanelProps extends SlidePanelBaseProps {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

interface SlidePanelContainerProps extends SlidePanelBaseProps {
  forwardRef: RefObject<any>;
}

const SlidePanelContainer = ({
  widthSize,
  forwardRef,
  children,
  position,
}: SlidePanelContainerProps): JSX.Element => {
  return (
    <div
      ref={forwardRef}
      className={`fixed top-0 bg-white px-5 py-5 h-full shadow transition-${position} ease-in-out duration-300 w-${widthSize}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
};

/**
 *
 * @param widthSize tailwind's width utility's value - https://tailwindcss.com/docs/width/
 */
function SlidePanel({
  widthSize,
  position,
  openState,
  setOpenState,
  children,
}: SlidePanelProps): JSX.Element {
  const nodeRef = React.useRef(null);
  const boxRef = React.useRef(null);
  const domnodes = window.document.getElementById('portal-root') as HTMLElement;
  const classPositionTransition =
    position === 'right'
      ? {
          enter: `-right-${widthSize}`,
          enterDone: 'right-0',
          exit: `-right-${widthSize}`,
          exitDone: `-right-${widthSize}`,
        }
      : {
          enter: `-left-${widthSize}`,
          enterDone: 'left-0',
          exit: `-left-${widthSize}`,
          exitDone: `-left-${widthSize}`,
        };

  return createPortal(
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={openState}
        timeout={300}
        classNames={{
          enter: 'opacity-0 ease-in-out duration-300',
          enterActive: 'opacity-100',
          exit: 'ease-in-out duration-200',
          exitActive: 'opacity-0',
        }}
        unmountOnExit
        mountOnEnter
      >
        <div
          ref={nodeRef}
          className="absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
        ></div>
      </CSSTransition>

      <CSSTransition
        nodeRef={boxRef}
        in={openState}
        timeout={100}
        classNames={classPositionTransition}
        mountOnEnter
      >
        <SlidePanelContainer
          forwardRef={boxRef}
          position={position}
          widthSize={widthSize}
        >
          {openState && (
            <ButtonClose
              onClick={() => setOpenState(false)}
              className={`${
                position === 'right' ? '-ml-16 left-0' : 'right-0 -mr-16'
              } absolute`}
            />
          )}
          {children}
        </SlidePanelContainer>
      </CSSTransition>
    </>,
    domnodes,
  );
}

SlidePanel.defaultProps = {
  position: 'right',
  widthSize: '1/6',
};

export default SlidePanel;

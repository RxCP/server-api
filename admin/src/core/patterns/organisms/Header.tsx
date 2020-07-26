import React, { useState } from 'react';
import SlidePanel from './SlidePanel';

function Header() {
  const [userPanelIsOpen, setUserPanelIsOpen] = useState<boolean>(false);

  function handleUserProfileClick(e: any) {
    e.preventDefault();
    setUserPanelIsOpen(!userPanelIsOpen);
  }

  return (
    <>
      <div
        data-header
        className="flex justify-between items-center px-5 py-2 w-full shadow-md"
      >
        <span className="font-heading font-bold">Server 1</span>

        <div className="self-end">
          <button
            data-dropdown
            className="flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
            onClick={handleUserProfileClick}
          >
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&h=100&q=80"
              alt="Profle"
              className="h-8 w-8 rounded-full"
            />

            <svg
              className="fill-current w-3 ml-4"
              viewBox="0 0 407.437 407.437"
            >
              <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" />
            </svg>
          </button>
        </div>
      </div>

      <SlidePanel
        position="left"
        openState={userPanelIsOpen}
        setOpenState={setUserPanelIsOpen}
      ></SlidePanel>
    </>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

interface SideBarProps {
  url: string;
}

function SideBar({ url }: SideBarProps) {
  return (
    <>
      <div
        data-sidebar
        className="flex-none h-screen bg-gray-900 text-white pt-2 w-2/12"
      >
        <div className="px-5 pt-2 pb-6 text-center text-lg">
          <span className="font-bold">RxCP</span>
        </div>
        <nav>
          <div className="p-5 py-2 text-gray-700 font-bold text-xs uppercase">
            Server
          </div>
          <ul className="text-sm pb-4">
            <li>
              <Link
                to={`${url}`}
                className="block p-5 py-2 text-gray-500 hover:bg-gray-800"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/accounts`}
                className="block p-5 py-2 text-gray-500 hover:bg-gray-800"
              >
                Accounts
              </Link>
            </li>
          </ul>
          <div className="p-5 py-2 text-gray-700 font-bold text-xs uppercase">
            Application
          </div>
          <ul className="text-sm pb-4">
            <li>
              <Link
                to={`${url}/users`}
                className="block p-5 py-2 text-gray-500 hover:bg-gray-800"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to={`${url}/styleguide`}
                className="block p-5 py-2 text-gray-500 hover:bg-gray-800"
              >
                Styleguide
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;

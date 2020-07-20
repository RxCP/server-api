import React from 'react';
import SideBar from '../organisms/Sidebar';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { Router, Switch, Route, useRouteMatch } from 'react-router-dom';

interface AdminLayoutProps {
  path: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, path }) => {
  return (
    <>
      <div className="flex">
        <SideBar url="" />

        <div className="flex flex-col flex-1">
          <Switch>
            <Header />

            <Route exact path={path}>
              {children}
            </Route>

            <Route exact path="/admin/">
              {children}
            </Route>

            <Footer />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

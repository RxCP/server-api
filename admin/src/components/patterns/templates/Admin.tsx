import RoutesInterface from '@/interfaces/routes';
import routes from '@/routes';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import MainContent from '../organisms/MainContent';
import SideBar from '../organisms/Sidebar';

function Admin() {
  let { url } = useRouteMatch();

  return (
    <>
      <div className="flex">
        <SideBar url={url} />

        <div className="flex flex-col flex-1">
          <Header />
          <MainContent>
            <Switch>
              {routes.map((route: RoutesInterface, index: number) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </MainContent>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;

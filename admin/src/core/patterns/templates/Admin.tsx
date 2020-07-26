import Footer from '@patterns/organisms/Footer';
import Header from '@patterns/organisms/Header';
import MainContent from '@patterns/organisms/MainContent';
import SideBar from '@patterns/organisms/Sidebar';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RoutesInterface from '../../interfaces/routes';

interface AdminProps {
  routes: RoutesInterface[];
}

function Admin({ routes }: AdminProps) {
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

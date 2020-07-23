import { useAuthContext } from '@core/context/auth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {}

function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const authDetails = useAuthContext();
  const token = localStorage.getItem('token');

  return (
    <Route {...rest}>
      {authDetails.authToken || token ? (
        children
      ) : (
        <Redirect to="/admin/login" />
      )}
    </Route>
  );
}

export default PrivateRoute;

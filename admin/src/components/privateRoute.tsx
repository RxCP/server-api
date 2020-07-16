import { useAuthContext } from '@/context/auth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


interface PrivateRouteProps extends RouteProps {
  component: any;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, ...rest } = props;
  const authDetails = useAuthContext();
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        authDetails.authToken || token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
}

export default PrivateRoute;

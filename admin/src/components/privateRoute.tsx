import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuthContext } from '@/context/auth'

interface PrivateRouteProps extends RouteProps {
  component: any;
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, ...rest } = props;
  const authDetails = useAuthContext();
  
  return(
    <Route {...rest} render={(props) => (
      authDetails ? 
        <Component {...props} />
      : <Redirect to="/admin/login" />
    )}
    />
  );
}

export default PrivateRoute;
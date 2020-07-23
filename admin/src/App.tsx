import { AuthContext } from '@core/context/auth';
import PrivateRoute from '@core/route/privateRoute';
import PageNotFound from '@core/pages/PageNotFound';
import Admin from '@patterns/templates/Admin';
import LoginPage from '@plugins/auth/pages/Login';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import routes from './routes';

function App() {
  const [authToken, setAuthToken] = useState('');

  const setToken = (token: string) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  useEffect(() => {
    // check token if still valid, log out if not
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.post('/api/auth/check').catch((err) => {
        // logout
        setAuthToken('');
        localStorage.setItem('token', '');
        window.location.reload();
      });
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
        <Router>
          <Switch>
            <Route path="/admin/login" component={LoginPage} />

            <Route exact path="/">
              <Redirect to="/admin" />
            </Route>

            <PrivateRoute path="/admin">
              <Admin routes={routes} />
            </PrivateRoute>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;

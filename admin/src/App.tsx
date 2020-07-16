import DashboardPage from '@pages/Dashboard';
import LoginPage from '@pages/Login';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from './components/pages/PageNotFound';
import PrivateRoute from './components/privateRoute';
import { AuthContext } from './context/auth';

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

      axios.post('/api/auth/check')
      .catch(err => {
        // logout
        setAuthToken('');
        localStorage.setItem('token', '');
        window.location.reload();
      })
    }
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
        <Router>
          <Switch>
            <Route path="/admin/login" component={LoginPage} />

            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute path="/admin" component={DashboardPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />

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

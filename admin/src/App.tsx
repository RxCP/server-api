import DashboardPage from '@pages/Dashboard';
import LoginPage from '@pages/Login';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import { AuthContext } from './context/auth';
import PageNotFound from './components/pages/PageNotFound';

function App() {
  return (
    <>
      <AuthContext.Provider value={null}>
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

import React from 'react';  
import { Route, Switch} from 'react-router-dom';

import App from '../components/app';
import NotFoundPage from '../components/pages/not-found-page';
import HomePage from '../components/pages/home-page';
import Dashboard from '../components/pages/dashboard';  
import RequireAuth from '../components/auth/require-auth';
import AdminHome from '../components/admin/index'
export const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="/admin" component={AdminHome} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);
import React from 'react';  
import { Route, Switch} from 'react-router-dom';

import App from '../components/app';
import NotFoundPage from '../components/pages/not-found-page';
import HomePage from '../components/pages/home-page';
import Dashboard from '../components/pages/dashboard';  
import RequireAuth from '../components/auth/require-auth';
import AdminHome from '../components/admin/index';
import AddNewBook from '../../client/components/admin/pages/add-new-book';
import RentedBooksPage from  '../components/pages/rented-books-page';
import Profile from '../components/pages/profile';
import SearchPage from '../components/pages/search-page';
import Authentication from '../components/auth/require-auth';
import AdminAuthentication from '../components/auth/require-admin';

export const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/dashboard" component={Authentication(Dashboard)} />
    <Route exact path="/admin" component={AdminAuthentication(AdminHome)} />
    <Route path="/add-book" component={AdminAuthentication(AddNewBook)} />
    <Route path="/rented-books" component={Authentication(RentedBooksPage)} />
    <Route path="/profile" component={Authentication(Profile)} />
    <Route path="/search" component={Authentication(SearchPage)} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);


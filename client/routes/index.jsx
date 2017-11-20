import React from 'react';  
import { Route, Switch, BrowserRouter} from 'react-router-dom';

import App from '../components/app';
import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import BookDetailsPage from '../components/pages/BookDetailsPage';
import Dashboard from '../components/pages/Dashboard';  
import AdminHome from '../components/admin/index';
import AddNewBook from '../../client/components/admin/pages/AddANewBook';
import RentedBooksPage from  '../components/pages/RentedBooksPage';
import Profile from '../components/pages/Profile';
import SearchPage from '../components/pages/SearchPage';
import Authentication from '../components/auth/Authentication';
import AdminAuthentication from '../components/auth/AdminAuthentication';

export const Main = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/dashboard" component={Authentication(Dashboard)} />
    <Route exact path="/admin" component={AdminAuthentication(AdminHome)} />
    <Route path="/add-book" component={AdminAuthentication(AddNewBook)} />
    <Route path="/book-details" component={Authentication(BookDetailsPage)} />
    <Route path="/rented-books" component={Authentication(RentedBooksPage)} />
    <Route path="/profile" component={Authentication(Profile)} />
    <Route path="/search" component={Authentication(SearchPage)} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);


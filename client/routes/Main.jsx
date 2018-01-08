import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from '../components/App';
import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import Dashboard from '../components/pages/Dashboard';
import AdminHome from '../components/admin/AdminHome';
import RentedBooksPage from '../components/pages/RentedBooksPage';
import GoogleSignupPage from '../components/pages/GoogleSignupPage';
import Profile from '../components/pages/Profile';
import Authentication from '../components/auth/Authentication';
import GuestAuthentication from '../components/auth/GuestAuthentication';
import AdminAuthentication from '../components/auth/AdminAuthentication';
import NotificationPage from '../components/admin/pages/NotificationPage';

const Main = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={GuestAuthentication(HomePage)} />
			<Route exact path="/dashboard" component={Authentication(Dashboard)} />
			<Route exact path="/admin" component={AdminAuthentication(AdminHome)} />
			<Route path="/google-signup" component={GoogleSignupPage} />
			<Route path="/notifications" component={AdminAuthentication(NotificationPage)} />
			<Route path="/rented-books" component={Authentication(RentedBooksPage)} />
			<Route path="/profile" component={Authentication(Profile)} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default Main;

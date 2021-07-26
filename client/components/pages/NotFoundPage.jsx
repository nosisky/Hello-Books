import React, { Component } from 'react';
import DashboardFooter from '../includes/DashboardFooter';
import NavBar from '../includes/NavBar';

const NotFoundPage = () => {
	return (<div>
				<NavBar />
				<h1 className="notfound">404 - Page Not Found :(</h1>
				<h3 className="notfound">I'm sorry, the page you were looking for cannot be found! :D</h3>
				<DashboardFooter />
			</div>
	);
};

export default NotFoundPage;

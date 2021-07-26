import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="nav-bar">
			<div className="navbar-wrapper container">
				<Link to ='/' className="brand-logo left">
					<img src="/img/emblem_library.png" width="40px" height="40px" />
					HelloBooks
				</Link>
				<a href="#" data-activates="mobile-demo" 
				className="button-collapse right">
					<i className="material-icons">menu</i>
				</a>
				<ul className="right hide-on-med-and-down">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<a href="http://github.com/nosisky/Hello-Books">About</a>
					</li>
					<li>
						<a href="http://github.com/nosisky/Hello-Books">View on Github</a>
					</li>
				</ul>
			</div>
			<ul className="side-nav" id="mobile-demo">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<a href="http://github.com/nosisky/Hello-Books">About</a>
				</li>
				<li>
					<a href="http://github.com/nosisky/Hello-Books">Privacy</a>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;

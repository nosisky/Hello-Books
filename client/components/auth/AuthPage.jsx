import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm';
import RegisterationForm from './RegisterationForm';

import { checkUserExist, 
	checkEmailExist, reMap } from '../../utils/validation';

const AuthPage = ({ apiStatus,
	registerUserAction, loginAction, message }) => {
	return (
		<div>
			<div className="container main-auth white z-depth-2">
				<div
					style={{
						color: 'red',
						textAlign: 'center',
						fontWeight: 'bold'
					}}
				>
					{message}
				</div>
				<ul className="tabs teal">
					<li className="tab col s3">
						<a id="login_now" className="white-text active" href="#login">
							login
						</a>
					</li>
					<li className="tab col s3">
						<a id="joinus" className="white-text reg" href="#register">
							register
						</a>
					</li>
				</ul>
				<LoginForm 
				apiStatus={apiStatus}
				onSubmit={loginAction} />

				<RegisterationForm 
				apiStatus={apiStatus}
				UserExist={checkUserExist} 
				EmailExist={checkUserExist} 
				onSubmit={registerUserAction} />
			</div>
		</div>
	);
};

export default AuthPage;

import React from 'react';
import GoogleLogin from 'react-google-login';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import {  checkUserExist } from '../../utils/validation';

dotenv.load();

/**
 * 
 * 
 * @export {Object}
 * 
 * @class GoogleLogIn
 * 
 * @extends {React.Component}
 */
export default class GoogleLogIn extends React.Component {
      
	/**
	 * @description - Re-map API response to retrieve necessary data
	 * 
	 * @param {Object} obj - Object from Google API
	 * 
	 * @returns {Object} 
	 * 
	 * @memberOf GoogleLogIn
	 */
	reMap(obj) {
		let mainObj = {
			currentUser: {}
		};
		const username = obj.name.toLowerCase().replace(/[\s]/, '_')
		 + Math.round(Math.random(1998) * 56);
		mainObj.currentUser.username = username;
		mainObj.currentUser.fullName = obj.name;
		mainObj.currentUser.password = username;
		mainObj.currentUser.email = obj.email;
		return mainObj;
	}

	/**
	 * @description - Renders the application
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf GoogleLogIn
	 */
	render() {
		const responseGoogle = (response) => {
			const key = process.env.secretKey;

			if (response.Zi.id_token) {
				const decoded = jwt.decode(response.Zi.id_token);
				const newUserObj = this.reMap(decoded);
				this.props.emailExist({ email: newUserObj.currentUser.email })
				.then((response) => {
					if (!response.status) {
						const userObject = newUserObj.currentUser;
						const token = jwt.sign({
							userObject },
						process.env.secretKey);
							localStorage.setItem('userData', token);
							window.location.href='/google-signup';
					} else {
						checkUserExist({ email: newUserObj.currentUser.email,
							 google: true })
						.then((userDetails) => {
							const currentUser = userDetails.user;
							currentUser.userId = currentUser.id;
							const token = jwt.sign({
								currentUser,
								exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) },
							process.env.secretKey);
							
							localStorage.setItem('token', token);
							Materialize.toast('Login Successful', 2000, 'blue', () => {
								window.location.href = '/dashboard';
							});
						});
					}
				});
			}
		};
		return (
			<GoogleLogin
				clientId={process.env.GOOGLE_ID}
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
			/>
		);
	}
}

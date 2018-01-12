import React from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import configureStore from '../../store/configureStore';
import { googleLogin } from '../../actions/UserActions';

import {  checkUserExist } from '../../utils/validation';

dotenv.load();

const store = configureStore();


/**
 * 
 * 
 * @export {Object}
 * 
 * @class GoogleLogIn
 * 
 * @extends {React.Component}
 */
export class GoogleLogIn extends React.Component {

	constructor(props){
		super(props);

		this.reMap = this.reMap.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
	}
      
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
		let mainUserObject = {
			currentUser: {}
		};
		const username = obj.name.toLowerCase().replace(/[\s]/, '_')
		 + Math.round(Math.random(1998) * 56);
		mainUserObject.currentUser.username = username;
		mainUserObject.currentUser.fullName = obj.name;
		mainUserObject.currentUser.password = username;
		mainUserObject.currentUser.email = obj.email;
		return mainUserObject;
	}

	 responseGoogle(response){
			const key = process.env.secretKey;

			if (response.Zi.id_token) {
				const decoded = jwt.decode(response.Zi.id_token);
				const newUserObject = this.reMap(decoded);
				this.props.emailExist({ email: newUserObject.currentUser.email })
				.then((response) => {
					if (!response.length) {
						const userObject = newUserObject.currentUser;
						const token = jwt.sign({
							userObject },
						process.env.secretKey);
							localStorage.setItem('userData', token);
							window.location.href='/google-signup';
					} else {
						checkUserExist({ email: newUserObject.currentUser.email,
							 google: true })
						.then((userDetails) => {
							this.props.googleLogin(userDetails)
							.then(() => {
								Materialize.toast('Login Successful', 2000, 'blue', () => {
								this.props.history.push('/dashboard')
							});
							})
						});
					}
				});
			}
		};

	/**
	 * @description - Renders the application
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf GoogleLogIn
	 */
	render() {
		return (
			<GoogleLogin
				clientId={process.env.GOOGLE_ID}
				buttonText="Login with Google"
				onSuccess={this.responseGoogle}
				onFailure={this.responseGoogle}
			/>
		);
	}
}

export default withRouter(connect(null, { googleLogin })(GoogleLogIn));

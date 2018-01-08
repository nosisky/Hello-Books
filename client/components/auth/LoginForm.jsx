import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogIn from './GoogleLogIn';
import { checkUserExist } from '../../utils/validation';
import { registerUserAction, getUserByEmailAction } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { withRouter } from 'react-router';

/**
 * @description - Login form component
 * 
 * @export {Object} Login component
 * 
 * @class Login
 * 
 * @extends {Component}
 */
export class LoginForm extends Component {
	/**
	 * @description - Creates an instance of Login.
	 * 
	 * @param {Object} props - component properties
	 * 
	 * @memberOf Login
	 */
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			loginError: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * @description - Handles the input value changes
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Login
	 */
	onChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
	}

	/**
	 * @description - Submits the login information
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Login
	 */
	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state).then(() => {
			const token = localStorage.getItem('token');
			if (token) {
				const currentUser = jwt.decode(token).currentUser;
				if (currentUser.isAdmin) {
					this.props.history.push('/admin');
				} else {
					this.props.history.push('/dashboard');
				}
			}
		});
	}

	/**
	 * @description - Renders the component
	 * 
	 * @returns { Object }
	 * 
	 * @memberOf Login
	 */
	render() {
		const style = {
			button: {
				backgroundColor: 'rgb(37, 76, 71)',
				color: '#fff',
				float: 'right'
			}
		};
		return (
			<div id="login" className="col s12">
				<div className="red-text center">{this.state.loginError}</div>
				<form className="col s12" onSubmit={this.handleSubmit}>
					<div className="form-container">
						<div className="row">
							<div className="input-field col s12">
								<input id="username" type="text" name="username" onChange={this.onChange} required />
								<label htmlFor="username">Username</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									id="password"
									type="password"
									name="password"
									className="validate"
									onChange={this.onChange}
									required
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
						<br />
						<center>
							<button
								className="btn waves-effect teal"
								type="submit"
								name="action"
								disabled={this.props.apiStatus}
							>
								Login
							</button>
							<br />
							<br />
							<GoogleLogIn emailExist={checkUserExist} />
						</center>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(connect()(LoginForm));

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router-dom';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			username: '',
			password: '',
			email: '',
			usernameError: '',
			passwordError: '',
			passwordConfirm: '',
			emailError: '',
			userExist: '',
			emailExist: '',
			isLoading: ''
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	onChange(event) {
		const name = event.target.name;
		const	value = event.target.value;
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit(formData) {
		this.setState({ isLoading: true });
		formData.preventDefault();
		this.props.onSubmit(this.state)
	}

	onFocus(event) {
		const name = event.target.name;
		switch (name) {
			case 'username':
				this.setState({ usernameError: '', userExist: '' });
				break;
			case 'password':
				this.setState({ passwordError: '' });
				break;
			case 'cpassword':
				this.setState({ passwordConfirm: '' });
				break;
			case 'email':
				this.setState({ emailError: '', emailExist: '' });
		}
	}

	onBlur(event) {
		const name = event.target.name;
		const	value = event.target.value;

		switch (name) {
			case 'password':
				if (value.length < 5 || !value) {
					this.setState({ 
						passwordError: 'Password must be a minimum of 8 characters' 
					});
					return false;
				} else {
					this.setState({ passwordError: '' });
					return true;
				}
			case 'email':
				this.props.EmailExist({ email: value })
				.then((data) => {
					if (data.length > 1) {
						this.setState({ emailExist: data });
						return false;
					} else {
						return true;
					}
				});
				break;

			case 'username':
				this.props.UserExist({ username: value })
				.then((data) => {
					if (data.length > 1) {
						this.setState({ userExist: data });
					} else {
						this.setState({ userExist: '' });
					}
				});
				if (value.length < 4 || !value) {
					this.setState({ 
						usernameError: 'username must be a minimum of 5 characters' 
					});
					return false;
				} else {
					this.setState({ usernameError: '' });
					return true;
				}
		}
	}

	render() {
		const { userExist } = this.props;
		return (
			<div id="register" className="col s12">
				<form className="col s12" id="form-validate" 
				onSubmit={this.handleSubmit}>
					<div className="form-container">
						<div className="row">
							<div className="input-field col s6">
								<input
									name="fullName"
									type="text"
									onChange={this.onChange}
									className="validate"
									required
								/>
								<label htmlFor="fullName">Full Name</label>
								<div className="red-text">{this.state.fullNameError}</div>
							</div>
							<div className="input-field col s6">
								<input
									name="username"
									id="uname"
									type="text"
									onBlur={this.onBlur}
									onChange={this.onChange}
									onFocus={this.onFocus}
									className="validate"
									required
								/>
								<label htmlFor="username">username</label>
								<div className="red-text">{this.state.userExist}</div>
								<div className="red-text">{this.state.usernameError}</div>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									name="email"
									type="email"
									onChange={this.onChange}
									onBlur={this.onBlur}
									onFocus={this.onFocus}
									className="validate"
									required
								/>
								<label htmlFor="email">Email</label>
								<div className="red-text">{this.state.emailError}</div>
								<div className="red-text">{this.state.emailExist}</div>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									name="password"
									type="password"
									id="pword"
									onChange={this.onChange}
									onBlur={this.onBlur}
									onFocus={this.onFocus}
									className="validate"
									required
								/>
								<label htmlFor="password">Password</label>
								<div className="red-text">{this.state.passwordError}</div>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<input
									name="cpassword"
									onChange={this.onChange}
									onBlur={this.onBlur}
									onFocus={this.onFocus}
									type="password"
									className="validate"
								/>
								<label htmlFor="cpassword">Password Confirmation</label>
								<div className="red-text">{this.state.passwordConfirm}</div>
							</div>
						</div>
						<center>
							<button
								className="btn waves-effect waves-light teal"
								id="createAccount"
								type="submit"
								name="submit"
							>
								Submit
							</button>
						</center>
					</div>
				</form>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { checkUserExist, 
  checkEmailExist, reMap } from '../../utils/validation';
  
/**
 * @description - Edit profile modal component
 * 
 * @class EditProfileModal
 * 
 * @extends {Component}
 */
class EditProfileModal extends Component {
	/**
	 * @description - Creates an instance of EditProfileModal.
	 * 
	 * @param {Object} props - Component properties
	 * 
	 * @memberOf EditProfileModal
	 */
	constructor(props) {
		super(props);
		this.state = {
			fullName: this.props.fullname,
			email: this.props.email,
			edit: false,
			emailExist: '',
			profile: true,
			fullnameError: '',
			oldPassword: '',
			newPassword: ''
		};

		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	/**
   * Validates the user input
   * 
   * @param {Object} event 
	 * 
   * @returns {Object}
   * 
   * @memberOf Profile
   */
	onBlur(event) {
		const name = event.target.name;
		const value = event.target.value;

		switch (name) {
			case 'fullName':
				const validator = /[A-Za-z]/g;
				if (!validator.test(value)) {
					this.setState({
						fullnameError: 'Invalid input, only alphabets are allowed'
					});
					return false;
				}
				break;
			case 'email':
				const userId = this.props.userId;			
				const emailValidator = /\S+@\S+\.\S+/;
				if(!emailValidator.test(value)){
					this.setState({ emailExist: 'Invalid email supplied!' });
					return false;
				} else {
					checkUserExist({ email: value, userId })
					.then((response) => {
						if (response.length > 1) {
							this.setState({ emailExist: response });
							return false;
						} else {
							return true;
						}
					});
				}
				break;
		}
	}

	/**
   * @description - Clears error from application local state
   * 
   * @param {Object} event 
   * 
   * @memberOf Profile
   */
	onFocus(event) {
		const name = event.target.name;
		const value = event.target.value;

		switch (name) {
			case 'fullName':
				this.setState({ fullnameError: '' });
				break;
			case 'email':
				this.setState({ emailExist: '' });
				break;
		}
  }
  
  	/**
   * @description - Submits user input
   * 
   * @param {Object} event 
   * 
   * @memberOf EditProfileModal
   */
  handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(this.state);
	}

	/**
   * @description - set user input to state
   * 
   * @param {Object} event 
   * 
   * @memberOf Profile
   */
	onChange(event) {
		const name = event.target.name;
		const	value = event.target.value;
		this.setState({ [name]: value });
	}
	render() {
		return (
			<div>
				<div id="edit">
					<div
						id="profile_edit"
						style={{
							backgroundColor: '#fff'
						}}
						className="row modal"
					>
						<h4
							style={{
								alignContent: 'center',
								marginLeft: '20px'
							}}
						>
							Edit Profile
						</h4>
						<div className="modal-content">
							<form name="edit_profile" id="edit_profile" 
								onSubmit={this.handleSubmit}>
								<div className="edit-profile">
									<div className="row">
										<div className="input-field col s12">
											<b>Username</b>
											<input
												id="username"
												type="text"
												name="username"
												className="validate"
												defaultValue={this.props.username}
												disabled
											/>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<b>Full Name</b>
											<input
												id="fullName"
												type="text"
												name="fullName"
												onBlur={this.onBlur}
												onChange={this.onChange}
												onFocus={this.onFocus}
												defaultValue={this.props.fullname}
												className="validate"
												required
											/>
											<div className="red-text">{this.state.fullnameError}</div>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<b>Email Address</b>
											<input
												id="email"
												type="email"
												name="email"
												className="validate"
												onBlur={this.onBlur}
												onFocus={this.onFocus}
												defaultValue={this.props.email}
												onChange={this.onChange}
												required
											/>
											<div className="red-text">{this.state.emailExist}</div>
										</div>
									</div>
							<div className="center red-text">
							(Leave blank unless you want to change your password)</div>
									<div className="row">
										<div className="input-field col s6">
											<b>Old Password</b>
											<input
												id="oldPassword"
												type="password"
												name="oldPassword"
												className="validate"
												onBlur={this.onBlur}
												onFocus={this.onFocus}
												onChange={this.onChange}
											/>
										</div>

										<div className="input-field col s6">
											<b>New Password</b>
											<input
												id="newPassword"
												type="password"
												name="newPassword"
												className="validate"
												onBlur={this.onBlur}
												onFocus={this.onFocus}
												onChange={this.onChange}
											/>
										</div>
									</div>
								</div>
								<button
									style={{
										backgroundColor: 'rgb(21, 179, 157)',
										color: '#fff',
										float: 'right'
									}}
									className="btn waves-effect"
									type="submit"
									name="submit"
								disabled={this.state.fullnameError.length > 1 ||
								 this.state.emailExist.length > 1}>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditProfileModal;

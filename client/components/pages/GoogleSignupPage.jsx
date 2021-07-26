import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import RegisterationForm from '../auth/RegisterationForm';
import { connect } from 'react-redux';
import { decode } from 'jsonwebtoken';
import Footer from '../includes/Footer';
import { registerUserAction } from '../../actions/UserActions';
import { checkUserExist, reMap } from '../../utils/validation';

/**
 * 
 * 
 * @export {Object}
 * 
 * @class GoogleSignUpPage
 * 
 * @extends {Component}
 */
export class GoogleSignUpPage extends Component {

	/**
	 * @description Renders the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf GoogleSignUpPage
	 */
	render() {
		const { fullName, 
			email } = decode(localStorage.getItem('userData')).userObject;
			
		if (localStorage.getItem('token')) {
			this.props.history.push('/dashboard');
		}
		return (
			<div>
				<NavBar />
				<div className="row">
					<div className="col l6">
						<div className="hide-on-med-and-down">
							<img
								style={{
									marginTop: 80,
									width: '80%'
								}}
								src="https://img.clipartxtras.com/8765872902566a841f9df582bc9f23d9_library-media-center-welcome-to-the-sipsey-valley-high-school-students-in-library-clipart_648-490.gif"
							/>
						</div>
					</div>
					<div style={{marginTop: '20px'}} className="col l6 m12 s12 white">
						<RegisterationForm
							fullName={fullName}
							email={email}
							onSubmit={this.props.registerUserAction}
							UserExist={checkUserExist}
              EmailExist={checkUserExist}
						/>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
function mapStateToProps(state) {
	return {
		message: state.auth.message,
		userExist: state.userExist
	};
}

export default connect(mapStateToProps, 
	{ registerUserAction })(GoogleSignUpPage);

import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import AuthPage from '../auth/AuthPage';
import { connect } from 'react-redux';
import Footer from '../includes/Footer';
import { registerUserAction, loginAction } from '../../actions/AuthActions';

/**
 * 
 * 
 * @export {Object}
 * @class HomePage
 * @extends {Component}
 */
export class HomePage extends Component {
	render() {
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
					<div className="col l6 m12 s12">
						<AuthPage
							loginAction={this.props.loginAction}
							registerUserAction={this.props.registerUserAction}
							userExist={this.props.userExist}
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
	{ registerUserAction, loginAction })(HomePage);

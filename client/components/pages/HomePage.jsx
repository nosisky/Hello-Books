import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import AuthPage from '../auth/AuthPage';
import { connect } from 'react-redux';
import Footer from '../includes/Footer';
import { registerUserAction, loginAction } from '../../actions/UserActions';

/**
 * 
 * 
 * @export {Object}
 * 
 * @class HomePage
 * 
 * @extends {Component}
 */
export class HomePage extends Component {

	componentDidMount(){
		$('.button-collapse').sideNav({
    menuWidth: 250, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
		$('ul.tabs').tabs();
	}

	/**
	 * Renders the component
	 * 
	 * @returns 
	 * 
	 * @memberOf HomePage
	 */
	render() {
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
							apiStatus={this.props.apiStatus}
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
		userExist: state.userExist,
		apiStatus: state.auth.apiStatus
	};
}

export default connect(mapStateToProps, 
	{ registerUserAction, loginAction })(HomePage);

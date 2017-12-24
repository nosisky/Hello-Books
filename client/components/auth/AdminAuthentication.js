import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';
import { logoutAction } from '../../actions/AuthActions';


dotenv.load();

/**
 * 
 * @description - Higher order component for admin authentication
 * 
 * @export {Object}
 * 
 * @param {Object} ComposedComponent 
 * 
 * @returns {Object}
 */
export default function (ComposedComponent) {
	class AdminAuthentication extends Component {

		/**
		 * @description - Validates the user authentication data
		 * 
		 * @memberOf AdminAuthentication
		 */
		componentWillMount() {
			const key = process.env.secretKey;

			const token = localStorage.getItem('token');
			if (token) {
				jwt.verify(token, key, (error) => {
					if (error) {
						this.props.actions.logoutAction();
						this.props.history.push('/');
					}
				});
			}
			if (!this.props.authenticated) {
				this.props.history.push('/');
			}

			if (this.props.user.isAdmin !== 1) {
				this.props.history.push('/');
			}
		}

		/**
		 * @description - Executes before component is updated 
		 * 
		 * @param {Object} nextProps 
		 * 
		 * @memberOf AdminAuthentication
		 */
		componentWillUpdate(nextProps) {
			if (nextProps.currentUser.isAdmin !== 1) {
				this.props.history.push('/');
			}
		}

		/**
		 * @description - Renders the component
		 * 
		 * @returns { Object }
		 * 
		 * @memberOf AdminAuthentication
		 */
		render() {
			return <ComposedComponent {...this.props} />;
		}
	}
	AdminAuthentication.PropTypes = {
		router: PropTypes.object
	};

	/**
	 * @description - Maps dispatch to the application action creators
	 * 
	 * @param {Function} dispatch 
	 * 
	 * @returns {Object} - Object containing action creators
	 */
	function mapDispatchToProps(dispatch) {
		return {
			actions: bindActionCreators(
				{
					logoutAction
				},
				dispatch
			)
		};
	}

	/**
	 * @description -  Maps dispatch to the component
	 * 
	 * @param {Object} - Whole application state 
	 * 
	 * @returns {Object} - Object containing application state
	 */
	function mapStateToProps(state) {
		return { 
			authenticated: state.auth.authenticated, 
			user: state.auth.user.currentUser };
	}

	return connect(mapStateToProps, mapDispatchToProps)(AdminAuthentication);
}

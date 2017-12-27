import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../../actions/UserActions';

/**
 * @description - Higher order component for user authentication
 * 
 * @param {Object} ComposedComponent 
 * 
 * @returns {Void} - nothing
 */
export default function(ComposedComponent) {

	/**
	 * 
	 * 
	 * @class Authentication
	 * 
	 * @extends {Component}
	 */
	class Authentication extends Component {

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
			if (!this.props.authenticated) {
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
			if (!nextProps.authenticated) {
				this.props.history.push('/');
			}
		}

		/**
		 * @description - Renders the component
		 * 
		 * @returns 
		 * 
		 * @memberOf AdminAuthentication
		 */
		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

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

	Authentication.PropTypes = {
		user: PropTypes.object.isRequired,
		authenticated: PropTypes.bool.isRequired
	};

	/**
	 * Maps the application state to the component props
	 * 
	 * @param {Function} state 
	 * 
	 * @returns {Object} - Object containing application state
	 */
	function mapStateToProps(state) {
		return { 
			authenticated: state.auth.authenticated, 
			user: state.auth.user };
	}

	return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

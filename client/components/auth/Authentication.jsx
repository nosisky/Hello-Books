import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../../actions/UserActions';
import configureStore from '../../store/configureStore';
import { setAuthorizationToken } from '../../utils/authorization';
import { setCurrentUser } from '../../actions/UserActions';


/**
 * @description - Higher order component for user authentication
 * 
 * @param {Object} ComposedComponent 
 * 
 * @returns {Void} - nothing
 */
export default function(ComposedComponent) {

	const store = configureStore();

	/**
	 * 
	 * 
	 * @class Authentication
	 * 
	 * @extends {Component}
	 */
	class Authentication extends Component {

		constructor(props) {
			super(props);
			this.state = {
				valid: true
			}
		}

		componentWillMount() {
			const key = process.env.secretKey;
			const token = localStorage.getItem('token');

			if (token) {
				jwt.verify(token, key, (error) => {
					if (error) {
						this.setState({
							valid: false
						}, () => {
							this.props.actions.logoutAction();
							this.props.history.push('/');
						})
					} else {
						setAuthorizationToken(token);
						const decoded = jwt.decode(token);
					}
				});
			} else {
				this.setState({
					valid: false
				}, () => this.props.actions.logoutAction());
			}
			if (!this.props.authenticated) {
				this.setState({
					valid: false
				}, () => {
					this.props.actions.logoutAction();
					this.props.history.push('/')
				});
			}
		}

		componentWillReceiveProps(nextProps) {
			if(Object.keys(nextProps.user).length === 0){
				this.setState({
					valid: false
				}, () => {
					this.props.history.push('/');
				})
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
			return (
				<div>
					{this.state.valid && <ComposedComponent {...this.props} />}
				</div>
		);
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
					logoutAction,
					setCurrentUser
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

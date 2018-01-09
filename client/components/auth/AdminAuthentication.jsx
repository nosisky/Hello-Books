import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';
import { logoutAction } from '../../actions/UserActions';


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

		constructor(props) {
			super(props);
			this.state = {
				valid: true
			}
		}

		/**
		 * @description - Validates the user authentication data
		 * 
		 * @memberOf AdminAuthentication
		 */
		componentWillMount() {
			const { secretKey } = process.env;

			if (!this.props.authenticated) {
				this.setState({
					valid: false
				}, () => this.props.history.push('/'));
			}

			const token = localStorage.getItem('token');
			if (token) {
				jwt.verify(token, secretKey, (error) => {
					if (error) {
						this.setState({
							valid: false
						}, () => {
							this.props.actions.logoutAction();
							this.props.history.push('/');
						})
					}
				});
				if (this.props.user.isAdmin !== 1) {
					this.props.history.push('/');
				}
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
		 * @description - Executes before component is updated 
		 * 
		 * @param {Object} nextProps 
		 * 
		 * @memberOf AdminAuthentication
		 */
		componentWillUpdate(nextProps) {
			const token = localStorage.getItem('token');

			if(token){
				if (nextProps.currentUser.isAdmin !== 1) {
					this.props.history.push('/');
				}
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
			return (
				<div>
					{this.state.valid && <ComposedComponent {...this.props} />}
				</div>
		);
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
			user: state.auth.user };
	}

	return connect(mapStateToProps, mapDispatchToProps)(AdminAuthentication);
}

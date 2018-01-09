import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { bindActionCreators } from 'redux';
import { logoutAction } from '../../actions/UserActions';
import configureStore from '../../store/configureStore';
import { setAuthorizationToken } from '../../utils/authorization';
import { SET_CURRENT_USER } from '../../actions/ActionTypes';


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
	class GuestAuthentication extends Component {

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
        this.setState({
					valid: false
				}, () => this.props.history.push('/dashboard'));
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


	return GuestAuthentication;
}

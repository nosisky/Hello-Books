import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import AdminHeader from '../includes/AdminHeader';
import AddBook from '../includes/AddBook';
import AdminSideBar from '../includes/AdminSideBar';
import { addBookAction } from '../../../actions/BookActions';

/**
 * 
 * 
 * @class AddANewBook
 * @extends {Component} extends React.Component
 */
class AddANewBook extends Component {

	/**
	 * 
	 * Renders the application
	 * @returns {Object}
	 * 
	 * @memberOf AddANewBook
	 */
	render() {
		const { addNewBookAction } = this.props;
		return (
			<div>
				<AdminHeader />
				<AdminSideBar fullname={this.props.user.fullname} 
        isAdmin={this.props.user.isAdmin} />
				<AddBook onSubmit={this.props.addBookAction} />
			</div>
		);
	}
}

/**
 * 
 * 
 * @param {Object} state 
 * 
 * @returns {Object} Object containing the application state
 */
function mapStateToProps(state) {
	return {
		user: state.auth.user.currentUser
	};
}
export default connect(null, { addBookAction })(AddANewBook);

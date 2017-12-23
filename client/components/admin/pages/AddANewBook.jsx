import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import AdminHeader from '../includes/AdminHeader';
import AdminSideBar from '../includes/AdminSideBar';
import { addBookAction } from '../../../actions/BookActions';

/**
 * 
 * 
 * @class AddANewBook
 * @extends {Component} extends React.Component
 */
export class AddANewBook extends Component {

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
<<<<<<< HEAD
=======
				<AddBook 
				firebaseStorage={firebase.storage().ref('images')}
				onSubmit={this.props.addBookAction} />
>>>>>>> origin/chore/153436554/implement-more-tests
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

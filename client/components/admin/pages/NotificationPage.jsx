import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../includes/AdminHeader';
import AdminSideBar from '../includes/AdminSideBar';
import DashboardFooter from '../../includes/DashboardFooter';
import Notification from '../includes/Notification';
import { getAllNotifications } from '../../../actions/BookActions';

/**
 * 
 * 
 * @class NotificationPage
 * 
 * @extends {Component} extends React.Component
 */
class NotificationPage extends Component {

	/**
	 * @description - Sets all notifications in application local state
	 * 
	 * @memberOf NotificationPage
	 */
	componentDidMount() {
		this.props.getAllNotifications()
	}

	/**
	 * 
	 * @description - Displays the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf NotificationPage
	 */
	render() {
		return (
			<div>
				<AdminHeader />
				<div className="row">
					<div className="col l3">
						<AdminSideBar 
						fullname={this.props.user.fullName} 
        		isAdmin={this.props.user.isAdmin}/>
					</div>
					<div className="col l9 m12 s12">
						{this.props.notifications.map((response) => {
							return (
									<Notification
										key={response.id}
										message={response.message}
										time={response.updatedAt}
									/>
							);
						})}
					</div>
					<DashboardFooter />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		user: state.auth.user,
		notifications: state.book.notifications
	}
}

export default connect(mapStateToProps, {getAllNotifications})(NotificationPage);

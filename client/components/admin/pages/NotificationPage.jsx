import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../includes/AdminHeader';
import AdminSideBar from '../includes/AdminSideBar';
import DashboardFooter from '../../includes/DashboardFooter';
import Notification from '../includes/Notification';
import Notifications from '../../../utils/Notifications';

/**
 * 
 * 
 * @class NotificationPage
 * @extends {Component} extends React.Component
 */
class NotificationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	/**
	 * ComponentDidMount - Executes when the component successfully renders
	 * @memberOf NotificationPage
	 */
	componentDidMount() {
		Notifications()
			.then((data) => {
				this.setState({
					data
				});
			})
			.catch((error) => error);
	}

	/**
	 * 
	 * Displays the component
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
						<AdminSideBar />
					</div>
					<div className="col l9 m12 s12">
						{this.state.data.map((response) => {
							return (
								<div>
									<Notification
										key={response.id}
										message={response.message}
										time={response.updatedAt}
									/>
								</div>
							);
						})}
					</div>
					<DashboardFooter />
				</div>
			</div>
		);
	}
}

export default NotificationPage;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminHeader from '../includes/AdminHeader';
import AdminSideBar from '../includes/AdminSideBar';
import DashboardFooter from '../../includes/DashboardFooter';
import Notification from '../includes/Notification';
import notifications from '../../../utils/notifications';

/**
 * 
 * 
 * @class NotificationPage
 * 
 * @extends {Component} extends React.Component
 */
class NotificationPage extends Component {

	/**
	 * @description - Creates an instance of NotificationPage.
	 * 
	 * @param {Object} props - Properties of the component
	 * 
	 * @memberOf NotificationPage
	 */
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	
	/**
	 * @description - Sets all notifications in application local state
	 * 
	 * @memberOf NotificationPage
	 */
	componentDidMount() {
		notifications()
			.then((data) => {
				this.setState({
					data
				});
			})
			.catch((error) => error);
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

function mapStateToProps(state){
	user: state.auth.user
}

export default connect(mapStateToProps)(NotificationPage);

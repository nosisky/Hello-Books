import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction, editProfileAction } from '../../actions/UserActions';
import { searchAction } from '../../actions/BookActions';
import mailSender from '../../utils/mailSender';

/**
 * @description - User page header component
 * 
 * @class Header
 * 
 * @extends {Component}
 */
export class Header extends Component {
	/**
	 * @description - Creates an instance of Header.
	 * 
	 * @param {Object} props 
	 * 
	 * @memberOf Header
	 */
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);

		this.state = {
			plan: '',
			search: '',
			displaySearch: false
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.searchDisplay = this.searchDisplay.bind(this);
		this.fetchResult = this.fetchResult.bind(this);
	}

	/**
	 * @description - Executes after the component has rendered
	 * 
	 * @memberOf Header
	 */
	componentDidMount() {
		$('.button-collapse').sideNav({
			menuWidth: 300, // Default is 300
			edge: 'left', // Choose the horizontal origin
			closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});
		$('.dropdown-button').dropdown({
			hover: true
		});
		$('.modal').modal();
	}

	/**
	 * @description - Logs the user out of the application
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	logout(event) {
		event.preventDefault();

		this.props.actions.logout();
	}

	/**
	 * @description - Sets user input to applocation local state
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	onChange(event) {
		const name = event.target.name;
		const value = event.target.value;

		this.setState({
			[name]: value
		});
	}

	/**
	 * @description - Handles form submit
	 * 
	 * @param {Object} event 
	 * 
	 * @memberOf Header
	 */
	onSubmit(event) {
		event.preventDefault();
		Materialize.toast('Transaction is in process...', 2000, 'green');
		$('#plan').modal('close');		
		const data = {
			message: `${this.props.user.username} wants an account
       upgrade to ${this.state.plan}`,
			subject: 'Account upgrade Notification'
		};

		mailSender(data)
			.then((status) => {
				if (status) {
					swal('Response recieved successfully, an Admin will get back to you.');
				}
			})
			.catch((error) => Materialize.toast(error, 1000, 'red'));
	}

	fetchResult(event) {
		this.props.actions.searchAction({ search: event.target.value });
	}

	searchDisplay() {
		this.setState({
			displaySearch: !this.state.displaySearch
		});
	}

	/**
	 * @description - Displays the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf Header
	 */
	render() {
		const showSearch = window.location.pathname === '/dashboard';
		const style = {
			button: {
				backgroundColor: 'rgb(37, 76, 71)',
				color: '#fff',
				float: 'right'
			}
		};

		return (
			<div id="menu">
				<nav>
					<div className="nav-wrapper">
						<a href="#" data-activates="slide-out" 
						className="button-collapse hide-on-large-only left">
							<i
								style={{
									color: '#fff',
									fontSize: 40
								}}
								className="material-icons"
							>
								menu
							</i>
						</a>
						<a
							className="right hide-on-large-only"
							name="logout"
							onClick={this.props.actions.logoutAction}
						>
							<i className="material-icons">exit_to_app</i>
						</a>

						{ this.state.displaySearch && 
								<a onClick={this.searchDisplay} 
								className="right hide-on-large-only">
								<i className="material-icons">cancel</i>
								</a>	
							 }
						<div className="right hide-on-large-only">
							{showSearch && !this.state.displaySearch && (
								<a onClick={this.searchDisplay}>
									<i className="material-icons">search</i>
								</a>
							)}

							{showSearch && this.state.displaySearch && (
								<input 
								onChange={this.fetchResult} 
								type="search" name="search" placeholder="Search book..." />
							)}

						</div>
						<ul className="right hide-on-med-and-down">
							<li>
								{showSearch && !this.state.displaySearch && (
									<a id="showSearch" onClick={this.searchDisplay}>
										<i className="material-icons">search</i>
									</a>
								)}

								{showSearch && this.state.displaySearch && (
									<input
										onChange={this.fetchResult}
										type="text"
										name="search"
										placeholder="Search book..."
									/>
								)}
							</li>
							<li>
							{ this.state.displaySearch && 
								<a onClick={this.searchDisplay}>
								<i className="material-icons">cancel</i>
								</a>	}																
							</li>
							<li>
								<a id="logout_icon" 
								onClick={this.props.actions.logoutAction} >
									<i className="material-icons">exit_to_app</i>
								</a>
							</li>
							<li>
								<a id="hide" 
								className="dropdown-button" data-activates="dropdown2">
									<i className="material-icons">more_vert</i>
								</a>
							</li>
						</ul>
						<ul id="dropdown2" className="dropdown-content">
							<li>
								<Link to="/profile">Profile</Link>
							</li>
							<li>
								<a name="logout" onClick={this.props.actions.logoutAction} >
									Logout
								</a>
							</li>
							<li>
								<a className="modal-trigger" href="#plan">
									Upgrade Plan
								</a>
							</li>
						</ul>
					</div>
				</nav>

				{/* Upgrade Form Modal */}
				<div id="plan" className="modal">
					<div className="modal-content">
						<div className="row">
							<h4 className="center-align">Upgrade Your Membership Plan</h4>
							<br />
							<form name="plan" onSubmit={this.onSubmit} className="col s12">
								<div className="row">
									<div className="col s12">
										<select
											name="plan"
											id="plan"
											className="browser-default"
											onChange={this.onChange}
										>
											<option defaultValue>--Select New Plan--</option>
											<option value="Gold">Gold(10,000 Naira monthly)</option>
											<option value="Diamond">Diamond(6,000 Naira monthly)</option>
											<option value="Silver">Silver(Free)</option>
										</select>
									</div>
								</div>
								<button className="btn">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Header.PropTypes = {
	fullName: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

/**
 * Maps the application state to component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
	return { 
		apiStatus: state.auth.apiStatus,
		user: state.auth.user 
	};
}

/**
 * 
 * Maps dispatch to component Props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				logoutAction,
				editProfileAction,
				searchAction
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

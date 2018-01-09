import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCategoryAction } from '../../../actions/BookActions';
import { logoutAction } from '../../../actions/UserActions';

/**
 * 
 * 
 * @export { Object }
 * 
 * @class AdminHeader
 * 
 * @extends {Component}
 */
export class AdminHeader extends Component {

	/**
	 * 
	 * @description - Executes after component is mounted
	 * 
	 * @memberOf AdminHeader
	 */
	componentDidMount() {
		$('.button-collapse').sideNav({
			menuWidth: 300, // Default is 300
			edge: 'left', // Choose the horizontal origin
			closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});
		$('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrainWidth: false, // Does not change width of dropdown to that of the activator
			hover: true, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: false, // Displays dropdown below the button
			alignment: 'left', // Displays dropdown with edge aligned to the left of button
			stopPropagation: false // Stops event propagation
		});
		$('.modal').modal();
	}

	/**
	 * 
	 * @description - Renders the component
	 * 
	 * @memberOf AdminHeader
	 * 
	 * @return {Object}
	 */
	render() {
		const style = {
			account: {
				float: 'right',
				color: '#fff',
				padding: 5
			},
			main: {
				float: 'right',
				marginLeft: 5,
				backgroundColor: '#425c6f'
			},
			row: {
				backgroundColor: '#15b39d'
			},
			img: {
				borderRadius: 50,
				border: '2px solid black'
			},
			side: {
				textAlign: 'center',
				color: '#fff',
				backgroundColor: '#15b39d',
				marginTop: -16
			},
			menuIcon: {
				color: '#fff',
				fontSize: 40
			},
			button: {
				backgroundColor: 'rgb(37, 76, 71)',
				color: '#fff',
				float: 'right'
			}
		};
		return (
			<header>
				<div className="admin-header-side" id="container">
					<ul id="dropdown1" className="dropdown-content">
						<li>
							<a href="#!">{this.props.user.username}</a>
						</li>
						<li className="divider" />
						<li>
							<a onClick={this.props.actions.logoutAction} >
								<i className="material-icons">exit_to_app</i>
								Logout
							</a>
						</li>
					</ul>
					<div id="menu">
						<div style={style.account}>
							<a style={style.main} 
							id="hide"
							className="dropdown-button btn hide-on-med-and-down" href="#" 
							data-activates="dropdown1">
								Account
							</a>
						</div>
						<div id="content">
							<a href="#" data-activates="slide-out" 
							className="button-collapse hide-on-large-only">
								<i style={style.menuIcon} className="material-icons">
									menu
								</i>
							</a>

							<a id="hide"
								className="right hide-on-med-and-down white-text" 
								name="logout" onClick={this.props.actions.logoutAction} 
								>
									<i style={{paddingTop: 6, fontSize: '2.5rem'}} 
									className="small material-icons">exit_to_app</i>
								</a>

								<a id="hide-pc"
								className="right show-on-small white-text" 
								name="logout" onClick={this.props.actions.logoutAction} 
								>
									<i style={{paddingTop: 6, fontSize: '2.5rem'}} 
									className="small material-icons">exit_to_app</i>
								</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

AdminHeader.PropTypes = {
	fullName: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

/**
 * 
 * @description - Maps dispatch to component props 
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
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
 * @description -  Maps the redux state to component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
export function mapStateToProps(state) {
	return { user: state.auth.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);

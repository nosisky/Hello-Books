import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * @description - User side bar component
 * 
 * @class SideBar
 * 
 * @extends {Component}
 */
export class SideBar extends Component {

	/**
	 * @description - Executes after the component has rendered
	 * 
	 * 
	 * @memberOf SideBar
	 */
	componentDidMount() {
		$('.button-collapse').sideNav({
			edge: 'left', // Choose the horizontal origin
			menuWidth: '300',
			closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});
		$(".dropdown-button").dropdown();
		$('.modal').modal();
	}

	/**
	 * @description - Renders the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf SideBar
	 */
	render() {
		return (
			<ul id="slide-out" 
			className="col s2 m3 l3 side-nav fixed show-on-large-only">
				<div
					style={{
						textAlign: 'center',
						color: '#000',
						backgroundColor: '#25758c',
						marginTop: -16
					}}
				>
					<div className="row">
						<span className="card-title">
							<h4>
								<Link id="dashboard" 
									className="white-text" to="dashboard">
									Dashboard
								</Link>
							</h4>
						</span>
						<li className="divider" />
						<p />
						<img
							style={{
								borderRadius: 50,
								border: '2px solid black'
							}}
							width="100px"
							height="100px"
							src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
							alt="HelloBooks"
						/>
						<br />
						<i className="material-icons white-text">account_circle</i>
						<span className="white-text"><b>{this.props.fullname}</b></span>
					</div>
					<br />
				</div>
				<li className="divider" />
				<li id="menu-list">
					<Link id="rentedBooks" to="rented-books">
						Rent History
						<i className="material-icons">history</i>
					</Link>
				</li>
				<li id="menu-list">
					<Link to="/dashboard">
						Rent a Book
						<i className="material-icons">reorder</i>
					</Link>
				</li>
				<li id="menu-list">
					<Link to="rented-books">
						Rented Books
						<i className="material-icons">filter_list</i>
					</Link>
				</li>
				<li id="menu-list">
					<Link to="profile">
						My Profile
						<i className="material-icons">person</i>
					</Link>
				</li>
				<li id="menu-list">
					<a className="modal-trigger" href="#plan">
						Upgrade Plan
						<i className="material-icons">send</i>
					</a>
				</li>
				{this.props.isAdmin === 1 && (
					<li id="menu-list">
						<Link to="/admin">
							Admin Section
							<i className="material-icons">verified_user</i>
						</Link>
					</li>
				)}
			</ul>
		);
	}
}

export default SideBar;

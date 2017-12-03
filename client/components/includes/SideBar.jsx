import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {
	componentDidMount() {
		$('.button-collapse').sideNav({
			edge: 'left', // Choose the horizontal origin
			menuWidth: '300',
			closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
		});
		$('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrainWidth: false, // Does not change width of dropdown to that of the activator
			hover: false, // Activate on hover
			gutter: 0, // Spacing from edge
			belowOrigin: false, // Displays dropdown below the button
			alignment: 'left', // Displays dropdown with edge aligned to the left of button
			stopPropagation: false // Stops event propagation
		});
		$('.modal').modal();
	}
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
								<Link className="white-text" to="dashboard">
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
						<i className="material-icons">account_circle</i>
						<b>{this.props.fullname}</b>
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

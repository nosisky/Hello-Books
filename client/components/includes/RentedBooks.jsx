import React, { Component } from 'react';
import swal from 'sweetalert';

export default class RentedBooks extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		swal({
			title: 'Are you sure?',
			text: 'Do you really want to return the book?',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willReturn) => {
			if (willReturn) {
				this.props
					.returnBook(this.props.userId, { bookId: this.props.id })
					.then((res) => {
						if (res) {
							{
								swal(res.message, { icon: 'success' });
							}
						} else {
							swal(res, { icon: 'warning' });
						}
					})
					.catch((error) => error);
			}
		});
	}
	render() {
		return (
			<div className="book col s12 m3 l3">
				<div className="card">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="activator" src={this.props.cover} />
					</div>
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4">{this.props.title}</span>
						<span className="truncate">{this.props.description}</span>
						<p>
							{!this.props.isReturned && (
								<a href="#" id="returnBook" onClick={this.handleClick} className="btn">
									Return
								</a>
							)}
							{this.props.isReturned && (
								<a href="#" onClick={this.handleClick} className="btn disabled">
									Returned
								</a>
							)}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

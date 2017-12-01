import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { rentBookAction } from '../../actions/BookActions';

export default class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const cur = new Date(),
			after30days = cur.setDate(cur.getDate() + 30),
			finalDate = new Date(after30days);
			const newTime = moment(finalDate)
			.format('MMMM Do YYYY, h:mm a');
		swal({
			title: 'Are you sure?',
			text: `You will be mandated to return this book on or before ${newTime}`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willBorrow) => {
			if (willBorrow) {
				rentBookAction(this.props.userId, { bookId: this.props.id })
			}
		});
	}

	render() {
		return (
			<div className="book col s12 m3 l3">
				<div className="card">
					<div className="card-image waves-effect waves-block waves-light">
						<img className="activator" height="150px" 
						src={this.props.cover} />
					</div>
					<div className="card-content">
						<span className="card-title activator grey-text text-darken-4">
							{this.props.title}</span>
						<span className="truncate">{this.props.description}</span>
						<p>
							<a href="#" onClick={this.handleClick} className="btn">
								Borrow Now
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

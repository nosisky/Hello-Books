import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSpecificBook, 
	returnBook, 
	getRentedBooksAction } from '../../actions/BookActions';
import { bindActionCreators } from 'redux';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import AllBooks from '../includes/AllBooks';
import DashboardFooter from '../includes/DashboardFooter';

export class RentedBooksPage extends Component {
	constructor(props) {
		super(props);
		this.renderRentedBooks = this.renderRentedBooks.bind(this);
		this.handleClick =  this.handleClick.bind(this);
	}

	componentDidMount(props) {
		this.props.actions.getRentedBooksAction(this.props.user.id);
	}

	handleClick(id) {
		swal({
			title: 'Are you sure?',
			text: 'Do you really want to return the book?',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willReturn) => {
			if (willReturn) {
				this.props.actions.returnBook(this.props.user.id, { bookId: id })
			}
		});
	}

	renderRentedBooks() {
		let rentedBooks = this.props.rentedBooks.allRentedBooks;
		if (rentedBooks.length < 1) {
			return (
				<div>
					<SideBar fullname={this.props.user.fullname} 
					isAdmin={this.props.user.isAdmin} />
					<h1 className="empty-notifier">You have not rented any book</h1>
				</div>
			);
		} else {
			return (
				<div className="row">
					<SideBar fullname={this.props.user.fullName} 
					isAdmin={this.props.user.isAdmin} />

					<div className="row">
						<div className="col s12 push-l3 m9">
							{rentedBooks.map((book) => {
								return (
									<AllBooks
									prodYear={book.prodYear}
									total={book.total}
									isbn={book.isbn}
									rented={true}
									isReturned={book.returned}
									handleAction={this.handleClick}
									author={book.author}
									description={book.description}
									id={book.bookId}
									userId={this.props.user.id}
									key={book.id}
									title={book.title}
									cover={book.cover}
									description={book.description}
									/>
								);
							})}
						</div>
					</div>
				</div>
			);
		}
	}
	render() {
		return (
			<div>
				<Header /> {this.renderRentedBooks()}
				<DashboardFooter />
			</div>
		);
	}
}

AllBooks.PropTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	rentedBooks: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		rentedBooks: state.book,
		user: state.auth.user.currentUser
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getRentedBooksAction,
				returnBook
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RentedBooksPage);

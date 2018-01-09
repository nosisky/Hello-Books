import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
				returnBook, 
				getRentedBooksAction } from '../../actions/BookActions';
import { bindActionCreators } from 'redux';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import AllBooks from '../includes/AllBooks';
import DashboardFooter from '../includes/DashboardFooter';

/**
 * @description RentedBooks component
 * 
 * @export {Object}
 * 
 * @class RentedBooksPage
 * 
 * @extends {Component}
 */
export class RentedBooksPage extends Component {
	constructor(props) {
		super(props);
		this.renderRentedBooks = this.renderRentedBooks.bind(this);
		this.handleClick =  this.handleClick.bind(this);
	}

	/**
	 * @description Fetches the list of rented books by a user
	 * 
	 * @param {Object} props 
	 * 
	 * @memberOf RentedBooksPage
	 */
	componentDidMount(props) {
		const userId = this.props.user.id || this.props.user.userId
		this.props.actions.getRentedBooksAction(userId);
	}

	/**
	 * @description Handles book return
	 * 
	 * @param {String} id 
	 * 
	 * @memberOf RentedBooksPage
	 */
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

	/**
	 * @description Displays lists of rented books
	 * 
	 * @returns 
	 * 
	 * @memberOf RentedBooksPage
	 */
	renderRentedBooks() {
		let rentedBooks = this.props.rentedBooks.allRentedBooks;
		if (!rentedBooks || rentedBooks.length < 1) {
			return (
				<div>
					<SideBar fullname={this.props.user.fullName} 
					isAdmin={this.props.user.isAdmin} />
					{
						this.props.apiStatus ? <div className="preloader"></div> : 
						<div className="empty-notifier">You have not rented any book</div>
					}
				</div>
			);
		} else {
			return (
				<div className="row">
					<SideBar fullname={this.props.user.fullName} 
						isAdmin={this.props.user.isAdmin} />

					<div className="row">
						<div className="col s12 l9 push-l3 m12">
							{rentedBooks.length && rentedBooks.map((book) => {
								return (
									<AllBooks
									productionYear={book.productionYear}
									total={book.total}
									isbn={book.isbn}
									rented={true}
									isReturned={book.returned}
									handleAction={this.handleClick}
									author={book.author}
									description={book.description}
									id={book.bookId}
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

	/**
	 * @description Renders the component
	 * 
	 * @returns 
	 * 
	 * @memberOf RentedBooksPage
	 */
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

/**
 * @description mapStateToProps - maps state value to props
 *
 * @param  {object} state the store state
 *
 * @return {Object} returns state object
 */
export function mapStateToProps(state) {
	return {
		rentedBooks: state.book,
		user: state.auth.user,
		apiStatus: state.auth.apiStatus
	};
}

/**
 * 
 * Maps the state to component Props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
export function mapDispatchToProps(dispatch) {
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

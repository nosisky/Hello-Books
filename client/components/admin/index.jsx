import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import AdminHeader from './includes/AdminHeader';
import AllBooks from './includes/AllBooks';
import AddBook from './includes/AddBook';
import { getAllBooksAction } from '../../actions/BookActions';
import { logoutAction } from '../../actions/AuthActions';
import AdminSideBar from './includes/AdminSideBar';

/**
 * 
 * 
 * @class AdminHome
 * @extends {Component} - Extends React.Component
 */
export class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.renderBooks = this.renderBooks.bind(this);
		this.logout = this.logout.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.renderPagination = this.renderPagination.bind(this);
	}

	/**
	 * ComponentDidMount - executes after component is successfully rendered
	 * @memberOf AdminHome
	 */
	componentDidMount() {
		this.props.actions.getAllBooksAction(1);
	}

	/**
	 * 
	 * Logs the user off the application
	 * @param {Object} event 
	 * 
	 * @memberOf AdminHome
	 */
	logout(event) {
		event.preventDefault();
		this.props.actions.logoutAction();
		this.context.router.push('/');
	}

	/**
	 * 
	 * Toggles component view
	 * @param {Object} page 
	 * 
	 * @memberOf AdminHome
	 */
	handlePageChange(page) {
		this.props.actions.getAllBooksAction(page.selected + 1);
	}

	/**
	 * 
	 * Displays pagination
	 * @param {Number} count
	 * 
	 * @returns 
	 * 
	 * @memberOf AdminHome
	 */
	renderPagination(count) {
		if (this.props.count > 8) {
			return (
				<ReactPaginate
					previousLabel={<i className="material-icons">chevron_left</i>}
					nextLabel={<i className="material-icons">chevron_right</i>}
					breakLabel={<a href="">...</a>}
					breakClassName={'break-me'}
					pageCount={this.props.count / 8}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					initialPage={count}
					onPageChange={this.handlePageChange}
					containerClassName={'pagination center-align'}
					activeClassName={'active'}
				/>
			);
		}
	}

	/**
	 * 
	 * Handles book delete
	 * @param {Number} bookId 
	 * 
	 * @memberOf AdminHome
	 */
	handleClick(bookId) {
		swal({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover it back!',
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				deleteBook(bookId).then((response) => {
					swal(response, { icon: 'success' });
				});
			} else {
				swal('Book not deleted!');
			}
		});
	}

	/**
	 * 
	 * Displays book
	 * @returns {Object}
	 * 
	 * @memberOf AdminHome
	 */
	renderBooks() {
		const { fullName } = this.props.user;

		const allbooks = this.props.books;
		if (!allbooks || allbooks.length < 1) {
			return (
				<div>
					<AdminSideBar fullname={fullName} />
					<div className="empty-notifier">
						<h2>No more book in the database</h2>
					</div>
					{this.renderPagination(this.props.count)}
				</div>
			);
		}

		return (
			<div className="row">
				<AdminSideBar fullname={fullName} />

				<div className="col s12 l9" id="list_boy">
					{allbooks.map((book) => {
						return (
							<AllBooks
								prodYear={book.prodYear}
								total={book.total}
								isbn={book.isbn}
								author={book.author}
								description={book.description}
								id={book.id}
								key={book.id}
								title={book.title}
								description={book.description}
								cover={book.cover}
							/>
						);
					})}
				</div>
				{this.renderPagination(0)}
			</div>
		);
	}

	/**
	 * 
	 * Renders the component
	 * @returns {Object}
	 * 
	 * @memberOf AdminHome
	 */
	render() {
		const { username, fullName, id } = this.props.user;
		return (
			<div>
				<AdminHeader 
				onClick={this.logout} 
				fullName={fullName} 
				username={username} /> {this.renderBooks()}
			</div>
		);
	}
}

/**
 * 
 * 
 * @param {Object} state 
 *
 * @returns Object containing selected application state
 */
function mapStateToProps(state) {
	return {
		books: state.book.data,
		count: state.book.count,
		user: state.auth.user.currentUser
	};
}

AdminHome.PropTypes = {
	books: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired
};

/**
 * 
 * 
 * @param {Function} dispatch
 * 
 * @returns - Object containing action creators
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getAllBooksAction,
				logoutAction
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);

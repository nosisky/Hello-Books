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

class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.renderBooks = this.renderBooks.bind(this);
		this.logout = this.logout.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.renderPagination = this.renderPagination.bind(this);
	}
	componentDidMount() {
		this.props.actions.getAllBooksAction(1);
	}

	logout(event) {
		event.preventDefault();
		this.props.actions.logoutAction();
		this.context.router.push('/');
	}

	handlePageChange(page) {
		this.props.actions.getAllBooksAction(page.selected + 1);
	}

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

	renderBooks() {
		const { fullname } = this.props.user;

		const allbooks = this.props.books;
		if (!allbooks || allbooks.length < 1) {
			return (
				<div>
					<AdminSideBar fullname={this.props.user.fullname} />
					<div className="empty-notifier">
						<h2>No more book in the database</h2>
					</div>
					{this.renderPagination(this.props.count)}
				</div>
			);
		}

		return (
			<div className="row">
				<AdminSideBar fullname={this.props.user.fullname} />

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
	render() {
		const { username, fullname, id } = this.props.user;
		return (
			<div>
				<AdminHeader 
				onClick={this.logout} 
				fullName={fullname} 
				username={username} /> {this.renderBooks()}
			</div>
		);
	}
}

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

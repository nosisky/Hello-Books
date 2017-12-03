import React, { Component } from 'react';
import swal from 'sweetalert';
import moment from 'moment';
import { rentBookAction } from '../../actions/BookActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { getAllBooksAction } from '../../actions/BookActions';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import AllBooks from '../includes/AllBooks';
import DashboardFooter from '../includes/DashboardFooter';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.renderBooks = this.renderBooks.bind(this);
		this.renderPagination = this.renderPagination.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.props.actions.getAllBooksAction(1);
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
					marginPagesDisplayed={1}
					pageRangeDisplayed={1}
					initialPage={count}
					onPageChange={this.handlePageChange}
					containerClassName={'pagination center-align'}
					activeClassName={'active'}
				/>
			);
		}
	}

	handleClick(id) {
		const cur = new Date(),
			after30days = cur.setDate(cur.getDate() + 20),
			finalDate = new Date(after30days);
		const newTime = moment(finalDate)
		.format('MMMM Do YYYY, h:mm a');
		swal({
			title: 'Are you sure?',
			text: `You will be mandated to return this 
			book on or before ${newTime}`,
			icon: 'warning',
			buttons: true,
			dangerMode: true
		}).then((willBorrow) => {
			if (willBorrow) {
				const userId = this.props.user.id || this.props.user.userId				
				rentBookAction(userId, 
					{ bookId: id })
			}
		});
	}

	renderBooks() {
		const allbooks = this.props.books;
		if (!allbooks) {
			return (
				<div>
					<SideBar fullname={this.props.user.fullname} 
					isAdmin={this.props.user.isAdmin} />
					<div className="col push-l3 s12">
						<img
							style={{ float: 'right', width: '50%' }}
							src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
						/>
					</div>
				</div>
			);
		} else if (allbooks.length < 1) {
			return (
				<div>
					<SideBar fullname={this.props.user.fullname} 
					isAdmin={this.props.user.isAdmin} />

					<div className="empty-notifier">
						<h2>No more book in the database</h2>
					</div>
					{this.renderPagination(this.props.count)}
				</div>
			);
		}
		return (
			<div>
				<div className="card-panel teal user-book-header">
					<center>Recently Added Books</center>
				</div>
				<div className="row">
					<div className="col s12 push-l3 m9">
						{allbooks.map((book) => {
							return (
								<AllBooks
									prodYear={book.prodYear}
									total={book.total}
									isbn={book.isbn}
									text='Borrow'
									rented={false}
									handleAction={this.handleClick}
									author={book.author}
									description={book.description}
									id={book.id}
									key={book.id}
									title={book.title}
									cover={book.cover}
									description={book.description}
								/>
							);
						})}
						{this.renderPagination(0)}
					</div>
					<SideBar fullname={this.props.user.fullname} 
					isAdmin={this.props.user.isAdmin} />
				</div>
			</div>
		);
	}

	render() {
		return (
			<div>
				<Header fullname={this.props.user.fullName} /> {this.renderBooks()}
				<DashboardFooter />
			</div>
		);
	}
}

Dashboard.PropTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	books: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.auth.user.currentUser,
		books: state.book.data,
		count: state.book.count
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getAllBooksAction
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

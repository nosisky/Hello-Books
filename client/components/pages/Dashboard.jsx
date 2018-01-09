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

/**
 * @description User dashboard component
 * 
 * @export {Object}
 * 
 * @class Dashboard
 * 
 * @extends {Component}
 */
export class Dashboard extends Component {

	/**
	 * @description Creates an instance of Dashboard.
	 * 
	 * @param {Object} props 
	 * 
	 * @memberOf Dashboard
	 */
	constructor(props) {
		super(props);
		this.renderBooks = this.renderBooks.bind(this);
		this.renderPagination = this.renderPagination.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * @description Fetches all books in the database
	 * 
	 * 
	 * @memberOf Dashboard
	 */
	componentDidMount() {
		this.props.actions.getAllBooksAction(1);
	}

	/**
	 * @description Toggles book lists 
	 * 
	 * @param {Object} page 
	 * 
	 * @memberOf Dashboard
	 */
	handlePageChange(page) {
		this.props.actions.getAllBooksAction(page.selected + 1);
	}

	/**
	 * @description Displays pagination
	 * 
	 * @param {Number} count 
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf Dashboard
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

	/**
	 * @description Handles book renting
	 * 
	 * @param {Number} id 
	 * 
	 * @memberOf Dashboard
	 */
	handleClick(id) {
		const currentDate = new Date();
		const	after20days = currentDate.setDate(currentDate.getDate() + 20);
		const	finalDate = new Date(after20days);
		const newTime = moment(finalDate).format('MMMM Do YYYY, h:mm a');

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
				this.props.actions.rentBookAction(userId, 
					{ bookId: id })
			}
		});
	}

	/**
	 * @description Displays the books
	 * 
	 * @returns {void}
	 * 
	 * @memberOf Dashboard
	 */
	renderBooks() {		
		const realFullName = this.props.user.fullname || this.props.user.fullName;		
		const allbooks = this.props.books;
		if (!allbooks) {
			return (
				<div>
					<SideBar fullname={realFullName} 
					isAdmin={this.props.user.isAdmin} />
					<div className="col push-l3 s12">
						<img
							style={{ float: 'right', width: '50%' }}
							src="https://loading.io/spinners/ellipsis/lg.discuss-ellipsis-preloader.gif"
						/>
					</div>
				</div>
			);
		} else if (allbooks.length === 0) {
			return (
				<div>
					<SideBar fullname={realFullName} 
					isAdmin={this.props.user.isAdmin} />

					<div className="empty-notifier">
					{this.props.search ? 	<b>No book matches search query</b> :
						this.props.apiStatus ? <div className="preloader"></div> :
						 <b>No more book in the database</b>
					}
					</div>
					{this.renderPagination(this.props.count)}
				</div>
			);
		}

		return (
			<div>
				<div style={{fontSize: 25}} className="card-panel teal large white-text">
					<center>Recently Added Books</center>
				</div>
				<div className="row">
					<div className="col s12 l9 push-l3 m12">
						{allbooks.map((book) => {
							return (
								<AllBooks
									productionYear={book.productionYear}
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
					<SideBar fullname={realFullName} 
					isAdmin={this.props.user.isAdmin} />
				</div>
			</div>
		);
	}

	/**
	 * @description Dsiplays the component
	 * 
	 * @returns {Object}
	 * 
	 * @memberOf Dashboard
	 */
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

/**
 * @description Maps the application state to component props
 * 
 * @param {Object} state - Application state
 *  
 * @returns {Object} - Selected state
 */
function mapStateToProps(state) {
	return {
		user: state.auth.user,
		books: state.book.data,
		search: state.book.search,
		count: state.book.count,
		apiStatus: state.auth.apiStatus
	};
}

/**
 * 
 * @description Maps dispatch to component Props
 * 
 * @param {Function} dispatch 
 *
 * @returns {Object} - Object containing functions
 */
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(
			{
				getAllBooksAction,
				rentBookAction
			},
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import loadJS from 'load-js';
import PropTypes from 'prop-types';
import {getSpecificBook, returnBook, getRentedBooksAction} from '../../actions/BookActions';
import {bindActionCreators} from 'redux';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import RentedBooks from '../includes/RentedBooks';

class RentedBooksPage extends Component {
  constructor(props) {
    super(props);
    this.renderRentedBooks = this
      .renderRentedBooks
      .bind(this);
  }

  componentDidMount(props) {
      this
        .props
        .actions
        .getRentedBooksAction(this.props.user.userId);
  }


  renderRentedBooks() {
    let rentedBooks = this.props.rentedBooks.allRentedBooks;    
    if (rentedBooks.length < 1) {
      return (
        <div>
          <SideBar 
          fullname={this.props.user.fullname}
          isAdmin={this.props.user.isAdmin}
          />
          <h1 className="empty-notifier">You have not rented any book
          </h1>
        </div>
      )
    } else {
      return (
        <div className="row">
          <SideBar 
          fullname={this.props.user.fullname}
          isAdmin={this.props.user.isAdmin}
          />
          <div className="row">
            <div className="col s12 push-l3 m9">
              {rentedBooks.map((book) => {
                return (<RentedBooks
                  description={book.description}
                  id={book.bookId}
                  userId={this.props.user.userId}
                  key={book.id}
                  isReturned={book.returned}
                  returnBook={this.props.actions.returnBook}
                  title={book.title}
                  cover={book.cover}
                  userId={book.userId}/>)
              })
}
            </div>
          </div>
        </div>

      )
    }
  }
  render() {
    return (
      <div>
        <Header/> {this.renderRentedBooks()}
      </div>
    )
  }
}

RentedBooks.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  rentedBooks: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {rentedBooks: state.book, 
    user: state.auth.user.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getRentedBooksAction,
      returnBook
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RentedBooksPage);

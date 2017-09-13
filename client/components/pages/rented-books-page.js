import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSpecificBook } from '../../actions/book_actions';
import { bindActionCreators } from 'redux';
import HeaderSideBar from '../includes/header-side-bar';
import RentedBooks from '../includes/rented-books';
import { getRentedBooks } from '../../actions/book_actions';

class RentedBooksPage extends Component {
    constructor(props) {
        super(props);
        this.renderRentedBooks = this.renderRentedBooks.bind(this);
    }

    componentDidMount(props) {
        this.props.actions.getRentedBooks(this.props.user.user.currentUser.userId);
    }
    renderRentedBooks() {
        let rentedBooks = this.props.rentedBooks.data;
        if (rentedBooks.length < 1) {
            return '...loading()'
        } else {
                return (<div className="admin-book-list">
                    <div className="card-panel teal user-book-header"><center>My Rented Books</center></div>
                    <div className="row">
                        {rentedBooks.map((books) => {
                           return   (<RentedBooks
                                  prodYear={book.prodYear}
                                  total={book.total}
                                  isbn={book.isbn}
                                  author={book.author}
                                  description={book.description}
                                  id={book.id}
                                  userId={this.props.user.userId}
                                  key={book.id}
                                  title={book.title}
                                  description={book.description}
                              />)


                        })
                      }
                    </div>
                </div>

                )
        }
    }
    render() {
        return (<div>
            <HeaderSideBar />
            {this.renderRentedBooks()}
        </div>)
    }
}

RentedBooks.PropTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    rentedBooks: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        rentedBooks: state.book,
        user: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getRentedBooks
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RentedBooksPage);
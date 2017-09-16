import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import HeaderSidebar from './includes/header-navbar';
import AllBooks from './includes/all-books';
import AddBook from './includes/add-book';
import { getAllBooks } from '../../actions/book_actions';
import { logout } from '../../actions/auth_actions';


class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.renderBooks = this.renderBooks.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.props.actions.getAllBooks();
    }

    logout(event) {

        event.preventDefault();

        this.props.actions.logout();

        this.context.router.push('/');

    }

    handleClick(bookId) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover it back!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteBook(bookId)
                        .then((res) => {
                            swal(res, {
                                icon: "success",
                            });
                        })
                } else {
                    swal("Book not deleted!");
                }
            });
    }
    renderBooks() {
        const allbooks = this.props.books;
        if (!allbooks) {
            return <div style={{ backgroundColor: '#fff', float: 'right', marginLeft: '-100px', marginRight: '-50px' }}><h2>There is no book in the database</h2></div>;
        }
        return (<div className="admin-book-list">
            <div className="card-panel teal book-header"><center>Recently Added Books</center></div>
            <div className="row">
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
                        />
                    )
                }

                )
                }
            </div>
        </div>

        )
    }
    render() {
        const { username, fullname, id} = this.props.user;        
        return (
            <div >
                <HeaderSidebar onClick={this.logout} fullName={fullname} username={username} />
                {this.renderBooks()}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.book.data,
        user: state.auth.user.currentUser
    }
}

AdminHome.PropTypes = {
    books: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAllBooks,
            logout
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllBooks } from '../../actions/book_actions';
import { bindActionCreators } from 'redux';
import HeaderSideBar from '../includes/header-side-bar';
import AllBooks from '../includes/book-list';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this.renderBooks.bind(this);
  }
  componentDidMount() {
    this.props.actions.getAllBooks()
  }

  renderBooks() {
    const allbooks = this.props.books;
    if (!allbooks) {
      return <div className="empty-notifier"><h2>There is no book in the database</h2></div>;
    }
    return (<div className="admin-book-list">
      <div className="card-panel teal user-book-header"><center>Recently Added Books</center></div>
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
              userId={this.props.user.userId}
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
    return (<div>
      <HeaderSideBar />
      {this.renderBooks()}
    </div>)
  }
}

Dashboard.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    books: state.book.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllBooks
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

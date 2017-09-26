import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { search } from '../../actions/book_actions';
import { bindActionCreators } from 'redux';
import HeaderSideBar from '../includes/header-side-bar';
import SearchResult from '../includes/search-result';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this.renderBooks.bind(this);
  }
  componentDidMount() {
      if(!location.search){
          window.location = '/dashboard'
      }
      const page = location.search.split('=')[1]
      const result = page.split('&')[0]
    this.props.actions.search({search: result})
  }

  renderBooks() {
    const allbooks = this.props.search;
    if (!allbooks || allbooks.length < 1) {
      return <div className="empty-notifier"><h4>Your query did not match any book in our database</h4></div>;
    }
    return (<div className="admin-book-list">
      <div className="card-panel teal user-book-header"><center>Search Result</center></div>
      <div className="row">
        {allbooks.map((book) => {
          return (
            <SearchResult
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

SearchPage.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    search: state.book.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      search
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

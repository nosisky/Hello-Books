import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {searchAction} from '../../actions/BookActions';
import {bindActionCreators} from 'redux';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import SearchResult from '../includes/SearchResult';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
  }
  componentDidMount() {
    if (!location.search) {
      window.location = '/dashboard'
    }
    const page = location
      .search
      .split('=')[1]
    const result = page.split('&')[0]
    this
      .props
      .actions
      .searchAction({search: result})
  }

  renderBooks() {
    const allbooks = this.props.search;
    if (!allbooks || allbooks.length < 1) {
      return <div>
        <SideBar />
      <div className="empty-notifier">
        <h4>Your query did not match any book in our database</h4>
      </div>
      </div>;
    }
    return (
      <div className="row">
        <SideBar fullname={this.props.user.fullname} 
        isAdmin={this.props.user.isAdmin}/>
        <div className="row">
        <div className="col s12 push-l3 m9">
          {allbooks.map((book) => {
            return (<SearchResult
              prodYear={book.prodYear}
              total={book.total}
              isbn={book.isbn}
              author={book.author}
              description={book.description}
              id={book.id}
              userId={this.props.user.userId}
              key={book.id}
              cover={book.cover}
              title={book.title}
              description={book.description}/>)
          })
}
        </div>
      </div>
    </div>
    )
  }

  render() {
    return (
      <div>
        <Header/> {this.renderBooks()}
      </div>
    )
  }
}

SearchPage.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {user: state.auth.user.currentUser, search: state.book.data}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      searchAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllBooksAction} from '../../actions/BookActions';
import {bindActionCreators} from 'redux';
import Header from '../includes/Header';
import SideBar from '../includes/SideBar'
import AllBooks from '../includes/AllBooks';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.renderBooks = this
      .renderBooks
      .bind(this);
  }
  componentDidMount() {
    this
      .props
      .actions
      .getAllBooksAction()
  }

  renderBooks() {
    const allbooks = this.props.books;
    if (!allbooks) {
      return <div className="empty-notifier">
        <h2>There is no book in the database</h2>
      </div>;
    }
    return (<div>

        <div className="card-panel teal user-book-header">
          <center>Recently Added Books</center></div>
        <div className="row">
        <div className="col s12 push-l3 m9">
            {allbooks.map((book) => {
              return (<AllBooks
                prodYear={book.prodYear}
                total={book.total}
                isbn={book.isbn}
                author={book.author}
                description={book.description}
                id={book.id}
                userId={this.props.user.userId}
                key={book.id}
                title={book.title}
                cover={book.cover}
                description={book.description}/>)
            })
}
        </div>
        <SideBar 
        fullname={this.props.user.fullname}
        isAdmin={this.props.user.isAdmin}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header fullname={this.props.user.fullName}/> 
        {this.renderBooks()}
      </div>
    )
  }
}

Dashboard.PropTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {user: state.auth.user.currentUser,
     books: state.book.data}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllBooksAction,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

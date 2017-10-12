import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeaderSideBar from '../includes/HeaderSideBar';
import AddBook from '../includes/AddBook';
import { addNewBook } from '../../../actions/book_actions';

class AddANewBook extends Component {

  render() {
    const { addNewBook } = this.props;
    return (<div>
      <HeaderSideBar />
      <AddBook onSubmit={this.props.addNewBook} />
    </div>)
  }

}
export default connect(null, { addNewBook })(AddANewBook);
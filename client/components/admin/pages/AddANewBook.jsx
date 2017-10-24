import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeaderSideBar from '../includes/HeaderSideBar';
import AddBook from '../includes/AddBook';
import { addBookAction } from '../../../actions/BookActions';

class AddANewBook extends Component {

  render() {
    const { addNewBookAction } = this.props;
    return (
      <div>
        <HeaderSideBar/>
        <AddBook onSubmit={ this.props.addBookAction }/>
      </div>
    )
  }

}
export default connect(null, {addBookAction})(AddANewBook);


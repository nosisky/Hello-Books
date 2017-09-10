import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import HeaderSideBar from '../includes/header-navbar';
import AddBook from '../includes/add-book';
import {addNewBook} from '../../../actions/book_actions';

class AddANewBook extends Component {

    render(){
        const { addNewBook } = this.props;
        console.log(this.props)
        return(<div>
            <HeaderSideBar />
            <AddBook onSubmit={this.props.addNewBook}/>
        </div>)
    }

}
export default connect(null, {addNewBook})(AddANewBook);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HeaderSidebar from './includes/header-navbar';
import AllBooks from './includes/all-books';
import AddBook from './includes/add-book';

export default class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            componentView: {
                displayAllBooks: true,
                displayAddBook: false,
                displayAddCat: false,
            }
        }
    }
    render(){
        return (<div>
            <HeaderSidebar />
            {this.state.componentView.displayAllBooks  && <AllBooks /> }
            {this.state.componentView.displayAddBook && <AddBook />}
        </div>)
    }
}

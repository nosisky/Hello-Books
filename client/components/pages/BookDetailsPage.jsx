import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../includes/Header';
import {bindActionCreators} from 'redux';
import { getSpecificBook } from '../../actions/BookActions';
import SideBar from '../includes/SideBar';
import DashboardFooter from '../includes/DashboardFooter';
import BookDetails from '../includes/BookDetails';

class BookDetailsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'hjk',
      description: 'tyui',
      cover: 'ghvhv',
      id: 'bhbhb',
      isbn: '1cvbj',
      author: 'bhbhh',
      prodYear: 'bhbbb'
    }
    this.renderOneBook = this.renderOneBook.bind(this);
  }
  componentDidMount(){
    this.props.actions.getSpecificBook(2)
    .then((data) => {
      console.log(data[0])
      this.setState({
        id: data[0].id,
        title: data[0].title,
        description: data[0].description,
        author: data[0].author,
        prodYear: data[0].prodYear,
        cover: data[0].cover,
        isbn: data[0].isbn
      })
    })
  }


  renderOneBook(){

    return (<BookDetails 
          title={this.state.title}
          author={this.state.author}
          description={this.state.description}
          isbn={this.state.isbn}
          key={this.state.id}
          prodYear={this.state.prodYear}
          cover={this.state.cover}
          />)
  }

  render() {
    return(<div>
      <Header/>
      <SideBar />
      {this.renderOneBook()}
      <DashboardFooter/>
    </div>)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getSpecificBook,
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser,
    OneBook: state.book.OneBook
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);

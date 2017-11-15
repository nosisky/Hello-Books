import React, { Component } from 'react';
import swal from 'sweetalert';
import { returnBook } from '../../actions/BookActions';

export default class RentedBooks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this
      .handleClick
      .bind(this);
  }

  handleClick() {
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to return the book?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willReturn) => {
      if (willReturn) {
        returnBook(this.props.userId, {bookId: this.props.id}).then((res) => {
          if (res) {
            {
              swal(res.message, {icon: 'success'});
              window.location.href = '/rented-books';
            }
          } else {
            swal(res, {icon: 'warning'});
          }
        }).catch(error => error);
      }
    });
  }
  render() {
    return (
      <div className="book col s12 m3 l3">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.cover}/>
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.props.title}</span>
            <span>{this.props.description}</span>
            <p>
              {!this.props.isReturned && <a href="#" onClick={this.handleClick} className="btn">Return</a>}
              {this.props.isReturned && <a href="#" onClick={this.handleClick} className="btn disabled">Returned</a>}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

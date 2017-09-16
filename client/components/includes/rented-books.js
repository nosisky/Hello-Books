import React, { Component } from 'react';
import swal from 'sweetalert';
import { returnBook } from '../../actions/book_actions';

export default class RentedBooks extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick() {
    swal({
      title: 'Are you sure?',
      text: 'Do you really want to return the book?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willReturn) => {
        if (willReturn) {
          returnBook(this.props.userId, { bookId: this.props.id })
            .then((res) => {
              if (res) {
                {
                  swal(res.message, {
                    icon: 'success',
                  });
                  window.location.href = '/rented-books';
                }
              } else {
                swal(res, {
                  icon: 'warning',
                });
              }
            })
            .catch(error => error);
        }
      });
  }
  render() {
    return (
      <div className="book col s12 m3 l3">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" height="150px" src="https://dannybrown.me/wp-content/uploads/2011/09/book-cover-181x300.png" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.props.title}</span>
            <span>{this.props.description}</span>
            <p><a href="#" onClick={this.handleClick} className="btn">Return</a></p>
          </div>
        </div>
      </div>

    );
  }
}

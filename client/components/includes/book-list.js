import React, { Component } from 'react';
import swal from 'sweetalert';
import { rentBook } from '../../actions/book_actions';

export default class AllBooks extends Component {
      constructor(props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
            const cur = new Date(),
                  after30days = cur.setDate(cur.getDate() + 30),
                  getDateNow = cur.getDate() + '/' + (cur.getMonth() + 1) + '/' + cur.getFullYear();

            swal({
                  title: "Are you sure?",
                  text: `You will be mandated to return this book on or before ${new Date(getDateNow)}`,
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
            })
                  .then((willBorrow) => {
                        if (willBorrow) {
                              rentBook(this.props.userId, { bookId: this.props.id })
                                    .then((res) => {
                                                swal(res, {
                                                      icon: "success",
                                                });
                                    })
                        .then((res) =>  {
                              if(res){
                              window.location.href = '/dashboard'
                              }
                        })
                             
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
                                    <p><a href="#" onClick={this.handleClick} className="btn">Borrow Now</a></p>
                              </div>
                        </div>
                  </div>

            )
      }
}

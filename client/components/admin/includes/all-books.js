import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import { deleteBook, modifyBook } from '../../../actions/book_actions';

export default class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      isbn: this.props.isbn,
      author: this.props.author,
      prodYear: this.prodYear,
      total: this.props.total,
      cover: 'hello.jpg'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClick() {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deleteBook(this.props.id)
            .then((res) => {
              swal(res, {
                icon: "success",
              });
            })
          window.location.href = '/admin';
        } else {
          swal("Book was not deleted");
        }
      });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    modifyBook(this.state, this.props.id)
      .then((res) => {
        Materialize.toast(res, 2000, 'blue',
          () => {
            window.location.href = "/admin";
          });
      })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const style = {
      file: { backgroundColor: '#rgb(10, 89, 79)' },
      edit: {
        backgroundColor: 'rgb(10, 89, 79)',
        color: '#fff', float: 'right'
      },
      delete: { float: 'left', height: 28, color: '#fff', backgroundColor: 'red' },
      editButton: { float: 'right', height: 28, color: '#fff', backgroundColor: 'green' }
    }
    return (
      <div className="col s12 m3 l3">

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4 style={{ alignContent: 'center' }}>Edit Book</h4>
            <div className="row">
              <form name="edit_book" className="col s12"
                onSubmit={this.handleFormSubmit}>
                <div className="add-book">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        defaultValue={this.props.title}
                        className="validate"
                        required />
                      <label htmlFor="isbn">Title</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="author"
                        type="text"
                        name="author"
                        className="validate"
                        onChange={this.onChange}
                        defaultValue={this.props.author}
                        required />
                      <label htmlFor="isbn">Author</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="total"
                        name="total"
                        type="number"
                        className="validate"
                        onChange={this.onChange}
                        required />
                      <label htmlFor="isbn">Total</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="prodYear"
                        name="prodYear"
                        type="number"
                        defaultValue={this.props.prodYear}
                        onChange={this.onChange}
                        className="validate"
                        required />
                      <label htmlFor="prodYear">Production Year</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="isbn"
                        name="isbn"
                        type="text"
                        onChange={this.onChange}
                        defaultValue={this.props.isbn}
                        className="validate"
                        required />
                      <label htmlFor="isbn">ISBN</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
                        onChange={this.onChange}
                        defaultValue={this.props.description}
                      ></textarea>
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>
                  <div className="file-field input-field">
                    <div style={style.file} className="btn">
                      <span>Upload Cover</span>
                      <input type="file" name="cover" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                </div>
                <button style={style.edit}
                  className="btn waves-effect waves-light"
                  type="submit" name="submit">Edit Book
                        </button>
              </form>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src="http://www.bookcovercafe.com/wp-content/uploads/book-cover-cafe-self-publish-the-smart-way-8.png" />
            <span className="card-title">{this.props.title}</span>
          </div>
          <div className="card-content">
            <p>{this.props.description}</p>
          </div>
          <div className="card-action">
            <button onClick={this.handleClick}
              className='btn' style={style.delete}>Delete</button>
            <button data-target="modal1" className="btn modal-trigger" style={style.editButton}>Edit</button>
          </div>
        </div>
      </div>
    )
  }
}

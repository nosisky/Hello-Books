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
      prodYear: this.props.prodYear,
      total: this.props.total,
      cover: 'hello.jpg',
      currentBook : {},
      edit: false,
      displayBook: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
  onClick(){
    this.setState({
      displayBook: false,
      edit: true
    })
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
      <div className="col s12 m3 l3" style={{backgroundColor: '#fff'}}>
        { this.state.edit &&
          <div className="modal-content">
            <h4 style={{ alignContent: 'center' }}>Edit Book</h4>
            <div className="row">
              <form name="edit_book" className="col s12"
                onSubmit={this.handleFormSubmit}>
                <div className="add-book">
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Title</b>
                      <input
                        id="title"
                        type="text"
                        name="title"
                        onChange={this.onChange}
                        defaultValue={this.state.title}
                        className="validate"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Author</b>
                      <input
                        id="author"
                        type="text"
                        name="author"
                        className="validate"
                        onChange={this.onChange}
                        defaultValue={this.state.author}
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <b>Total</b>
                      <input
                        id="total"
                        name="total"
                        type="number"
                        className="validate"
                        onChange={this.onChange}
                        defaultValue={this.state.total}
                        required />
                    </div>
                    <div className="input-field col s6">
                      <b>Prod. Year</b>
                      <input
                        id="prodYear"
                        name="prodYear"
                        type="number"
                        defaultValue={this.state.prodYear}
                        onChange={this.onChange}
                        className="validate"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <b>ISBN</b>
                      <input
                        id="isbn"
                        name="isbn"
                        type="text"
                        onChange={this.onChange}
                        defaultValue={this.state.isbn}
                        className="validate"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Description</b>
                      <textarea
                        id="description"
                        className="materialize-textarea"
                        name="description"
                        onChange={this.onChange}
                        defaultValue={this.state.description}
                      ></textarea>
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
        }
       { this.state.displayBook &&
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
            <button onClick={this.onClick}  className="btn" style={style.editButton}>Edit</button>
          </div>
        </div>
       }
      </div>
    )
  }
}

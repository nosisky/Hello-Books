import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { addCategoryAction } from '../../../actions/BookActions';

class AdminSideBar extends Component {
  constructor(props){
    super(props);
      this.state = {
      name: '',
      description: ''
    }
    this.handleFormSubmit = this
      .handleFormSubmit
      .bind(this);

    this.onChange = this
      .onChange
      .bind(this);

  }
  componentDidMount(){
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
    );
    $('.modal').modal();
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.actions.addCategoryAction(this.state)
    .then((message) => {
      Materialize.toast(message, 2000, 'blue');
      $('.modal').modal('close');
    }).catch((err) => err)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const style = {
      account: {
        float: 'right',
        color: '#fff',
        padding: 5
      },
      adminText: {
        color: '#fff'
      },
      main: {
        float: 'right',
        marginLeft: 5,
        backgroundColor: 'rgb(37, 76, 71)'
      },
      row: {
        backgroundColor: '#2891dc'
      },
      img: {
        borderRadius: 50,
        border: '2px solid black'
      },
      side: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#2891dc',
        marginTop: -16
      },
      menuIcon: {
        color: '#fff',
        fontSize: 40
      },
      button: {
        backgroundColor: 'rgb(37, 76, 71)',
        color: '#fff',
        float: 'right'
      }
    }
    return (
      <div>
           <div className="col s2 m3 l3">
              <ul id="slide-out" className="side-nav fixed show-on-large-only">
                <div style={style.side}>
                  <div className="row" style={style.row}>
                    <span className="card-title">
                      <h4>
                        <i className="material-icons">library_books</i>
                        <Link to="/admin" style={style.adminText}>Admin</Link>
                      </h4>
                    </span>
                    <li className="divider"></li>
                    <p></p>
                    <img
                      style={style.img}
                      width="100px"
                      height="100px"
                      src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
                      alt="HelloBooks"/><br/>
                    <i className="material-icons">account_circle</i>
                    <b>{this.props.fullname}</b>
                  </div><br/>
                </div>
                <li className="divider"></li>
                <li id="menu-list">
                  <Link to="/add-book">Add a book
                    <i className="material-icons">add</i>
                  </Link>
                </li>
                <li id="menu-list">
                  <a data-target="add_cat" className="modal-trigger" href="#add_cat">Add Category<i className="material-icons">add</i>
                  </a>
                </li>
                <li id="menu-list">
                  <Link to="/admin">Edit Books<i className="material-icons">edit</i>
                  </Link>
                </li>
                <li id="menu-list">
                  <Link to="/admin">Delete Books<i className="material-icons">delete</i>
                  </Link>
                </li>
                <li id="menu-list">
                  <Link to="/dashboard">User Dashboard<i className="material-icons">person</i>
                  </Link>
                </li>
              </ul>
              <div id="add_cat" className="modal">
                <div className="modal-content">
                  <h4 style={{
                    alignContent: 'center'
                  }}>Add Category</h4>
                  <div className="row">
                    <form name="edit_book" className="col s12" onSubmit={this.handleFormSubmit}>
                      <div className="add-book">
                        <div className="row">
                          <div className="input-field col s12">
                            <input
                              id="name"
                              type="text"
                              name="name"
                              onChange={this.onChange}
                              className="validate"
                              required/>
                            <label htmlFor="isbn">Name</label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="input-field col s12">
                            <textarea
                              id="description"
                              className="materialize-textarea"
                              name="description"
                              onChange={this.onChange}></textarea>
                            <label htmlFor="description">Description</label>
                          </div>
                        </div>
                      </div>
                      <button
                        style={style.button}
                        className="btn waves-effect waves-light"
                        type="submit"
                        name="submit">
                        Add Category
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCategoryAction,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(AdminSideBar);

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddNewBook from '../admin/pages/AddANewBook';
import { logoutAction, editProfileAction } from '../../actions/AuthActions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this
      .logout
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

  logout(event) {

    event.preventDefault();

    this
      .props
      .actions
      .logout();

    this
      .context
      .router
      .push('/');

  }
  onClick() {
    window
      .location
      .reload()
  }

  render() {
    const style = {
      button: {
        backgroundColor: 'rgb(37, 76, 71)',
        color: '#fff',
        float: 'right'
      }
    }

    return (
        <div id="menu">
          <nav>
            <div className="nav-wrapper"> <div className="left" style={{fontSize: 'x-large'}}>HelloBooks</div>           
              <a
                href="#"
                data-activates="slide-out"
                className="button-collapse hide-on-large-only right">
                <i
                  style={{
                  color: '#fff',
                  fontSize: 40
                }}
                  className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li>
                  <a data-target="search_book" className="modal-trigger" href="#search_book">
                    <i className="material-icons">search</i>
                  </a>
                </li>
                <li>
                  <a onClick={this.onClick} href="#!">
                    <i className="material-icons">refresh</i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-button" data-activates="dropdown2">
                    <i className="material-icons">more_vert</i>
                  </a>
                </li>
              </ul>
              <ul id="dropdown2" className="dropdown-content">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a onClick={this.props.actions.logoutAction} href="#!">Logout</a>
                </li>
              </ul>
            </div>

          </nav>
          {/* Search Modal */}
          <div id="search_book" className="modal">
            <div className="modal-content">
              <h4 style={{
                alignContent: 'center'
              }}>Search for a book</h4>
              <div className="row">
                <form
                  name="search_book"
                  action='/search'
                  className="col s12"
                  onSubmit={this.handleFormSubmit}>
                  <div className="add-book">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="name"
                          type="text"
                          name="text"
                          onChange={this.onChange}
                          className="validate"
                          required/>
                        <label htmlFor="isbn">What do you want?</label>
                      </div>
                    </div>
                  </div>
                  <button
                    style={style.button}
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="submit">Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

Header.PropTypes = {
  fullName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { user: state.auth.user.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logoutAction,
      editProfileAction
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

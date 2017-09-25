import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCategory } from '../../../actions/book_actions';
import { logout } from '../../../actions/auth_actions';


class HeaderSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    }
    this.onChange = this.onChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    addCategory(this.state)
      .then((message) => {
        Materialize.toast(message, 2000, 'blue');
        window.location.href = '/admin';
      })
      .catch((err) => err)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    const style = {
      account: { float: 'right', color: '#fff', padding: 5 },
      main: { float: 'right', marginLeft: 5, backgroundColor: 'rgb(37, 76, 71)' },
      row: {backgroundColor: '#15b39d'},
      img: { borderRadius: 50, border: '2px solid black' },
      side: { textAlign: 'center', color: '#fff', backgroundColor: '#15b39d', marginTop: -16 },
      menuIcon: { color: '#fff', fontSize: 40 },
      button: {
        backgroundColor: 'rgb(37, 76, 71)',
        color: '#fff', float: 'right'
      }
    }
    return (<div className="admin-header-side" id="container">
      <ul id='dropdown1' className='dropdown-content'>
        <li><a href="#!"> {this.props.user.username}</a></li>
        <li className="divider"></li>
        <li><a onClick={this.props.actions.logout} href="#"><i className="material-icons">exit_to_app</i> Logout</a></li>
      </ul>
      <div id="menu">
        <div style={style.account}>
          <a style={style.main}
            className='dropdown-button btn' href='#' data-activates='dropdown1'>Account</a>
        </div>
        <div className="col s3">
          <ul id="slide-out" className="side-nav fixed show-on-large-only">
            <div style={style.side}>
              <div className="row" style={style.row}>
                <span className="card-title"><h4><i className="material-icons">library_books</i> <a href="admin">Admin</a></h4></span>
                <li className="divider"></li>
                <p></p>
                <img style={style.img}
                  width="100px"
                  height="100px"
                  src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
                  alt="HelloBooks" /><br />
                <i className="material-icons">account_circle</i> <b>{this.props.user.fullname}</b>
              </div><br />
            </div>
            <li className="divider"></li>
            <li id="menu-list"><Link to="/add-book">Add a book <i className="material-icons">chevron_right</i></Link></li>
            <li id="menu-list"><a data-target="add_cat" className="modal-trigger" href="#add_cat">Add Category<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="/admin">Edit Books<i className="material-icons">chevron_right</i></a></li>
            <li id="menu-list"><a href="/admin">Delete Books<i className="material-icons">chevron_right</i></a></li>
          </ul>

          <div id="add_cat" className="modal">
            <div className="modal-content">
              <h4 style={{ alignContent: 'center' }}>Add Category</h4>
              <div className="row">
                <form name="edit_book" className="col s12"
                  onSubmit={this.handleFormSubmit}>
                  <div className="add-book">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          onChange={this.onChange}
                          className="validate"
                          required />
                        <label htmlFor="isbn">Name</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          id="description"
                          className="materialize-textarea"
                          name="description"
                          onChange={this.onChange}
                        ></textarea>
                        <label htmlFor="description">Description</label>
                      </div>
                    </div>
                  </div>
                  <button style={style.button}
                    className="btn waves-effect waves-light"
                    type="submit" name="submit"> Add Category
                        </button>
                </form>
              </div>
            </div>
          </div>
        </div></div>
      <div id="content">
        <a href="#" data-activates="slide-out" className="button-collapse hide-on-large-only"><i style={style.menuIcon} className="material-icons">menu</i></a>

      </div>
    </div>)
  }
}

HeaderSideBar.PropTypes = {
  fullName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators({
          logout
      }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
      user: state.auth.user.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderSideBar);

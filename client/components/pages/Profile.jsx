import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Header from '../includes/Header';
import SideBar from '../includes/SideBar';
import { bindActionCreators } from 'redux';
import { editProfileAction } from '../../actions/AuthActions';
import DashboardFooter from '../includes/DashboardFooter';

export class Profile extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      fullName: this.props.user.fullName,
      email: this.props.user.email,
      edit: false,
      profile: true
    }

    this.onChange = this
      .onChange
      .bind( this );
    this.handleSubmit = this
      .handleSubmit
      .bind( this );
    this.displayEdit = this
      .displayEdit
      .bind( this );
  }

  onChange( e ) {
    const name = e.target.name,
      value = e.target.value;
    this.setState( { [name]: value } )
  }

  displayEdit( e ) {
    this.setState( { edit: true, profile: false } )
  }

  handleSubmit( event ) {
    event.preventDefault();
    editProfileAction( this.props.user.userId, this.state )
    .then(( response ) => {
      localStorage.setItem( 'token', response )
      Materialize.toast( 'Profile edited Successfully', 
      2000, 'blue darken-4', () => {
        window.location.href = '/profile';
      } );
    } )
  }

  render() {
    const { username, fullName, id, email, plan } = this.props.user;
    return (
      <div className="row">
        <Header />
        <SideBar fullname={ fullName }
          isAdmin={ this.props.user.isAdmin } />
        <div id="edit">
          <div id="profile_edit"
            style={ {
              backgroundColor: '#fff',
            } }
            className="row modal">
            <h4
              style={ {
                alignContent: 'center',
                marginLeft: '20px'
              } }>Edit Profile</h4>
            <div className="modal-content">
              <form name="edit_profile" onSubmit={ this.handleSubmit }>
                <div className="edit-profile">
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Username</b>
                      <input
                        id="email"
                        type="text"
                        name="email"
                        className="validate"
                        defaultValue={ username }
                        disabled />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Full Name</b>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        onChange={ this.onChange }
                        defaultValue={ fullName }
                        className="validate"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <b>Email Address</b>
                      <input
                        id="email"
                        type="text"
                        name="email"
                        className="validate"
                        defaultValue={ email }
                        onChange={ this.onChange }
                        required />
                    </div>
                  </div>

                </div>
                <button
                  style={ {
                    backgroundColor: 'rgb(21, 179, 157)',
                    color: '#fff',
                    float: 'right'
                  } }
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="submit">Submit
              </button>
              </form>
            </div>
          </div>
        </div>
        { this.state.profile && <div className="row">
          <div className="col s12 l9 push-l3">
            <div className="user-profile">
              <img
                className="avatar"
                src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png"
                alt="Ash" />
              <div className="username">{ fullName }</div>
              <div className="bio">
                Library User
              </div>
              <div className="row">
                <div className="col s12 m3 l12">
                  <div className="description">
                    <div className="horizontal">

                      <div className="card-stacked">
                        <div className="card-content">
                          <p>
                            <b>Full name: &nbsp;
                            </b> &nbsp;
                            { fullName }</p>
                          <div className="divider"></div>
                          <p>
                            <b>Username: &nbsp;
                            </b>
                            { username }
                          </p>
                          <div className="divider"></div>
                          <p>
                            <b>Email: &nbsp;
                            </b>
                            { email }
                          </p>
                          <div className="divider"></div>
                          <p>
                            <b>Last seen: &nbsp;
                            </b>
                            Now
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="data">
                <li className="right-align">
                  <a className="btn modal-trigger" 
                  ref="#profile_edit">Edit Profile</a>
                </li>
                <li className="right-align">
                  <Link className="waves-effect waves-light btn" 
                  to="/rented-books">Rented Books</Link>
                </li>

              </ul>
            </div>
          </div>

        </div> }
        <DashboardFooter />
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    actions: bindActionCreators( {
      editProfileAction
    }, dispatch )
  };
}

function mapStateToProps( state ) {
  return { user: state.auth.user.currentUser }
}

export default connect( mapStateToProps, mapDispatchToProps )( Profile )

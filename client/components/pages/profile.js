import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderSideBar from '../includes/header-side-bar';
import { bindActionCreators } from 'redux';
import { editProfile } from '../../actions/auth_actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const name = e.target.name,
      value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  onSubmit() {
    e.preventDefault();
    this.props.editProfile(this.props.user.id, this.state)
      .then((res) => {
        Materialize.toast('Profile edited Successfully', 2000, 'blue',
          () => {
            window.location.href = "/profile";
          });
      })
  }


  render() {
    const { username, fullname, id, email, plan } = this.props.user;

    return (<div>
      <HeaderSideBar />

      <div id="edit" className="modal">
        <div className="modal-content">
          <h4 style={{ alignContent: 'center' }}>Edit Profile</h4>
          <div className="row">
            <form className="col s12"
              onSubmit={this.onSubmit}>
              <div className="edit-profile">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="email"
                      type="text"
                      name="email"
                      className="validate"
                      defaultValue={username}
                      disabled />
                    <label htmlFor="isbn">Username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      onChange={this.onChange}
                      defaultValue={fullname}
                      className="validate"
                      required />
                    <label htmlFor="isbn">Full Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="email"
                      type="text"
                      name="email"
                      className="validate"
                      defaultValue={email}
                      onChange={this.onChange}
                      required />
                    <label htmlFor="isbn">Email</label>
                  </div>
                </div>

              </div>
              <button style={{
                backgroundColor: 'rgb(21, 179, 157)',
                color: '#fff', float: 'right'
              }}
                className="btn waves-effect waves-light"
                type="submit" name="submit">Submit
                        </button>
            </form>
          </div>
        </div>
      </div>
      <div className="profile-cover">
        <div className="col s12 m7">
          <div className="card horizontal">
            <div className="card-image">
              <div className="profile">
                <div className="profile-header">
                  <img className="circular-img" src="https://images.vexels.com/media/users/3/130527/isolated/preview/845f79841ea58765d623a68bf434d5ed-girl-cartoon-head-character-by-vexels.png" />
                </div>
                <div className="profile-content">
                  <h3>{fullname}</h3>
                  <div className="divider"></div>
                  <p></p>
                  <h4>I am a patron at Hello Books, i will always recommend this library wherever i go.</h4>
                </div>
                <div className="profile-footer">
                  <ul>
                    <li>
                      <button data-target="edit" className="btn modal-trigger">Edit Profile</button>
                    </li>
                    <li>
                      <a className="waves-effect waves-light btn" href="/rented-books">Rented Books</a>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <ul className="collection with-header">
                  <li className="collection-header"><h4>My Profile</h4></li>
                  <li className="collection-item">Full Name: <span className="tag-name">{fullname}</span></li>
                  <li className="collection-item">Username: <span className="tag-name">{username}</span></li>
                  <li className="collection-item">Plan: <span className="tag-name">{plan}</span></li>
                  <li className="collection-item">Email: <span className="tag-name">{email}</span></li>
                  <li className="collection-item">Last seen: <span className="tag-name"> Currently Online</span> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editProfile
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile)

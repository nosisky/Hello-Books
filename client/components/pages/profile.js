import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderSideBar from '../includes/header-side-bar';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/auth_actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {

    event.preventDefault();

    this.props.actions.logout();

    this.context.router.push('/');

  }
  render() {
    const { username, fullname, id, email, plan} = this.props.user;

    return (<div>
      <HeaderSideBar onClick={this.logout} fullName={fullname} username={username} />
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
                      <a className="waves-effect waves-light btn" href="#">Edit Profile</a>
                    </li>
                    <li>
                      <a className="waves-effect waves-light btn" href="#">Rented Books</a>
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

function mapStateToProps(state) {
  return {
    user: state.auth.user.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

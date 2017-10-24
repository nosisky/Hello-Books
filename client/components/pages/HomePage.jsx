import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import AuthForm from '../auth/AuthForm';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    if (localStorage.getItem('token')) {
      window.location.href = '/dashboard'
    }
    return (
      <div>
        <NavBar/>
        <AuthForm message={this.props.message}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps)(HomePage);

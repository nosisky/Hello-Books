import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import AuthForm from '../auth/AuthForm';
import { connect } from 'react-redux';

export class HomePage extends Component {
  render() {
    if (localStorage.getItem('token')) {
      window.location.href ='/dashboard';      
    }
    return (
      <div>
        <NavBar/>
        <AuthForm />
      </div>
    );
  }
}
export default HomePage;

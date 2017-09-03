import React, { Component } from 'react';
import NavBar from '../includes/navbar';
import AuthForm from '../auth/auth-forms';

export default class HomePage extends Component {  
  render() {
    return (
       <div>
       <NavBar />
       <AuthForm />
       </div>
    );
  }
}
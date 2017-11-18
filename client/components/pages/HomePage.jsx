import React, { Component } from 'react';
import NavBar from '../includes/NavBar';
import AuthForm from '../auth/AuthForm';
import { connect } from 'react-redux';
import  Footer from '../includes/Footer';

export class HomePage extends Component {
  render() {
    if (localStorage.getItem('token')) {
      window.location.href ='/dashboard';      
    }

    return (
      <div>
        <NavBar/>
        <div className="row">
          <div className="col l6">
          <div className="hide-on-med-and-down">
              <img
                style={{
                marginTop: 80,
                width: '80%'
              }}
                src="https://img.clipartxtras.com/8765872902566a841f9df582bc9f23d9_library-media-center-welcome-to-the-sipsey-valley-high-school-students-in-library-clipart_648-490.gif"/>
            </div>
          </div>
          <div className="col l6 m12 s12">
          <AuthForm />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default HomePage;

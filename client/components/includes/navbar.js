import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class NavBar extends Component {
  render() {
    return (<nav className="navbar-fixed blue darken-4 main-navigation" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="#" className="brand-logo  white-text">
          <i className="large material-icons">library_books</i>HelloBooks</a>
          <ul className="right hide-on-med-and-down main-navigation">
            <li><a href="#">About</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">How To</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
          <ul id="nav-mobile" className="side-nav grey darken-4 white-text">
            <li><a href="#">About</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">How To</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
          <a href="#" data-activates="nav-mobile" className="button-collapse text-darken-4 grey-text"><i className="material-icons white-text">menu</i></a>
        </div>
      </nav>
    );
  }
}

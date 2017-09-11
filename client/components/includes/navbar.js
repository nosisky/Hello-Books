import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class NavBar extends Component {
  render() {
    return (<nav className="navbar-fixed nav-bar main-navigation" role="navigation">
        <div className="">
          <a id="logo-container" href="#!" className="brand-logo  white-text" style={{marginLeft: 5}}>
          <i style={{fontSize: 40, marginRight: '-1px'}}  className="material-icons">library_books</i>HelloBooks</a>
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

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <div className="navbar-wrapper container">
          <a href="/" className="brand-logo left">
          <img src="/img/emblem_library.png" width="40px" height="40px"/>
            HelloBooks</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse right">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="http://github.com/nosisky/Hello-Books">About</a>
            </li>
            <li>
              <a href="http://github.com/nosisky/Hello-Books">View on Github</a>
            </li>
          </ul>
        </div>
        <ul className="side-nav" id="mobile-demo">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </ul>
      </nav>
    );
  }
}

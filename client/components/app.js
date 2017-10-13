import React, { Component } from 'react';
import { Main } from '../routes/index';
import { BrowserRouter as Router } from 'react-router-dom';

export default class App extends Component {  
  render() {
    return (
        <Router>
          <Main />
        </Router>
    );
  }
}

import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';   
import { BrowserRouter, browserHistory } from 'react-router-dom';  
import reduxThunk from 'redux-thunk'; 
import jwt from 'jsonwebtoken';
import App from './components/app';
import reducers from './reducers/index'; 
import { AUTH_USER } from './actions/types';
import configureStore from './store/index';
import {setAuthorizationToken} from '../client/utils/Authorization';
import {SET_CURRENT_USER} from './actions/types';
// import './public/css/materialize.min.css';

import './public/css/style.scss';



const store = configureStore();

 if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch({
    type: SET_CURRENT_USER,
    user: jwt.decode(localStorage.token)
  });
}

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('app'));
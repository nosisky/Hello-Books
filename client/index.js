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
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

import './public/css/style.scss';

import firebase from 'firebase';



const store = configureStore();

var config = {
  apiKey: "AIzaSyCardPvysEdno2q98iCQgNA7or2Nv-C0_Y",
  authDomain: "hellobooks-178515.firebaseapp.com",
  databaseURL: "https://hellobooks-178515.firebaseio.com",
  projectId: "hellobooks-178515",
  storageBucket: "gs://hellobooks-178515.appspot.com/",
  messagingSenderId: "81242968730"
};
firebase.initializeApp(config);

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
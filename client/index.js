import React from 'react';  
import ReactDOM from 'react-dom';  
import { Provider } from 'react-redux';  
import { createStore, applyMiddleware } from 'redux';  
import { BrowserRouter, browserHistory } from 'react-router-dom';  
import reduxThunk from 'redux-thunk'; 
import App from './components/app';
import reducers from './reducers/index'; 
import { AUTH_USER } from './actions/types';
import configureStore from './store/index';

// import './public/css/materialize.min.css'
import './public/css/style.scss';



const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('app'));
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import loadJS from 'load-js';
import App from './components/App';
import reducers from './reducers/rootReducer';
import { AUTH_USER, SET_CURRENT_USER } from './actions/ActionTypes';
import { logoutAction, setCurrentUser } from './actions/UserActions';
import configureStore from './store/configureStore';
import { setAuthorizationToken } from '../client/utils/authorization';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

import './public/css/style.scss';
import firebase from 'firebase';
import firebaseConfig from './utils/firebaseConfig';

const store = configureStore();


//Initalize firebase
firebase.initializeApp(firebaseConfig);

const token = localStorage.getItem('token');
const { secretKey } = process.env;

if (token) {
	jwt.verify(token, secretKey, (error) => {
		if (error) {
			localStorage.removeItem('token')
			window.location = '/'
		}
	})
	setAuthorizationToken(token);
	store.dispatch(setCurrentUser(jwt.decode(token).currentUser));
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);

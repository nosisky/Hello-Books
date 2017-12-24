import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import loadJS from 'load-js';
import App from './components/app';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';
import { logoutAction } from './actions/AuthActions';
import configureStore from './store/index';
import { setAuthorizationToken } from '../client/utils/Authorization';
import { SET_CURRENT_USER } from './actions/types';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';

import './public/css/style.scss';
import firebase from 'firebase';
import firebaseConfig from './utils/FirebaseConfig';

const store = configureStore();

//Initalize firebase
firebase.initializeApp(firebaseConfig);

const token = localStorage.token;
const key = process.env.secretKey;

if (token) {
	jwt.verify(token, key, (error) => {
		if (error) {
			logoutAction();
			this.props.history.push('/');
		}
	})
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
	document.getElementById('app')
);

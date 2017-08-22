import React, { Component  } from 'react';
import ReactDOM from 'react-dom';
import Login from '../auth/login';
import Register from '../auth/register';
import { registerUser } from '../../actions/auth_reducer';

export default class AuthForm extends Component {
    render(){
        return(
            <div className="container-auth white z-depth-2">
    <ul className="tabs teal">
        <li className="tab col s3"><a className="white-text active" href="#login">login</a></li>
        <li className="tab col s3"><a className="white-text reg" href="#register">register</a></li>
    </ul>
    <Login/>
    <Register onSubmit={registerUser} />
</div>
        )
    }
} 
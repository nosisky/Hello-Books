import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';
import { registerUserAction, loginAction } from '../../actions/AuthActions';
import { checkUserExist, checkEmailExist, reMap } from '../../utils/Validation';

class AuthForm extends Component {
    render() {
        const {registerUserAction, loginAction} = this.props;
        return (
            <div className="container main-auth white z-depth-2">
                <div
                    style={{
                    color: 'red',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    {this.props.message}
                </div>
                <ul className="tabs teal">
                    <li className="tab col s3">
                        <a className="white-text active" href="#login">login</a>
                    </li>
                    <li className="tab col s3">
                        <a className="white-text reg" href="#register">register</a>
                    </li>
                </ul>
                <Login onSubmit={loginAction}/>
                <Register
                    UserExist={checkUserExist}
                    EmailExist={checkEmailExist}
                    onSubmit={registerUserAction}/>
            </div>
        )
    }
}

export default connect(null, {registerUserAction, loginAction})(AuthForm);

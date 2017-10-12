import React, { Component  } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Login from '../auth/login';
import Register from '../auth/register';
import { registerUser, login } from '../../actions/auth_actions';
import { checkUserExist, checkEmailExist, reMap } from '../../utils/Authorization';

class AuthForm extends Component {
    render(){
        const { registerUser, login } = this.props;
        return(
            <div className="container main-auth white z-depth-2">
            <div style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}> {this.props.message} </div>
    <ul className="tabs teal">
        <li className="tab col s3"><a className="white-text active" href="#login">login</a></li>
        <li className="tab col s3"><a className="white-text reg" href="#register">register</a></li>
    </ul>
    <Login onSubmit={login}/>
    <Register UserExist={checkUserExist} EmailExist={checkEmailExist} onSubmit={registerUser} />
</div>
        )
    }
}

export default connect(null, { registerUser, login })(AuthForm);
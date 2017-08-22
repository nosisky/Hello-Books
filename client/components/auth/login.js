import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Login extends Component{
    render(){
        return(
            <div id="login" className="col s12">
        <form className="col s12">
            <div className="form-container">
                <div className="row">
                    <div className="input-field col s12">
                        <input id="username" type="text" />
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <br />
                <center>
                    <button className="btn waves-effect waves-light teal" type="submit" name="action">Login</button>
                    <br />
                    <br />
                    <a href="">Forgotten password?</a>
                </center>
            </div>
        </form>
    </div>
        )
    }
}
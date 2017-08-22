import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            username: "",
            password: "",
            email: ""
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(event){
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }
     handleSubmit(formData) {
         formData.preventDefault();
            this.props.onSubmit(this.state);
}

    render(){
        return(
            <div id="register" className="col s12">
        <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="form-container">
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "fullName" 
                        type="text" 
                        value = {this.state.fullName}
                        onChange={ this.onChange }  
                        className="validate" />
                        <label htmlFor="fullName">Full Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "username" 
                        type="text" 
                        value={this.state.username}
                        onChange={ this.onChange }  
                        className="validate" />
                        <label htmlFor="username">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "email"
                         type="email" 
                         onChange={ this.onChange } 
                         value = {this.state.email}
                         className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "password" 
                        type="password" 
                        onChange={ this.onChange } 
                        value={this.state.password}
                        className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "password-confirm" 
                        onChange={ this.onChange } 
                        type="password" className="validate" />
                        <label htmlFor="password-confirm">Password Confirmation</label>
                    </div>
                </div>
                <center>
                    <button className="btn waves-effect waves-light teal" type="submit" name="action">Submit</button>
                </center>
            </div>

        </form>
    </div>
        )
    }
}


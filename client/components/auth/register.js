import React, { Component } from 'react';
import ReactDom from 'react-dom';
import userExist from '../../actions/auth_reducer';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: "",
            username: "",
            password: "",
            email: "",
            error: {}
        }
        this.onChange = this.onChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(event){
        this.setState({ 
            [event.target.name]: event.target.value
         })
    }
     handleSubmit(formData) {
         formData.preventDefault();
            this.props.onSubmit(this.state)
}
    onBlur(e){
        const name = e.target.name,
        value = e.target.value,
        passwordField = document.getElementById('password').value;
        switch(name){
            case "fullName":
            if(value.length < 5 || !value){
                this.setState({ error: {fullName: "Full name should be a minimum of 5 length"} });
              return false;
            } else {
                this.setState({ error: { }});
              return true;
            }
            case "password":
            if(value.length < 8 || !value){
                this.setState({ error: { password: "Password must be a minimum of 8 characters"} });
                return false;
            } else {
                this.setState({ error: { }});
              return true;
            }
            case "password-confirm":
            if(value !== passwordField){
                this.setState({ error: { passwordConfirm: "Confirm password must be equal to password"} });
                return false;
            } else {
                this.setState({ error: { }});
              return true;
            }
            case "username":
            console.log(value)
            if (!userExist(value)){
                this.setState({ error: {userExist: "Username already exist"} })
            }
            if(value.length < 5 || !value){
                this.setState({ error: {username: "Username must be a minimum of 5 characters"} });
                return false;
            } else {
                this.setState({ error: { }});
              return true;
            }
        }
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
                        onBlur={ this.onBlur }  
                        className="validate" />
                        <label htmlFor="fullName">Full Name</label>
                        <div style={ {color: "red"} }>{ this.state.error.fullName } </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "username" 
                        type="text" 
                        value={this.state.username}
                        onBlur={ this.onBlur }  
                        onChange={ this.onChange }  
                        className="validate" />
                        <label htmlFor="username">Username</label>
                        <div style={ {color: "red"} }>{ this.state.error.userExist} </div>
                        <div style={ {color: "red"} }>{ this.state.error.username } </div>
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
                        id="password"
                        onChange={ this.onChange }
                        onBlur={ this.onBlur }  
                        value={this.state.password}
                        className="validate" />
                        <label htmlFor="password">Password</label>
                        <div style={{color: "red"}}>{ this.state.error.password} </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input name = "password-confirm" 
                        onChange={ this.onChange }
                        onBlur={ this.onBlur }
                        type="password" className="validate" />
                        <label htmlFor="password-confirm">Password Confirmation</label>
                        <div style={ {color: "red"} }>{ this.state.error.passwordConfirm } </div>
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


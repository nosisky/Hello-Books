import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from './GoogleLogin';
import { checkEmailExist, reMap } from '../../utils/Validation';
import { registerUserAction, getUserByEmailAction } from '../../actions/AuthActions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginError: '',
      isLoading: ''
    };
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
    this.handleFormSubmit = this
      .handleFormSubmit
      .bind(this);

  }

  onChange(event) {
    const name = event.target.name,
      value = event.target.value;
    this.setState({[name]: value});
  }
  handleFormSubmit(e) {
    e.preventDefault();
    getUserByEmailAction({email: e.target.value}).then((res) => {})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({isLoading: true});
    this
      .props
      .onSubmit(this.state)
      .then((data) => {
        this.setState({isLoading: false})
          Materialize.toast('Logged In Successfully', 2000, 'blue darken-4', () => {
           window.location.href ='/admin';            
        });
      }, (data) => {
        this.setState({loginError: data.response.data.message, isLoading: false});
      })

  }
  render() {
    const style = {
      button: {
        backgroundColor: 'rgb(37, 76, 71)',
        color: '#fff',
        float: 'right'
      }
    }
    return (
      <div id="login" className="col s12">
        <div id="forgot_password" className="modal">
          <div className="modal-content">
            <h4 style={{
              alignContent: 'center'
            }}>Request For a new password</h4>
            <div className="row">
              <form
                name="forgot_pass"
                action='/search'
                className="col s12"
                onSubmit={this.handleFormSubmit}>
                <div className="add-book">
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="name"
                        type="email"
                        name="text"
                        onChange={this.onChange}
                        className="validate"
                        required/>
                      <label htmlFor="isbn">Enter your Email</label>
                    </div>
                  </div>
                </div>
                <button
                  style={style.button}
                  className="btn waves-effect waves-light"
                  type="submit"
                  name="submit">Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="red-text center">{this.state.loginError}</div>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="form-container">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="username"
                  type="text"
                  name="username"
                  onChange={this.onChange}
                  required/>
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  onChange={this.onChange}
                  required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <br/>
            <center>
              <button
                className="btn waves-effect waves-light teal"
                type="submit"
                name="action">Login</button>
              <br/>
              <br/>
              <GoogleLogin emailExist={checkEmailExist}/>
            </center>
          </div>
        </form>
       
      </div>
    )
  }
}

export default connect(null, {registerUserAction})(Login);

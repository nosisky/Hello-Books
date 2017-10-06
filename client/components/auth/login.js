import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from '../auth/google-login';
import { checkEmailExist, reMap } from '../../utils/Authorization';
import { registerUser, getUserByEmail } from '../../actions/auth_actions';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

    }

    onChange(event) {
        const name = event.target.name,
            value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    handleFormSubmit(e){
        e.preventDefault();
        getUserByEmail({ email: e.target.value })
        .then((res) => {
            console.log(res)
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        this.props.onSubmit(this.state)
            .then((data) => {
                this.setState({ isLoading: false })
                Materialize.toast('Logged In Successfully', 2000, 'blue',
                    () => {
                        window.location.href = "/dashboard";
                    });
            },
            (data) => {
                this.setState({ loginError: data.response.data.message, isLoading: false });
            }
            )

    }
    render() {
        const style = {
            button: {
              backgroundColor: 'rgb(37, 76, 71)',
              color: '#fff', float: 'right'
            }
          }
        return (
            <div id="login" className="col s12">
                   <div id="forgot_password" className="modal">
         <div className="modal-content">
           <h4 style={{ alignContent: 'center' }}>Request For a new password</h4>
           <div className="row">
             <form name="forgot_pass" action='/search' className="col s12"
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
                       required />
                     <label htmlFor="isbn">Enter you Email</label>
                   </div>
                 </div>
                 </div>
               <button style={style.button}
                 className="btn waves-effect waves-light"
                 type="submit" name="submit">Search
                     </button>
             </form>
           </div>
         </div>
       </div>
                <div style={{ color: 'red', textAlign: 'center' }}>{this.state.loginError}</div>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="form-container">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="username" type="text"
                                    name="username" onChange={this.onChange} />
                                <label htmlFor="username">Username</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password"
                                    name="password"
                                    className="validate" onChange={this.onChange} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <br />
                        <center>
                            <button className="btn waves-effect waves-light teal" type="submit" name="action" disabled={this.state.isLoading}>Login</button>
                            <br />
                            <br />
                          
                            <a data-target="forgot_password" className="modal-trigger" href="#forgot_password">Forgotten password?</a>
                        </center>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { registerUser })(Login);
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from '../auth/google-login';
import { checkEmailExist, reMap } from '../../utils/Authorization';
import { registerUser } from '../../actions/auth_actions';
import { connect } from 'react-redux';

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

    }

    onChange(event) {
        const name = event.target.name,
            value = event.target.value;
        this.setState({
            [name]: value
        });
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
                console.log(data.response.data.message)
                this.setState({ loginError: data.response.data.message, isLoading: false });
            }
            )

    }
    render() {
        return (
            <div id="login" className="col s12">
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
                            <GoogleLogin emailExist={checkEmailExist} /><br />
                            <a href="">Forgotten password?</a>
                        </center>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { registerUser })(Login);
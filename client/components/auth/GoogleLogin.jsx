import React from 'react';
import GoogleLogin from 'react-google-login';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {getUserData, registerGoogleUser} from '../../utils/Authorization';

dotenv.load()

export default class GoogleLogIn extends React.Component {
  reMap(obj) {
    let mainObj = {
      currentUser: {}
    };
    const username = obj
      .name
      .toLowerCase()
      .replace(/[\s]/, '_') + Math.round(Math.random(1998) * 56);
    mainObj.currentUser.username = username;
    mainObj.currentUser.fullName = obj.name;
    mainObj.currentUser.password = username;
    mainObj.currentUser.email = obj.email;
    return mainObj;
  }
  render() {

    const responseGoogle = (response) => {
      const key = process.env.secretKey;

      if (response) {
        const decoded = jwt.decode(response.Zi.id_token);
        const newUserObj = this.reMap(decoded);
        this
          .props
          .emailExist({email: newUserObj.currentUser.email})
          .then((user) => {
            if (!user) {
              registerGoogleUser(newUserObj.currentUser).then((data) => {
                if (data) {
                  Materialize.toast('Signed Up Successfully', 2000, 'blue darken-4');
                }
              }).catch((err) => err)
            } else {
              getUserData({email: newUserObj.currentUser.email}).then((currentUser) => {
                currentUser.userId = currentUser.id;
                const token = jwt.sign({
                  currentUser
                }, 'Andelahellobooks');
                localStorage.setItem('token', token);
                Materialize.toast('Login Successful', 2000, 'blue', () => {
                  window.location.href = '/dashboard';
                });
              })

            }
          })
      }
    }
    return (<GoogleLogin
      clientId="993480706358-p6qn70ue8qucce00cpbfhsb52a87t451.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}/>)
  }
}

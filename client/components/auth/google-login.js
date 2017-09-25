import React from 'react';
import GoogleLogin from 'react-google-login';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserData, registerGoogleUser } from '../../utils/Authorization';

export default class GoogleLogIn extends React.Component {
  reMap(obj) {
    let mainObj = { currentUser: {} };
    const objKeys = Object.keys(obj);
    const username = obj[objKeys[10]].toLowerCase().replace(/[\s]/, '_')
      + Math.round(Math.random(1998) * 56);
    mainObj.currentUser.username = username;
    mainObj.currentUser.fullName = obj[objKeys[10]];
    mainObj.currentUser.password = username;
    mainObj.currentUser.email = obj[objKeys[3]];
    return mainObj;
  }
  render() {

    const responseGoogle = (response) => {
      if (response) {
        const decoded = jwt.decode(response.Zi.id_token);
        const newUserObj = this.reMap(decoded);

        this.props.emailExist({ email: newUserObj.currentUser.email })
          .then((user) => {
            if (!user) {
              registerGoogleUser(newUserObj.currentUser)
                .then((data) => {
                  if(data){
                    console.log(data)                    
                    Materialize.toast('Signed Up Successfully', 2000, 'blue',
                    () => {
                      window.location.href = "/dashboard";
                    });
                  } else {
                    console.log(data)
                  }
                })
                .catch((err) => console.log(err))
            } else {

              getUserData({ email: newUserObj.currentUser.email })
                .then((currentUser) => {
                  const token = jwt.sign({ currentUser }, 'hellobooksSecret');
                  localStorage.setItem('token', token);
                  Materialize.toast('Login Successful', 2000, 'blue', () => {
                    window.location.href = "/dashboard";
                  });
                })

            }
          })
      }
    }
    return (
      <GoogleLogin
        clientId="993480706358-p6qn70ue8qucce00cpbfhsb52a87t451.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    )
  }
}

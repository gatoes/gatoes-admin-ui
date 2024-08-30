import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {authentication} from '../utilities';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';
//import '../light.css';
class Login extends Component {
  render() {
    if(authentication()){
        return <Redirect to='/dashboard'/>
    }

    return (
      <div style= {{height:"100%"}}>
        <div className="login-page">
          <div className="login-logo">
            <img src="/assets/images/logo_color.png" alt="Gatoes" />
          </div>
          <div className="login-head">
            <h2>Welcome to <span>Merchant Portal</span></h2>
            <p>Please fill the details to continue</p>
          </div>
          <LoginForm />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Login;
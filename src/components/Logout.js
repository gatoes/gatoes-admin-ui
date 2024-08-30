import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {clearSession} from '../utilities';
import {logout} from '../actions/users';

export default class Logout extends Component {
    componentDidMount(){
    	logout().then((response) => {
	        
	    });
    }
    componentWillMount(){
      clearSession();
    }

    render() {
      
      return null;
    }
}
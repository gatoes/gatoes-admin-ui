import React, { Component, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {ROUTES} from './routes';

class ACLRoute extends Component {

  constructor(props, context) {
    super(props, context);
    
    this.renderRoute = this.renderRoute.bind(this);
  }

  renderRoute(acl, permissions){
    if(typeof acl !== 'undefined' && permissions.indexOf(acl) > -1){
      return <Route {...this.props} />
    }    

    return null;
  }

  render() {
    const {acl} = this.props;
    let auth = localStorage.getItem('auth');
    if(auth === null || typeof auth === 'undefined')
      return null;

    auth = JSON.parse(auth);
    
    return (
        auth.user.hasAllAccess
        ?
        <Route {...this.props} />
        :
        this.renderRoute(acl, auth.user.permissions)
    );
  }
}

export default ACLRoute;

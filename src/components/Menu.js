import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {authentication} from '../utilities';
import ContentLoader from './ContentLoader';
import Footer from './Footer';
import {ROUTES} from '../routes';
import Header from './common/Header';
import RenderRemoteComponent from '../RenderRemoteComponent';

class Menu extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    if(!authentication()){
        return <Redirect to='/login'/>
    }
    console.log('asas');
    return (
      <div className="wrapper-block">
        <Header />
          <div className="orders-ui-block">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <Suspense fallback={<ContentLoader />}>
                    <Route {...ROUTES.EDITMENUITEM} />
                    <Route {...ROUTES.ADDMENUITEM} />
                    <Route {...ROUTES.MENU} />
                  </Suspense>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        <RenderRemoteComponent />
      </div>
    );
  }
}

export default Menu;

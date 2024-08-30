import React, { Component, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {ROUTES} from './routes';
import ContentLoader from './components/ContentLoader';
//import LogoutView from './components/common/LogoutView';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Suspense fallback={<ContentLoader />}>
            <Switch>
              <Route {...ROUTES.ROOT} />
              <Route {...ROUTES.DASHBOARD} />
              <Route {...ROUTES.MENU} />
              <Route {...ROUTES.LOGIN} />
              <Route {...ROUTES.LOGOUT} />
              <Route {...ROUTES.PAYMENTSUCCESS} />
              <Route {...ROUTES.PAYMENTFAILURE} />
              <Route {...ROUTES.NOTFOUND} />
            </Switch>
          </Suspense>
        </BrowserRouter>
    );
  }
}

export default App;

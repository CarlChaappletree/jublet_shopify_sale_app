import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import SignUp from '../SignUp';
import Account from '../Account';
import ConnectedUserRoute from './ConnectedUserRoute';
function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/signup" render={() => <SignUp />} />
      <ConnectedUserRoute path="/account" render={() => <Account />} />
    </Switch>
  );
}

export default Routes;

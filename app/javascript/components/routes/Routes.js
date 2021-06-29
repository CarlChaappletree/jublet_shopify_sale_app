import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../SignUp';
import Account from '../Account';

function Routes() {
  return (
    <Switch>
      <Route path="/account" render={() => <Account />} />
      <Route path="/signup" render={() => <SignUp />} />
    </Switch>
  );
}

export default Routes;

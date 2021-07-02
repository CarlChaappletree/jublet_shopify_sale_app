import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountView from '../AccountView/AccountView';

function Routes() {
  return (
    <Switch>
      <Route path="/account" render={() => <AccountView />} />
    </Switch>
  );
}

export default Routes;

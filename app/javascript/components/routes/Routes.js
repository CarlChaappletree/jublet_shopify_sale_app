import React, { useContext } from 'react';
import { ReactContextStore } from '../../context/ReactContext';
import { Switch, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Account from '../Account/Account';
function Routes() {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;
  return (
    <Switch>
      <Route path="/account" render={() => (shopStore.shopLegalAgreement ? <Account /> : <Landing />)} />
    </Switch>
  );
}

export default Routes;

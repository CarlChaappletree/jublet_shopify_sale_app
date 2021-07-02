/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { ReactContextStore } from '../../context/ReactContext';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from '@shopify/app-bridge-react';

function ConnectedUserRoute({ children, ...props }) {
  const app = useAppBridge();

  const ReactContext = useContext(ReactContextStore);
  const useAppBridgeRedirect = Redirect.create(app);
  const handleRedirect = () => {
    useAppBridgeRedirect.dispatch(Redirect.Action.APP, '/');
  };
  const { shopLegalAgreementStore } = ReactContext;
  return shopLegalAgreementStore.shopLegalAgreement ? (
    <Route {...props}>{children}</Route>
  ) : (
    <div>{handleRedirect()}</div>
  );
}

export default ConnectedUserRoute;

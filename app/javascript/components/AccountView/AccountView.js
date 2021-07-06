import React, { useContext } from 'react';
import { ReactContextStore } from '../../context/ReactContext';
import Landing from './partial/Landing';
import Account from './partial/Account';

export default function AccountView() {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  return <>{shopStore.shopLegalAgreement ? <Account /> : <Landing />}</>;
}

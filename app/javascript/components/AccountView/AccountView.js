import React, { useContext } from 'react';
import { ReactContextStore } from '../../context/ReactContext';
import Landing from './Landing';
import Account from './Account';

export default function AccountView() {
  const ReactContext = useContext(ReactContextStore);
  const { shopLegalAgreementStore } = ReactContext;
  return <>{shopLegalAgreementStore.shopLegalAgreement ? <Account /> : <Landing />}</>;
}

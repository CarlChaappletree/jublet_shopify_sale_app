/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useState } from 'react';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import {
  applicationViewReducer,
  applicationViewInitialState,
  applicationViewTypes,
} from './store/applicationViewReducer';
export const ReactContextStore = createContext();
const getShopifyData = document.getElementById('shopify-app-init').dataset;
const config = {
  apiKey: getShopifyData.apiKey,
  shopOrigin: getShopifyData.shopOrigin,
  approved: getShopifyData.approved === 'true',
  shopLegalAgreement: getShopifyData.shopLegalAgreement === 'true',
  connected: getShopifyData.connected === 'true',
};

export default function ReactContext({ children }) {
  const [applicationViewState, applicationViewDispatch] = useReducer(
    applicationViewReducer,
    applicationViewInitialState
  );
  const [shopLegalAgreement, setShopLegalAgreement] = useState(config.shopLegalAgreement);

  let store = {
    shopStore: {
      shopOrigin: config.shopOrigin,
      apiKey: config.apiKey,
      approved: config.approved,
      connected: config.connected,
    },
    shopLegalAgreementStore: {
      shopLegalAgreement,
      setShopLegalAgreement,
    },
    applicationViewStore: {
      applicationViewDispatch,
      applicationViewState: applicationViewState.applicationView,
      applicationViewTypes,
    },
  };

  return (
    <AppBridgeProvider config={config}>
      <ReactContextStore.Provider value={store}>{children}</ReactContextStore.Provider>
    </AppBridgeProvider>
  );
}

/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
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
};

export default function ReactContext({ children }) {
  const [applicationViewState, applicationViewDispatch] = useReducer(
    applicationViewReducer,
    applicationViewInitialState
  );

  let store = {
    apiKey: config.apiKey,
    shopOrigin: config.shopOrigin,
    shopLegalAgreement: getShopifyData.shopLegalAgreement === 'true',
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

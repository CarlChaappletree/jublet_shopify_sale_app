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
};

export default function ReactContext({ children }) {
  const [applicationViewState, applicationViewDispatch] = useReducer(
    applicationViewReducer,
    applicationViewInitialState
  );
  const [shopLegalAgreement, setShopLegalAgreement] = useState(getShopifyData.shopLegalAgreement === 'true');

  let store = {
    apiKey: config.apiKey,
    shopOrigin: config.shopOrigin,
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

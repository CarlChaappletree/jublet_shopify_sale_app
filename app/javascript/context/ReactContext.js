/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';

export const ReactContextStore = createContext();

export default function ReactContext({ children }) {
  const getShopifyData = document.getElementById('shopify-app-init').dataset;
  const config = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };

  let store = {
    apiKey: config.apiKey,
    shopOrigin: config.shopOrigin,
    shopLegalAgreement: getShopifyData.shopLegalAgreement === 'true',
  };

  return (
    <AppBridgeProvider config={config}>
      <ReactContextStore.Provider value={store}>{children}</ReactContextStore.Provider>
    </AppBridgeProvider>
  );
}

/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';

export const ReactContextStore = createContext();
export default function ReactContext({ children }) {
  let getShopifyData = document.getElementById('shopify-app-init').dataset;
  const config = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };
  let store = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };

  return (
    <AppBridgeProvider config={config}>
      <ReactContextStore.Provider value={store}>{children}</ReactContextStore.Provider>
    </AppBridgeProvider>
  );
}

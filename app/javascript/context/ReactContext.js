/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import { useQuery } from '@apollo/client';
import { Loading, Frame, Banner } from '@shopify/polaris';

import {
  applicationViewReducer,
  applicationViewInitialState,
  applicationViewTypes,
} from './store/applicationViewReducer';
import { GET_SHOP } from '../operations/query/Shop';
export const ReactContextStore = createContext();

export default function ReactContext({ children }) {
  const [applicationViewState, applicationViewDispatch] = useReducer(
    applicationViewReducer,
    applicationViewInitialState
  );

  // get data from rails
  const getShopifyData = document.getElementById('shopify-app-init').dataset;

  // get data from fetching in order to update graphql cached memories
  const {
    data: queryData,
    loading,
    error,
  } = useQuery(GET_SHOP, { variables: { shopify_domain: getShopifyData.shopOrigin } });

  const configAppBridge = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };

  let store = {
    shopStore: {
      shopOrigin: configAppBridge.shopOrigin,
      apiKey: configAppBridge.apiKey,
      approved: queryData && queryData.shop.approved,
      connected: queryData && queryData.shop.connected,
      shopLegalAgreement: queryData && queryData.shop.legalAgreement,
      rejected: queryData && queryData.shop.rejected,
      rejectedReason: queryData && queryData.shop.rejectedReason,
      bankDetailUpdatedAt: queryData && queryData.shop.bankDetailUpdatedAt,
    },
    applicationViewStore: {
      applicationViewDispatch,
      applicationViewState: applicationViewState.applicationView,
      applicationViewTypes,
    },
  };

  if (loading) {
    return (
      <Frame>
        <Loading />
      </Frame>
    );
  }
  return (
    <>
      {error && <Banner title={`Something went wrong. Pleas contact us.`} status="warning"></Banner>}
      <AppBridgeProvider config={configAppBridge}>
        <ReactContextStore.Provider value={store}>{children}</ReactContextStore.Provider>
      </AppBridgeProvider>
    </>
  );
}

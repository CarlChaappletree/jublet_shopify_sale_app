/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery } from '@apollo/client';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter } from 'react-router-dom';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Provider, Loading } from '@shopify/app-bridge-react';
import Routes from './routes/Routes';

const GET_SHOP_QUERY = gql`
  query {
    testField
  }
`;

export const AppContext = createContext();
export default function Context({ children }) {
  let getShopifyData = document.getElementById('shopify-app-init').dataset;
  let store = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

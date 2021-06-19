/* eslint-disable sort-imports */
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { AppProvider, EmptyState, Page } from '@shopify/polaris';
import React from 'react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Provider as AppBridgeProvider, TitleBar } from '@shopify/app-bridge-react';
import Routes from './Routes';
import { BrowserRouter, Link } from 'react-router-dom';
export default function App() {
  const client = new ApolloClient({
    link: new HttpLink({
      credentials: 'same-origin',
      fetch: authenticatedFetch(window.app), // created in shopify_app.js
      uri: '/graphql',
    }),
    cache: new InMemoryCache(),
  });
  let getShopifyData = document.getElementById('shopify-app-init').dataset;

  return (
    <BrowserRouter>
      <AppProvider i18n={enTranslations}>
        <Link to="/products">Link product</Link>
        <Link to="/account">Link account</Link>
        <ApolloProvider client={client}>
          <AppBridgeProvider
            config={{
              apiKey: getShopifyData.apiKey,
              shopOrigin: getShopifyData.shopOrigin,
            }}
          >
            <Routes />
          </AppBridgeProvider>
        </ApolloProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

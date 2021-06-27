import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql, useQuery } from '@apollo/client';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter } from 'react-router-dom';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Loading } from '@shopify/app-bridge-react';
import Routes from './routes/Routes';
import AppContext from '../context/AppContext';

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
  const config = {
    apiKey: getShopifyData.apiKey,
    shopOrigin: getShopifyData.shopOrigin,
  };

  return (
    <AppProvider i18n={enTranslations}>
      <ApolloProvider client={client}>
        <AppContext config={config}>
          <Loading />
          <AppContext>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </AppContext>
        </AppContext>
      </ApolloProvider>
    </AppProvider>
  );
}

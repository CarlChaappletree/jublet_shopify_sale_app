import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter } from 'react-router-dom';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Provider as AppBridgeProvider } from '@shopify/app-bridge-react';
import Routes from './routes/Routes';

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

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AppProvider, EmptyState, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import React, { useState } from "react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Provider, ResourcePicker } from "@shopify/app-bridge-react";

import TestData from "./TestData";

export default function App() {
  const client = new ApolloClient({
    link: new HttpLink({
      credentials: "same-origin",
      fetch: authenticatedFetch(window.app), // created in shopify_app.js
      uri: "/graphql",
    }),
    cache: new InMemoryCache(),
  });
  let getShopifyData = document.getElementById("shopify-app-init").dataset;
  const [productsSelectorToggleState, setProductsSelectorToggleState] =
    useState(false);
  const handleResource = (resource) => {
    setProductsSelectorToggleState(false);
    console.log(resource, "hihi");
  };
  return (
    <AppProvider i18n={enTranslations}>
      <Provider
        config={{
          apiKey: getShopifyData.apiKey,
          shopOrigin: getShopifyData.shopOrigin,
        }}
      >
        <ApolloProvider client={client}>
          <Page>
            <EmptyState
              heading="Hello, Welcome to Jublet partner app. We will help you to sell your products"
              action={{
                content: "Select your products",
                onAction: () =>
                  setProductsSelectorToggleState(!productsSelectorToggleState),
              }}
              secondaryAction={{
                content: "Learn more",
                url: "https://shopify.dev/tools/app-bridge/authentication",
                external: true,
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              {/* <TestData /> */}
            </EmptyState>
          </Page>
        </ApolloProvider>
        <ResourcePicker
          resourceType="Collection"
          open={productsSelectorToggleState}
          onCancel={() => setProductsSelectorToggleState(false)}
          onSelection={(resource) => handleResource(resource)}
        />
      </Provider>
    </AppProvider>
  );
}

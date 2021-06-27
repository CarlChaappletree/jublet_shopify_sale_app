import React, { useContext } from 'react';
import { EmptyState, Button, Page } from '@shopify/polaris';
import { Link } from 'react-router-dom';
import { ReactContextStore } from '../context/ReactContext';
import { useAppBridge } from '@shopify/app-bridge-react';

import { Redirect } from '@shopify/app-bridge/actions';

const Home = () => {
  const ReactContext = useContext(ReactContextStore);
  const { shopLegalAgreement } = ReactContext;
  const app = useAppBridge();
  const useAppBridgeRedirect = Redirect.create(app);

  const handleRedirect = () => {
    useAppBridgeRedirect.dispatch(Redirect.Action.APP, '/account');
  };

  return (
    <Page>
      {shopLegalAgreement ? (
        <div>{handleRedirect()}</div>
      ) : (
        <EmptyState
          heading="Hello, Welcome to Jublet partner app. We will help you to sell your products"
          secondaryAction={{
            content: 'Learn more',
            url: 'https://shopify.dev/tools/app-bridge/authentication',
            external: true,
          }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button primary>Connect account</Button>
          </Link>
        </EmptyState>
      )}
    </Page>
  );
};

export default Home;

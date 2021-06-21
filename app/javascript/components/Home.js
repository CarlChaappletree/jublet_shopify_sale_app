import React from 'react';
import { Page } from '@shopify/polaris';
import { EmptyState, Button } from '@shopify/polaris';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Page>
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
    </Page>
  );
};

export default Home;

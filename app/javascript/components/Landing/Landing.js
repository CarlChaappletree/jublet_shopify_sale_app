import React from 'react';
import { EmptyState, Page } from '@shopify/polaris';
import ApplicationModal from '../ApplicationModal/ApplicationModal';

const Landing = () => {
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
        <ApplicationModal />
      </EmptyState>
    </Page>
  );
};

export default Landing;

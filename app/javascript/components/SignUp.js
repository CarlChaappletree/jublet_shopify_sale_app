/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Page } from '@shopify/polaris';
import { Layout, Button, Card, Form, FormLayout, TextField, List, Scrollable } from '@shopify/polaris';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
const ListTitle = styled.div`
  padding: 13px 0;
`;

const ListContent = styled.div`
  margin-top: 10px;
`;
const SignUp = () => {
  const [redirectState, setRedirectState] = useState(false);
  const SubmitApplication = () => {
    setRedirectState(true);
  };
  if (redirectState) {
    return <Redirect to="/account" />;
  }
  return (
    <Page title="Welcome to Jublet Connect">
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            title="JUBLET Terms of Policy"
            primaryFooterAction={{ content: 'Submit', onAction: () => SubmitApplication() }}
          >
            <Scrollable shadow style={{ height: '100px' }} focusable>
              <p>
                By clicking the Submit button for the Shopify service (“Service”) or any of the services of Shopify Inc.
                (“Shopify”) you are agreeing to be bound by the following terms and conditions (“Terms of Service”). The
                Services offered by Shopify under the Terms of Service include various products and services to help you
                create and manage a retail store, whether an online store (“Online Services”), a physical retail store
                (“POS Services”), or both. Any new features or tools which are added to the current Service shall be
                also subject to the Terms of Service. You can review the current version of the Terms of Service at any
                time at https://www.shopify.com/legal/terms. Shopify reserves the right to update and change the Terms
                of Service by posting updates and changes to the Shopify website. You are advised to check the Terms of
                Service from time to time for any updates or changes that may impact you.
              </p>
            </Scrollable>
            <ListTitle>By clicking "Submit application" you are confirming to us that:</ListTitle>
            <ListContent>
              <strong>1.</strong> You have the authority to bind your company(The "Merchant")
            </ListContent>
            <ListContent>
              <strong>2.</strong> You have read and accept Jublet's Term & Conditions on behalf of your company(The
              "Merchant")
            </ListContent>
            <ListContent>
              <strong>3.</strong> You agree to a 16% commissions rate on all Sales before returns
            </ListContent>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SignUp;

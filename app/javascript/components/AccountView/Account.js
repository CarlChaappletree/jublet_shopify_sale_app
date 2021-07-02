import React, { useCallback, useState, useContext } from 'react';
import { AccountConnection, Link, Page, Layout } from '@shopify/polaris';
import { ReactContextStore } from '../../context/ReactContext';

export default function Account() {
  const ReactContext = useContext(ReactContextStore);
  const accountName = connected ? 'Jane Appleseed' : '';
  const { shopLegalAgreement } = ReactContext;
  const [connected, setConnected] = useState(shopLegalAgreement);

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="Example App">terms and conditions</Link>. You’ll pay a commission rate of 15% on sales made through
      Sample App.
    </p>
  );

  return (
    <Page title="Account">
      <Layout>
        <Layout.AnnotatedSection title="Price updates" description="Temporarily disable all Sample App price updates">
          <AccountConnection
            accountName={accountName}
            connected={connected}
            title="Example App"
            action={{
              content: buttonText,
              onAction: handleAction,
            }}
            details={details}
            termsOfService={terms}
          />
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}

import React, { useCallback, useState, useContext } from 'react';
import { Link, Page, Layout, Banner, SettingToggle } from '@shopify/polaris';
import { ReactContextStore } from '../../context/ReactContext';

export default function Account() {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;
  const [connected, setConnected] = useState(shopStore.connected);

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, [connected]);
  const disabledDetail = (
    <>
      Your connection is <strong>disabled</strong>. your products and collections are not published to{' '}
      <strong>Jublet</strong>. To display your products, please click the connect button.
      {/* <Link url="Example App">terms and conditions</Link> */}
    </>
  );
  const enabledDetail = (
    <>
      Your connection is <strong>enabled</strong>. your products and collections are <strong>published</strong> to{' '}
      <strong>Jublet</strong>.
    </>
  );
  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? enabledDetail : disabledDetail;

  const [bannerOpenState, setBannerOpenState] = useState(true);
  return (
    <Page subtitle="Let's get you set up so you can sell your products on Jublet" title="Welcome to Jublet">
      <Layout>
        {bannerOpenState ? (
          <>
            <Layout.Section>
              {shopStore.approved ? (
                <Banner
                  title="You've been approved to sell on Jublet"
                  status="success"
                  onDismiss={() => {
                    setBannerOpenState(!bannerOpenState);
                  }}
                >
                  <p>Continue set up to begin listing products on Jublet</p>
                </Banner>
              ) : (
                <Banner
                  title="Jublet is reviewing your store"
                  status="info"
                  onDismiss={() => {
                    setBannerOpenState(!bannerOpenState);
                  }}
                >
                  <p>It usually takes about 48 hours to hear back.</p>
                </Banner>
              )}
            </Layout.Section>
          </>
        ) : null}
        <Layout.AnnotatedSection
          title="Jublet connection"
          description="This enable and disable to syncs with Jublet sales channel."
        >
          <SettingToggle
            action={{
              content: buttonText,
              onAction: handleAction,
            }}
            enabled={connected}
          >
            <p variation="strong">{details}</p>
          </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}

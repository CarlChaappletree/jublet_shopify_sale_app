import React, { useCallback, useState, useContext } from 'react';
import { Page, Layout, Banner, SettingToggle } from '@shopify/polaris';
import { ReactContextStore } from '../../context/ReactContext';

export default function Account() {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  const handleAction = useCallback(() => {
    // shopConnectedStore.setShopConnectedState((connected) => !connected);
  }, []);
  const disabledDetail = (
    <>
      Your connection is <strong>disabled</strong>. your products and collections are not published to{' '}
      <strong>Jublet</strong>. To display your products, please click the connect button.
    </>
  );
  const enabledDetail = (
    <>
      Your connection is <strong>enabled</strong>. your products and collections are <strong>published</strong> to{' '}
      <strong>Jublet</strong>.
    </>
  );
  const buttonText = shopStore.connected ? 'Disconnect' : 'Connect';
  const storeConnectionDetail = shopStore.connected ? enabledDetail : disabledDetail;
  const legalAgreementDetail = shopStore.shopLegalAgreement
    ? `You have accepted Jublet's terms and conditions.`
    : `You have not accepted Jublet's terms of conditions. Please accept the terms and conditions`;
  const [bannerOpenState, setBannerOpenState] = useState(true);
  console.log('shopStore.rejected', shopStore.rejected);
  return (
    <Page subtitle="Let's get you set up so you can sell your products on Jublet" title="Welcome to Jublet">
      <Layout>
        {bannerOpenState ? (
          <>
            <Layout.Section>
              {shopStore.approved && !shopStore.rejected ? (
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
                  title={
                    shopStore.rejected ? `Sorry, Jublet rejects your application.` : `Jublet is reviewing your store`
                  }
                  status={shopStore.rejected ? `critical` : `info`}
                  onDismiss={() => {
                    setBannerOpenState(!bannerOpenState);
                  }}
                >
                  <p>
                    {shopStore.rejected
                      ? `Please contact us if you have any issue with the application. Reject reason: ${shopStore.rejectedReason}. Please uninstall this app.`
                      : `It usually takes about 48 hours to hear back.`}
                  </p>
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
            enabled={shopStore.connected}
          >
            <p variation="strong">{storeConnectionDetail}</p>
          </SettingToggle>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Terms and conditions"
          description="View Jublet's terms and conditions here at anytime."
        >
          <SettingToggle>
            <p variation="strong">{legalAgreementDetail}</p>
          </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}

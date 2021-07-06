import React, { useCallback, useState, useContext } from 'react';
import { Page, Layout, Banner, SettingToggle, Card, Link, FooterHelp, Icon, Button, TextStyle } from '@shopify/polaris';
import { ReactContextStore } from '../../../context/ReactContext';
import BankAccountModal from './BankAccountModal';
import { BankMajor } from '@shopify/polaris-icons';
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

  return (
    <>
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
            title="Fee and payment"
            description={
              <>
                {`Jublet's transaction fees and payment details. You'll pay a `}
                <strong>15% transaction fee</strong> on all sales made on Jublet
              </>
            }
          >
            <Card title="Payment">
              <Card.Section>
                <p>{`The bank account you're receiving payments to when shoppers buy products on Jublet`}</p>
                <Link url="https://jublet.com/legal/policy" external>
                  Learn more
                </Link>
              </Card.Section>
              <Card.Section>
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: 'auto 14px auto 4px' }}>
                    <Icon source={BankMajor} color="base" />
                  </div>
                  {shopStore.approved ? (
                    <>
                      <p style={{ margin: 'auto 0' }}>Your bank account is connected</p>
                      <div style={{ marginLeft: 'auto' }}>
                        <BankAccountModal />
                      </div>
                    </>
                  ) : (
                    <p>You can add your account after Jublet approves your application.</p>
                  )}
                </div>
              </Card.Section>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Terms and conditions"
            description="View Jublet's terms and conditions here at anytime."
          >
            <Card title={legalAgreementDetail} sectioned>
              <Link url="https://jublet.com/legal/policy" external>{`Visit Jublet's terms and condition`}</Link>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
      <FooterHelp>
        Learn more about{' '}
        <Link external url="https://jublet.com/">
          selling on Jublet Marketplace
        </Link>{' '}
        {`at the Jublet's Help Center.`}
      </FooterHelp>
    </>
  );
}

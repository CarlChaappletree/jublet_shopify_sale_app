import React, { useCallback, useState, useContext } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Page,
  Layout,
  Banner,
  SettingToggle,
  Card,
  Link,
  FooterHelp,
  Icon,
  Stack,
  Heading,
  Button,
  ButtonGroup,
  TextContainer,
} from '@shopify/polaris';
import { ReactContextStore } from '../../../context/ReactContext';
import BankAccountModal from './BankAccountModal';
import { BankMajor, RefreshMajor } from '@shopify/polaris-icons';
import { SHOP_QUERY } from '../../../operations/query';

export default function Account() {
  const [loadShop, { loading: shopQueryLoading, error }] = useLazyQuery(SHOP_QUERY, {
    fetchPolicy: 'network-only',
  });
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
  const [paymentBannerStatus, setPaymentBannerStatus] = useState(true);
  const handleRefresh = () => {
    loadShop();
    setPaymentBannerStatus(true);
  };
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
            <Card
              title={
                <Stack>
                  <div style={{ margin: 'auto 0' }}>
                    <Icon source={BankMajor} color="base" />
                  </div>
                  <Heading style={{ margin: 'auto 0' }}>Payment</Heading>
                </Stack>
              }
            >
              <Card.Section>
                <p>{`The bank account you're receiving payments to when shoppers buy products on Jublet`}</p>
                <Link url="https://jublet.com/legal/policy" external>
                  Learn more
                </Link>
              </Card.Section>
              <Card.Section>
                <TextContainer>
                  {error && (
                    <Banner title="Something went wrong" status="critical">
                      <p>Please try again</p>
                    </Banner>
                  )}
                  {shopStore.hasStripeAccountCompletedProcess && shopStore.hasStripeAccountCompletedProcess ? (
                    <>
                      {paymentBannerStatus && (
                        <Banner
                          title="Your account is connected"
                          onDismiss={() => {
                            setPaymentBannerStatus(false);
                          }}
                          status="success"
                        >
                          <p>To edit your account information, click the edit button.</p>
                        </Banner>
                      )}
                    </>
                  ) : (
                    <>
                      {paymentBannerStatus && (
                        <Banner
                          title="Your account is not connected"
                          onDismiss={() => {
                            setPaymentBannerStatus(false);
                          }}
                          status="critical"
                        >
                          <p>
                            To receive payment from Jublet, you need to complete this process. <br />
                            After updating your information, please refresh the status.
                          </p>
                        </Banner>
                      )}
                    </>
                  )}
                  <Stack spacing="loose" vertical>
                    <Stack distribution="trailing">
                      {shopStore.approved && !shopStore.rejected ? (
                        <ButtonGroup>
                          <BankAccountModal />
                          <Button
                            icon={<Icon source={RefreshMajor} color="base" loading={shopQueryLoading} />}
                            plain
                            onClick={handleRefresh}
                          >
                            Refresh status
                          </Button>
                        </ButtonGroup>
                      ) : (
                        <p>You can add your account after Jublet approves your application.</p>
                      )}
                    </Stack>
                  </Stack>
                </TextContainer>
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

import React, { useContext, useState } from 'react';
import { Layout, Card, Link, Icon, Stack, Heading, Button, ButtonGroup, TextContainer, Banner } from '@shopify/polaris';
import { BankMajor, RefreshMajor } from '@shopify/polaris-icons';
import BankAccountModal from './BankAccountModal';
import { ReactContextStore } from '../../../context/ReactContext';
import { useLazyQuery } from '@apollo/client';
import { SHOP_QUERY } from '../../../operations/query';

const FeeAndPayment = () => {
  const [loadShop, { loading: shopQueryLoading, error }] = useLazyQuery(SHOP_QUERY, {
    fetchPolicy: 'network-only',
  });

  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;
  const [paymentBannerStatus, setPaymentBannerStatus] = useState(true);
  const handleRefresh = () => {
    loadShop();
    setPaymentBannerStatus(true);
  };
  return (
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
        {shopStore.approved || shopStore.rejected ? (
          <>
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
                    <ButtonGroup>
                      <BankAccountModal />
                      <Button
                        icon={<Icon source={RefreshMajor} color="base" />}
                        plain
                        loading={shopQueryLoading}
                        onClick={handleRefresh}
                      >
                        Refresh status
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Stack>
              </TextContainer>
            </Card.Section>
          </>
        ) : (
          <Card.Section>
            <Banner title="Your account is not connected" status="critical">
              <p>You can start adding your account after Jublet approves your application.</p>
            </Banner>
          </Card.Section>
        )}
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default FeeAndPayment;

import React, { useState, useContext } from 'react';
import { Page, Layout, Banner } from '@shopify/polaris';
import { ReactContextStore } from '../../context/ReactContext';
import AccountConnection from './partial/AccountConnection';
import FeeAndPayment from './partial/FeeAndPayment';
import TermsAndPolicy from './partial/TermsAndPolicy';
import Footer from '../Footer/Footer';
import Publishing from './partial/Publishing';

export default function Account() {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  const [bannerOpenState, setBannerOpenState] = useState(true);

  return (
    <>
      <Page subtitle="Let's get you set up so you can sell your products on Jublet" title="Welcome to Jublet">
        <Layout>
          {/* Banners */}
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
          <AccountConnection />
          <FeeAndPayment />
          <Publishing />
          <TermsAndPolicy />
        </Layout>
      </Page>
      <Footer />
    </>
  );
}

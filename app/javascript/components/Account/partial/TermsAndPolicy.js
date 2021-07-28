import React, { useContext } from 'react';
import { Layout, Card, Link } from '@shopify/polaris';
import { ReactContextStore } from '../../../context/ReactContext';
const TermsAndPolicy = () => {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  const legalAgreementDetail = shopStore.shopLegalAgreement
    ? `You have accepted Jublet's terms and conditions.`
    : `You have not accepted Jublet's terms of conditions. Please accept the terms and conditions`;
  return (
    <Layout.AnnotatedSection
      title="Terms and conditions"
      description="View Jublet's terms and conditions here at anytime."
    >
      <Card title={legalAgreementDetail} sectioned>
        <Link url="https://jublet.com/legal/policy" external>{`Visit Jublet's terms and condition`}</Link>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default TermsAndPolicy;

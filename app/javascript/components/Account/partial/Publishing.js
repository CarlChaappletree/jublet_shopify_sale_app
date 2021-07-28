import React, { useContext } from 'react';
import { Layout, Card, Link, Banner, Badge, Stack, TextContainer } from '@shopify/polaris';
import { ReactContextStore } from '../../../context/ReactContext';
const Publishing = () => {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

  return (
    <Layout.AnnotatedSection
      title="Publishing"
      description="Products that are being synced to your catalog, or have errors preventing their sync, are shown here."
    >
      <Card sectioned title="Products status">
        <Banner title="Something went wrong" status="success">
          <p>Please try again</p>
        </Banner>
        <div style={{ margin: '20px 0' }}>
          <p>155 products are available to Jublet</p>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Stack spacing="loose">
            <Badge
              status="success"
              progress="complete"
              statusAndProgressLabelOverride="Status: Published. Your online store is visible."
            >
              Published
            </Badge>
            <p>155 products are available to Jublet</p>
          </Stack>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Stack spacing="loose">
            <Badge
              status="critical"
              progress="incomplete"
              statusAndProgressLabelOverride="Status: Published. Your online store is visible."
            >
              Published
            </Badge>
            <p>155 products are available to Jublet</p>
          </Stack>
        </div>
        <Card.Section subdued>
          <TextContainer>Jublet takes up to 3 business days to review published products </TextContainer>
        </Card.Section>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default Publishing;

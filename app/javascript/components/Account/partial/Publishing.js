import React from 'react';
import { useQuery } from '@apollo/client';
import { Layout, Card, Banner, Badge, Stack, TextContainer, Spinner } from '@shopify/polaris';
import { PRODUCT_LISTING_QUERY } from '../../../operations/query';

const Publishing = () => {
  const {
    data: productListingData,
    loading: productListingLoading,
    error: productListingError,
  } = useQuery(PRODUCT_LISTING_QUERY);

  return (
    <Layout.AnnotatedSection
      title="Publishing"
      description="Products that are being synced to your catalog, or have errors preventing their sync, are shown here."
    >
      <Card sectioned title="Products status">
        {productListingError && (
          <Banner title="Something went wrong" status="critical">
            <p>Please try again</p>
          </Banner>
        )}
        {productListingLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner accessibilityLabel="Small spinner example" size="small" />
          </div>
        ) : (
          <>
            <Banner title="Something went wrong" status="success">
              <p>Please try again</p>
            </Banner>
            <div style={{ margin: '20px 0' }}>
              <p>{`${
                productListingData && productListingData.productListing && productListingData.productListing.ids.length
              } products are available to Jublet`}</p>
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
          </>
        )}
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default Publishing;

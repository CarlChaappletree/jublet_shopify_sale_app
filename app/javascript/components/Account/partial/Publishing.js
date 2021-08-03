import React, { useContext } from 'react';
import { ReactContextStore } from '../../../context/ReactContext';
import { useQuery } from '@apollo/client';
import { Button, Layout, Card, Banner, Badge, Stack, TextContainer, Spinner, Link } from '@shopify/polaris';
import { PRODUCT_LISTING_QUERY } from '../../../operations/query';

const Publishing = () => {
  const ReactContext = useContext(ReactContextStore);
  const { shopStore } = ReactContext;

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
            {(productListingData &&
              productListingData.productListing &&
              productListingData.productListing.ids.length) == 0 ? (
              <Banner title="Make products available to Jublet" status="info">
                <p>
                  To start selling and marketing on Jublet, you need to set the product status as active and select the
                  Jublet sales channel
                </p>
                <Link
                  url="https://help.shopify.com/en/manual/products/add-update-products#make-products-available-on-your-sales-channels?locale=en-SE"
                  external
                >
                  Learn how to manage product availability.
                </Link>
                <div style={{ margin: '10px 0 5px' }}>
                  <Button
                    outline
                    url="https://sales-channel-rails-react-store.myshopify.com/admin/bulk?resource_name=Product&edit=metafields.sc-jublet.jublet_category%3Astring%2Cpublications.74550050971.published_at&show=&ids=&app_context=&metafield_titles=&metafield_options="
                    external
                  >
                    View product
                  </Button>
                </div>
              </Banner>
            ) : (
              <>
                <div style={{ margin: '20px 0' }}>
                  <Stack spacing="loose">
                    <Badge
                      status="success"
                      progress="complete"
                      statusAndProgressLabelOverride="Status: Published. Your online store is visible."
                    >
                      Approved
                    </Badge>
                    {/* <p>{`${shopStore.approvedProducts} products`}</p> */}
                  </Stack>
                </div>
                <div style={{ margin: '20px 0' }}>
                  <Stack spacing="loose">
                    <Badge
                      status="critical"
                      progress="incomplete"
                      statusAndProgressLabelOverride="Status: Published. Your online store is visible."
                    >
                      Not approved
                    </Badge>
                    {/* <p>{`${productListingData.productListing.ids.length - shopStore.approvedProducts} products`}</p> */}
                  </Stack>
                </div>
                <div style={{ margin: '10px 0' }}>
                  <Link
                    url="https://sales-channel-rails-react-store.myshopify.com/admin/bulk?resource_name=Product&edit=metafields.sc-jublet.jublet_category%3Astring%2Cpublications.74550050971.published_at&show=&ids=&app_context=&metafield_titles=&metafield_options="
                    external
                  >
                    View all products
                  </Link>
                </div>
                <Card.Section subdued>
                  <TextContainer>Jublet takes up to 3 business days to review published products </TextContainer>
                </Card.Section>
              </>
            )}
          </>
        )}
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default Publishing;

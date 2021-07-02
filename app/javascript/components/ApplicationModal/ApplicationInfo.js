import React, { useContext } from 'react';
import { List, Card, Page, Button, Heading, TextContainer } from '@shopify/polaris';
import { ReactContextStore } from '../../context/ReactContext';
const ApplicationInfo = () => {
  const ReactContext = useContext(ReactContextStore);
  const { applicationViewStore } = ReactContext;

  return (
    <>
      <Page>
        <TextContainer>
          <Heading>Store entry information</Heading>
          <List>
            <List.Item>
              Application process will take up to 3 to 5 business days, and the results are notified by e-mail.
            </List.Item>
            <List.Item>It takes the same period to apply for re-entry</List.Item>
            <List.Item>
              Business registration number and mail order number must be confirmed. (Required to fill in the information
              at the bottom of the site and submit documents)
            </List.Item>
          </List>
          <Card
            title="Partner companies that have a large number of categories that are not handled by JUBLET are not allowed to enter the store."
            sectioned
          >
            <List>
              <List.Item>Men only</List.Item>
              <List.Item>For infants only</List.Item>
              <List.Item>Products with intense sexuality, such as adult products and adult lingerie</List.Item>
              <List.Item>Fake and other brand products</List.Item>
            </List>
          </Card>
          <Card
            title="JUBLET provides the best shopping experience to buyers. Therefore, all partners are
                    You must enter your information according to the policy below. Partners that do not
                    comply with this will not be allowed to enter the store."
            sectioned
          >
            <List>
              <p> Customer response policy</p>
              <List.Item>
                Please be sure to provide contact information where you can be contacted so that we can respond to buyer
                inquiries smoothly.
              </List.Item>
              <p> Cancellation/Exchange/Return Policy</p>
              <List.Item>
                In principle, JUBLET has the following basic cancellation/exchange/return policy in accordance with the
                E-Commerce Act, and partner companies that operate against this policy cannot enter the store.
              </List.Item>
              <List.Item>Exchanges, refunds, and returns must be possible due to a simple change of mind.</List.Item>
              <List.Item>
                If a separate order cancellation fee is charged to the customer, it may become a problem due to unfair
                terms and conditions, so it is impossible to enter the store.
              </List.Item>
            </List>
          </Card>
          <p>Before applying to enter the store, be sure to check the following information!</p>
        </TextContainer>
        <div style={{ float: 'right', paddingBottom: '0.8rem' }}>
          <Button
            size="large"
            onClick={() =>
              applicationViewStore.applicationViewDispatch({
                type: applicationViewStore.applicationViewTypes.SET_FORM_VIEW,
              })
            }
          >
            Next
          </Button>
        </div>
      </Page>
    </>
  );
};

export default ApplicationInfo;

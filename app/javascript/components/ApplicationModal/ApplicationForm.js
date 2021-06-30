import React, { useState, useCallback, useReducer, useContext } from 'react';
import {
  List,
  Card,
  Page,
  Button,
  Heading,
  Form,
  FormLayout,
  TextContainer,
  TextField,
  ChoiceList,
} from '@shopify/polaris';
import { gql, useMutation } from '@apollo/client';
import { ReactContextStore } from '../../context/ReactContext';

const UPDATE_APPLICATION_QUERY = gql`
  mutation UpdateApplication($shopify_domain: String!, $form: ApplicationFormAttributes!) {
    updateApplication(input: { shopifyDomain: $shopify_domain, form: $form }) {
      shop {
        id
      }
      errors
    }
  }
`;
const ApplicationForm = () => {
  const [postUserForm, { loading, error }] = useMutation(UPDATE_APPLICATION_QUERY);
  const [isFirstPageState, setIsFirstPageSate] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedOtherTextFiledValue, setSelectedOtherTextFiledValue] = useState('');

  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    email: '',
    shopName: '',
    webSiteUrl: '',
    fullName: '',
    phoneNumber: '',
    instagram: '',
  });
  const handleChange = (value, id) => {
    const newValue = value;
    setUserInput({ [id]: newValue });
  };
  const ReactContext = useContext(ReactContextStore);

  const { shopOrigin } = ReactContext;
  const handleSubmit = () => {
    console.log('hi--', { ...userInput, shopClassification: `${selected.join(', ')}, ${selectedOtherTextFiledValue}` });
    postUserForm({
      variables: {
        shopify_domain: shopOrigin,
        form: { ...userInput, shopClassification: `${selected.join(', ')}, ${selectedOtherTextFiledValue}` },
      },
    });

    // setUserInput({
    //   email: '',
    //   shopName: '',
    //   webSiteUrl: '',
    //   fullName: '',
    //   phoneNumber: '',
    //   instagram: '',
    // });
  };

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const handleTextFieldChange = useCallback((value) => setSelectedOtherTextFiledValue(value), []);
  const renderChildren = useCallback(
    (isSelected) =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={selectedOtherTextFiledValue}
        />
      ),
    [handleTextFieldChange, selectedOtherTextFiledValue]
  );

  return (
    <>
      {isFirstPageState ? (
        <Page>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  value={userInput.fullName}
                  onChange={(value, id) => handleChange(value, id)}
                  id="fullName"
                  label="Full name"
                  type="text"
                  requiredIndicator={true}
                />
                <TextField
                  value={userInput.email}
                  onChange={(value, id) => handleChange(value, id)}
                  id="email"
                  label="Email"
                  type="email"
                  requiredIndicator={true}
                  helpText={
                    <span>
                      Please enter your e-mail. Used as ID and contact. We will notify you of the results by email.
                    </span>
                  }
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={userInput.phoneNumber}
                  onChange={(value, id) => handleChange(value, id)}
                  required
                  label="Phone number"
                  id="phoneNumber"
                  type="tel"
                />

                <TextField
                  value={userInput.shopName}
                  onChange={handleChange}
                  requiredIndicator={true}
                  label="Shop name"
                  type="text"
                  id="shopName"
                  helpText={<span>Please enter your shopify shop name</span>}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  value={userInput.webSiteUrl}
                  onChange={handleChange}
                  requiredIndicator={true}
                  label="Shopify website URL"
                  type="url"
                  placeholder="https://www.myshopify.com/"
                  id="webSiteUrl"
                  helpText={<span>Please enter your shopify website URL</span>}
                />
                <TextField
                  value={userInput.instagram}
                  onChange={handleChange}
                  label="Instagram URL (optional)"
                  type="url"
                  placeholder="https://www.instagram.com/your_instagram"
                  id="instagram"
                  helpText={<span>Please enter your instagram URL</span>}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <ChoiceList
                  allowMultiple
                  title="Shopping mall classification"
                  requiredIndicator={true}
                  choices={[
                    {
                      label: 'Clothing',
                      value: 'Clothing',
                    },
                    {
                      label: 'Shoes',
                      value: 'Shoes',
                    },
                    {
                      label: 'Lingerie/Pajama',
                      value: 'Lingerie/Pajama',
                    },
                    {
                      label: 'Accessory',
                      value: 'Accessory',
                    },
                    {
                      label: 'Beachwear',
                      value: 'Beachwear',
                    },
                    {
                      label: 'Maternity clothes',
                      value: 'Maternity clothes',
                    },
                    {
                      label: 'Big size',
                      value: 'Big size',
                    },
                    {
                      label: 'Sportswear',
                      value: 'Sportswear',
                    },
                    {
                      label: 'Vintage/pre-used',
                      value: 'Vintage/pre-used',
                    },
                    {
                      label: 'Others',
                      value: 'Others',
                      renderChildren,
                    },
                  ]}
                  selected={selected}
                  onChange={handleSelectChange}
                />
              </FormLayout.Group>
              <div style={{ paddingBottom: '0.8em' }}>
                <div style={{ float: 'left' }}>
                  <Button onClick={() => setIsFirstPageSate(false)}>Back</Button>
                </div>
                <div style={{ float: 'right' }}>
                  <Button primary submit>
                    Submit
                  </Button>
                </div>
              </div>
            </FormLayout>
          </Form>
        </Page>
      ) : (
        <Page>
          <TextContainer>
            <Heading>Store entry information</Heading>
            <List>
              <List.Item>
                Application process will take up to 3 to 5 business days, and the results are notified by e-mail.
              </List.Item>
              <List.Item>It takes the same period to apply for re-entry</List.Item>
              <List.Item>
                Business registration number and mail order number must be confirmed. (Required to fill in the
                information at the bottom of the site and submit documents)
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
                  Please be sure to provide contact information where you can be contacted so that we can respond to
                  buyer inquiries smoothly.
                </List.Item>
                <p> Cancellation/Exchange/Return Policy</p>
                <List.Item>
                  In principle, JUBLET has the following basic cancellation/exchange/return policy in accordance with
                  the E-Commerce Act, and partner companies that operate against this policy cannot enter the store.
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
            <Button size="large" onClick={() => setIsFirstPageSate(true)}>
              Next
            </Button>
          </div>
        </Page>
      )}
    </>
  );
};

export default ApplicationForm;

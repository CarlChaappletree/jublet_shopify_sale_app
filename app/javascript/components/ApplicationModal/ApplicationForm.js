import React, { useState, useCallback, useReducer, useContext } from 'react';
import { Page, Button, Form, FormLayout, TextField, ChoiceList, Frame, Loading } from '@shopify/polaris';
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

  const { shopOrigin, applicationViewStore } = ReactContext;

  const handleSubmit = () => {
    postUserForm({
      variables: {
        shopify_domain: shopOrigin,
        form: { ...userInput, shopClassification: `${selected.join(', ')}, ${selectedOtherTextFiledValue}` },
      },
    });
    // if (error === undefined) {
    // }
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
      {loading && (
        <div style={{ height: '100px' }}>
          <Frame>
            <Loading />
          </Frame>
        </div>
      )}

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
                <Button
                  onClick={() =>
                    applicationViewStore.applicationViewDispatch({
                      type: applicationViewStore.applicationViewTypes.SET_INTRO_VIEW,
                    })
                  }
                >
                  Back
                </Button>
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
    </>
  );
};

export default ApplicationForm;

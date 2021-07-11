import { gql } from '@apollo/client';

export const UPDATE_SHOP_MUTATION = gql`
  mutation UpdateShop($legalAgreement: Boolean!, $connected: Boolean!) {
    updateShop(input: { legalAgreement: $legalAgreement, connected: $connected }) {
      shop {
        id
        shopifyDomain
        legalAgreement
        connected
        approved
      }
      errors
    }
  }
`;

export const UPDATE_APPLICATION_MUTATION = gql`
  mutation UpdateApplication($form: ApplicationFormAttributes!) {
    updateShop(input: { applicationForm: $form }) {
      shop {
        id
        shopifyDomain
        legalAgreement
        connected
        approved
      }
      errors
    }
  }
`;

export const UPDATE_STRIPE_CONNECT = gql`
  mutation UpdateStripeConnect {
    updateStripeConnect(input: {}) {
      connectLink
    }
  }
`;

import { gql } from '@apollo/client';

export const UPDATE_SHOP_MUTATION = gql`
  mutation UpdateShop {
    updateShop(input: {}) {
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
    updateApplication(input: { form: $form }) {
      shop {
        id
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

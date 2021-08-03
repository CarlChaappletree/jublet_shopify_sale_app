import { gql } from '@apollo/client';

export const SHOP_QUERY = gql`
  query GetShop {
    shop {
      id
      connected
      legalAgreement
      approved
      rejected
      rejectedReason
      stripeAccountId
      hasStripeAccountCompletedProcess
      isStripeAccountPayoutsEnabled
      productListingsCount
      approvedProducts
    }
  }
`;

export const GET_STRIPE_ACCOUNT_DETAIL = gql`
  query GetStripeAccountDetail {
    getStripeAccountDetail {
      id
      requirements {
        eventuallyDue
      }
    }
  }
`;

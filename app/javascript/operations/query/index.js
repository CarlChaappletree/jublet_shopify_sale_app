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
      approvedProducts
    }
  }
`;

export const PRODUCT_LISTING_QUERY = gql`
  query GetShop {
    productListing {
      ids
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

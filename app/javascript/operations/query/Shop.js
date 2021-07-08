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
      bankDetailUpdatedAt
    }
  }
`;

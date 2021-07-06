import { gql } from '@apollo/client';

export const GET_SHOP = gql`
  query GetShop($shopify_domain: String!) {
    shop(shopifyDomain: $shopify_domain) {
      id
      connected
      legalAgreement
      approved
    }
  }
`;

require 'rails_helper'

module Queries
  RSpec.describe Shop, type: :request do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      it 'returns shop for provided shopify domain' do
        shop
        post '/graphql', params: { query: query(shopify_domain: shop.shopify_domain) }

        expect(JSON.parse(response.body)['data']['shop']).to include(
          {
            'connected' => false,
            'legalAgreement' => false,
            'approved' => false,
            'rejected' => false,
            'rejectedReason' => nil
          }
        )
      end

      def query(shopify_domain:)
        <<~GQL
          query {
            shop(
              shopifyDomain: "#{shopify_domain}"
            ) {
                id
                connected
                legalAgreement
                approved
                rejected
                rejectedReason
            }
          }
        GQL
      end
    end
  end
end

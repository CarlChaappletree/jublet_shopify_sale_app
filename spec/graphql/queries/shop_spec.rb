require 'rails_helper'

module Queries
  RSpec.describe Shop, type: :request, vcr: true do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      it 'returns shop for provided shopify domain' do
        controller_test_setup(shop)
        post '/graphql', params: { query: query }
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

      def query
        <<~GQL
          query {
            shop {
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

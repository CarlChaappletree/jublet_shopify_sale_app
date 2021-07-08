require 'rails_helper'

module Mutations
  RSpec.describe UpdateShop, type: :request, vcr: false do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      before do
        controller_test_setup(shop)
      end
      it 'Updates and returns shop for provided shopify domain' do
        post '/graphql', params: { query: query }
        expect(JSON.parse(response.body)['data']['updateShop']['shop']).to include(
          {
            'id' => shop.id.to_s,
            'connected' => true,
            'legalAgreement' => true,
            'approved' => false
          }
        )
      end

      def query
        <<~GQL
          mutation {
            updateShop(input: {}) {
              shop {
                id
                connected
                legalAgreement
                approved
              }
              errors
            }
          }
        GQL
      end
    end
  end
end

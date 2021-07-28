require 'rails_helper'

module Queries
  RSpec.describe ProductListing, type: :request, vcr: false do
    describe '.resolve' do
      let(:shop) { create(:shop) }

      it 'returns productListing' do
        controller_test_setup(shop)

        post '/graphql', params: { query: query }
        expect(response.status).to eq(200)
      end

      def query
        <<~GQL
          query {
            productListing {
              count
            }
          }
        GQL
      end
    end
  end
end

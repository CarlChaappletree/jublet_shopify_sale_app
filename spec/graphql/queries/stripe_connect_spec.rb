require 'rails_helper'
module Queries
  RSpec.describe StripeConnect, type: :request, vcr: true do
    describe '.resolve' do
      it 'returns a stripe onboarding link' do
        post '/graphql', params: { query: query }
        puts 'you', JSON.parse(response.body)
        expect(JSON.parse(response.body)['data']['stripeConnect']['url']).to eq('url')
      end

      def query
        <<~GQL
          query {
            stripeConnect
          }
        GQL
      end
    end
  end
end

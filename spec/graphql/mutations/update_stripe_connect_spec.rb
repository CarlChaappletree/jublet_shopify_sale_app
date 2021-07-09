require 'rails_helper'

module Mutations
  RSpec.describe UpdateStripeConnect, type: :request, vcr: true do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      let(:shop_with_stripe_account) { create(:shop, stripe_account_id: ENV['STRIPE_TEST_ACCOUNT_ID']) }

      it 'returns a stripe onboarding link that newly created' do
        controller_test_setup(shop)
        post '/graphql', params: { query: query }
        expect(JSON.parse(response.body)['data']['updateStripeConnect']['connectLink']['url']).to eq('url')
      end

      it 'returns a stripe onboarding link that had already updated before' do
        controller_test_setup(shop_with_stripe_account)
        post '/graphql', params: { query: query }
        expect(shop_with_stripe_account.stripe_account_id).to eq(ENV['STRIPE_TEST_ACCOUNT_ID'])
        expect(JSON.parse(response.body)['data']['updateStripeConnect']['connectLink']['url']).to eq('url')
      end

      def query
        <<~GQL
          mutation {
            updateStripeConnect(input: {}) {
              connectLink
            }
          }
        GQL
      end
    end
  end
end

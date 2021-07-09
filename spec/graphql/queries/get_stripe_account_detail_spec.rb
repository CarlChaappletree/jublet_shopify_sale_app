require 'rails_helper'

module Queries
  RSpec.describe GetStripeAccountDetail, type: :request, vcr: true do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      let(:shop_with_stripe_account) { create(:shop, stripe_account_id: ENV['STRIPE_TEST_ACCOUNT_ID']) }

      it 'returns account detail for provided stripe id' do
        controller_test_setup(shop_with_stripe_account)
        post '/graphql', params: { query: query }
        expect(JSON.parse(response.body)['data']['getStripeAccountDetail']['id']).to eq(shop_with_stripe_account.stripe_account_id)
      end

      it 'does not returns account detail if shop does not have stripe account' do
        controller_test_setup(shop)
        post '/graphql', params: { query: query }
        expect(JSON.parse(response.body)['errors'].first['message']).to eq( 'Shop does not have the stripe account id')
      end

      def query
        <<~GQL
          query {
            getStripeAccountDetail{
              id
              requirements {
                eventuallyDue
              }
            }
          }
        GQL
      end
    end
  end
end

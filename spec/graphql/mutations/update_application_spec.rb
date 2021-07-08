require 'rails_helper'

module Mutations
  RSpec.describe UpdateApplication, type: :request, vcr: false do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      let(:form) {
        {
          email: 'cha@cha.com',
          fullName: 'Seungwoocha',
          instagram: 'instagram.com',
          phoneNumber: '01018488844',
          shopClassification: 'Some random shopify classification string',
          shopName: 'Shopify name',
          webSiteUrl: 'shopify.com website URl'
        }
      }
      it 'returns shop for provided shopify domain' do
        controller_test_setup(shop)
        post '/graphql', params: { query: query(form_arg: form) }
        expect(JSON.parse(response.body)['data']['updateApplication']['shop']).to include(
          {
            'id' => '1',
          }
        )
      end

      def query(form_arg:)
        <<~GQL
          mutation {
            updateApplication(input: {
              form: {
                email: "#{form_arg[:email]}"
                fullName: "#{form_arg[:fullName]}"
                instagram: "#{form_arg[:instagram]}"
                phoneNumber: "#{form_arg[:phoneNumber]}"
                shopClassification: "#{form_arg[:shopClassification]}"
                shopName: "#{form_arg[:shopName]}"
                webSiteUrl: "#{form_arg[:webSiteUrl]}"
              }
            }) {
              shop {
                id
              }
              errors
            }
          }
        GQL
      end
    end
  end
end

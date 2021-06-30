require 'rails_helper'

module Mutations
  RSpec.describe UpdateApplication, type: :request do
    describe 'Mutations::UpdateApplication' do
      let(:form) {
        {
          email: 'cha@cha.com',
          fullName: 'Seungwoocha',
          instagram: 'instagram.com',
          phoneNumber: '01018488844',
          shopClassification: 'Some random shopofy classification string',
          shopName: 'Shopify name',
          webSiteUrl: 'shopify.com website URl'
        }
      }
      let(:shop) { create(:shop) }
      it 'returns proper resolve data' do
        migration = Mutations::UpdateApplication.new(object: nil, context: {}, field: {})
        result = migration.resolve(shopify_domain: shop.shopify_domain, form: form)

        expect(result[:shop][:shopify_domain]).to eq(shop.shopify_domain)
        expect(result[:shop][:shopify_token]).to eq(shop.shopify_token)
        expect(result[:shop][:errors]).to eq(nil)
      end

      it 'updates shop application' do
        shop
        post '/graphql', params: { query: query(shop.shopify_domain, form) }
        shop.reload
        expect(shop[:application_form]["email"]).to eq(form[:email])
      end
    end

    def query(domain, form)
      <<~GQL
        mutation {
          updateApplication(input: {
            shopifyDomain: "#{domain}"
            form: {
              email: "#{form[:email]}"
              fullName: "#{form[:fullName]}"
              instagram: "#{form[:instagram]}"
              phoneNumber: "01018488844"
              shopClassification: "Some random shopofy classification string"
              shopName: "Shopify name"
              webSiteUrl: "shopify.com website uRl"
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

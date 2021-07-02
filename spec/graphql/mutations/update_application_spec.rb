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

      it 'raises exceptions with an wrong shopify domain' do
        migration = Mutations::UpdateApplication.new(object: nil, context: {}, field: {})
        result = migration.resolve(shopify_domain: 'None exist', form: {})
        expect(result.class).to eq(GraphQL::ExecutionError)
      end

      it 'raises exceptions' do
        migration = Mutations::UpdateApplication.new(object: nil, context: {}, field: {})
        result = migration.resolve(shopify_domain: 'None exist', form: {})
        expect(result.class).to eq(GraphQL::ExecutionError)
      end
      # Don't know how to deal with test with route. So test only for the unit resolver.
      #https://www.howtographql.com/graphql-ruby/3-mutations/
      # it 'updates shop application' do
      #   shop
      #   post '/graphql', params: { query: query() }
      #   shop.reload
      #   puts 'h------------spec', shop.inspect
      #   expect(shop[:application_form]["email"]).to eq(form[:email])
      # end
    end

    # def query()
    #   <<~GQL
    #     mutation {
    #       updateApplication(input: {
    #         shopifyDomain: ""
    #         form: {
    #           email: ""
    #           fullName: ""
    #           instagram: ""
    #           phoneNumber: "01018488844"
    #           shopClassification: "Some random shopofy classification string"
    #           shopName: "Shopify name"
    #           webSiteUrl: "shopify.com website uRl"
    #         }
    #       }) {
    #         shop {
    #           id
    #         }
    #         errors
    #       }
    #     }
    #   GQL
    # end
  end
end

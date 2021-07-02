require 'rails_helper'

module Mutations
  RSpec.describe UpdateShop, type: :request do
    describe 'Mutations::UpdateShop' do
      let(:shop) { create(:shop) }
      it 'returns proper resolve data' do
        migration = Mutations::UpdateShop.new(object: nil, context: {}, field: {})
        result = migration.resolve(shopify_domain: shop.shopify_domain)
        expect(result[:shop][:shopify_domain]).to eq(shop.shopify_domain)
        expect(result[:shop][:shopify_token]).to eq(shop.shopify_token)
        expect(result[:shop][:errors]).to eq(nil)
      end

      it 'handles exceptions' do
        migration = Mutations::UpdateShop.new(object: nil, context: {}, field: {})
        result = migration.resolve(shopify_domain: 'None exist shop')
        expect(result.class).to eq(GraphQL::ExecutionError)
      end
    end
  end
end

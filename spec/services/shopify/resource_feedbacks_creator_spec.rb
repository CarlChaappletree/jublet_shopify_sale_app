require 'rails_helper'

RSpec.describe Shopify::ResourceFeedbacksCreator, type: :model, vcr: true do
  describe '#call' do
    let(:shop) { create(:shop) }
    let(:messages) {
      [
        'Needs at least one image.',
        'Needs a description.',
        'Needs a category.',
        'Make sure this product is available to your Online Store and is not password protected.'
      ]
    }
    it 'return status 200 with proper arg' do
      product = {
        id: 6955504926875,
        updated_at: Time.current
      }

      res = Shopify::ResourceFeedbacksCreator.new(
        shopify_domain: shop.shopify_domain,
        product_id: product[:id],
        product_updated_at: product[:updated_at],
        shopify_token: shop.shopify_token,
        messages: messages
      ).call
      expect(res).to eq(true)
    end

    it 'raise error if api fails' do
      product = OpenStruct.new({
        id: 1234567890,
        updated_at: '2021-07-30T15:36:53+02:00'
      })
      expect {
        Shopify::ResourceFeedbacksCreator.new(
          shopify_domain: shop.shopify_domain,
          product_id: product[:id],
          product_updated_at: product[:updated_at],
          shopify_token: shop.shopify_token,
          messages: messages
        ).call
      }.to raise_error(Faraday::ResourceNotFound)
    end
  end
end
